from backend.schemas.code_review import CodeReviewRequest, CodeReviewResponse


def review_code(request: CodeReviewRequest) -> CodeReviewResponse:
    """Return a stable placeholder review until a real analyzer is connected."""
    lines = request.code.splitlines()
    issues = []

    for line_number, line in enumerate(lines, start=1):
        if "TODO" in line or "FIXME" in line:
            issues.append({
                "severity": "low",
                "category": "maintainability",
                "line": line_number,
                "message": "This line contains unfinished work.",
                "suggestion": "Complete the work or remove the marker before merging.",
            })

    if not issues:
        issues.append({
            "severity": "info",
            "category": "general",
            "line": 1,
            "message": f"Mock review completed for {request.language} code.",
            "suggestion": "Run the project's tests and review edge cases before merging.",
        })

    score = max(0, 100 - 10 * sum(issue["severity"] == "low" for issue in issues))
    summary = (
        f"Found {len(issues)} potential issue(s)."
        if issues[0]["severity"] != "info"
        else "No obvious issues found by the mock reviewer."
    )
    return CodeReviewResponse(summary=summary, score=score, issues=issues)
