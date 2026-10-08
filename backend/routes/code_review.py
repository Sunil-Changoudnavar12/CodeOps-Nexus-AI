from fastapi import APIRouter

from backend.schemas.code_review import CodeReviewRequest, CodeReviewResponse
from backend.services.code_review_service import review_code


router = APIRouter()


@router.post("/analyze", response_model=CodeReviewResponse)
def analyze_code(request: CodeReviewRequest):
    # Send the submitted code to the actual code review service.
    return review_code(request)