from pydantic import BaseModel, Field


class CodeReviewRequest(BaseModel):
    code: str = Field(description="Source code to review")
    language: str = Field(description="Programming language of the source code")


class CodeReviewIssue(BaseModel):
    severity: str
    category: str
    line: int
    message: str
    suggestion: str


class CodeReviewResponse(BaseModel):
    summary: str
    score: int
    issues: list[CodeReviewIssue]
