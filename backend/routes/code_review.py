import json
import re

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session

from backend.database import get_db
from backend.models.code_analysis import CodeAnalysis
from backend.schemas.code_review import CodeReviewRequest, CodeReviewResponse
from backend.services.code_review_service import review_code


router = APIRouter()


@router.post("", response_model=CodeReviewResponse)
def create_code_review(request: CodeReviewRequest):
    return review_code(request)


class CodeAnalyzeRequest(BaseModel):
    code: str
    language: str = "python"
    filename: str = "app.py"


def analyze_source(code: str) -> tuple[int, list[dict]]:
    findings = []
    checks = (
        ("dynamic_execution", "high", "Dynamic code execution", "eval() can execute untrusted input.", r"\beval\s*\("),
        ("hard_coded_secret", "high", "Possible hard-coded secret", "Move credentials into a secure environment variable.", r"\b(password|api[_-]?key|secret|token)\s*=\s*[\"'][^\"']+[\"']"),
        ("sql_injection", "high", "Possible SQL injection", "Use parameterized queries instead of building SQL with user input.", r"\bSELECT\b.*\+|\b(query|execute)\s*\(\s*[`\"'][^`\"']*\$\{"),
        ("unfinished_work", "low", "Unresolved TODO", "Review this unfinished code before merging.", r"\bTODO\b|\bFIXME\b"),
    )

    for line_number, line in enumerate(code.splitlines(), start=1):
        for category, severity, title, description, pattern in checks:
            if re.search(pattern, line, re.IGNORECASE):
                findings.append({
                    "severity": severity,
                    "title": title,
                    "description": description,
                    "line_number": line_number,
                    "category": category,
                })
                break

    quality_score = max(
        0,
        100 - sum(25 if finding["severity"] == "high" else 8 for finding in findings),
    )
    return quality_score, findings


@router.post("/analyze")
def analyze_code(request: CodeAnalyzeRequest, db: Session = Depends(get_db)):
    quality_score, findings = analyze_source(request.code)
    analysis = CodeAnalysis(
        filename=request.filename,
        language=request.language,
        code=request.code,
        quality_score=quality_score,
        findings_json=json.dumps(findings, ensure_ascii=False),
    )

    try:
        db.add(analysis)
        db.commit()
        db.refresh(analysis)
    except SQLAlchemyError as error:
        db.rollback()
        raise HTTPException(status_code=500, detail="Could not save the code analysis.") from error

    return {
        "success": True,
        "analysis_id": analysis.id,
        "filename": analysis.filename,
        "language": analysis.language,
        "lines": len(request.code.splitlines()),
        "quality_score": analysis.quality_score,
        "findings": findings,
    }
