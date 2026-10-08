import ast
import builtins

from backend.schemas.code_review import CodeReviewRequest, CodeReviewResponse


# ---------------------------------------------------------
# Helper: Add an issue
# ---------------------------------------------------------
def add_issue(
    issues,
    severity,
    category,
    line,
    message,
    suggestion,
):
    issues.append({
        "severity": severity,
        "category": category,
        "line": line or 1,
        "message": message,
        "suggestion": suggestion,
    })


# ---------------------------------------------------------
# Main code review function
# ---------------------------------------------------------
def review_code(request: CodeReviewRequest) -> CodeReviewResponse:

    code = request.code
    language = request.language.lower()

    lines = code.splitlines()
    issues = []

    # =====================================================
    # PYTHON ANALYSIS
    # =====================================================
    if language == "python":

        # -------------------------------------------------
        # 1. Syntax check
        # -------------------------------------------------
        try:
            tree = ast.parse(code)

        except SyntaxError as error:

            add_issue(
                issues,
                "high",
                "syntax",
                error.lineno,
                error.msg,
                "Fix the syntax error before running the code.",
            )

            # If syntax is invalid, deeper AST analysis
            # cannot be performed safely.
            tree = None

        # -------------------------------------------------
        # Continue only if syntax is valid
        # -------------------------------------------------
        if tree is not None:

            builtin_names = set(dir(builtins))

            defined_names = set()
            imported_names = set()

            # -------------------------------------------------
            # 2. Collect imports
            # -------------------------------------------------
            for node in ast.walk(tree):

                if isinstance(node, ast.Import):

                    for alias in node.names:

                        name = alias.asname or alias.name.split(".")[0]

                        imported_names.add(name)
                        defined_names.add(name)

                elif isinstance(node, ast.ImportFrom):

                    for alias in node.names:

                        name = alias.asname or alias.name

                        imported_names.add(name)
                        defined_names.add(name)

            # -------------------------------------------------
            # 3. Collect functions/classes
            # -------------------------------------------------
            for node in ast.walk(tree):

                if isinstance(
                    node,
                    (
                        ast.FunctionDef,
                        ast.AsyncFunctionDef,
                        ast.ClassDef,
                    ),
                ):

                    defined_names.add(node.name)

                    # Function arguments are local variables.
                    if isinstance(
                        node,
                        (ast.FunctionDef, ast.AsyncFunctionDef),
                    ):

                        for argument in node.args.args:
                            defined_names.add(argument.arg)

            # -------------------------------------------------
            # 4. Collect assigned variables
            # -------------------------------------------------
            for node in ast.walk(tree):

                if isinstance(node, ast.Assign):

                    for target in node.targets:

                        if isinstance(target, ast.Name):
                            defined_names.add(target.id)

                elif isinstance(node, ast.AnnAssign):

                    if isinstance(node.target, ast.Name):
                        defined_names.add(node.target.id)

                elif isinstance(node, ast.AugAssign):

                    if isinstance(node.target, ast.Name):
                        defined_names.add(node.target.id)

                elif isinstance(node, ast.For):

                    if isinstance(node.target, ast.Name):
                        defined_names.add(node.target.id)

            # -------------------------------------------------
            # 5. Undefined variable detection
            # -------------------------------------------------
            for node in ast.walk(tree):

                if isinstance(node, ast.Name):

                    if isinstance(node.ctx, ast.Load):

                        if (
                            node.id not in defined_names
                            and node.id not in builtin_names
                        ):

                            add_issue(
                                issues,
                                "high",
                                "name_error",
                                node.lineno,
                                f"'{node.id}' is not defined.",
                                (
                                    f"Check the spelling of '{node.id}' "
                                    "or define it before using it."
                                ),
                            )

            # -------------------------------------------------
            # 6. Division by zero
            # -------------------------------------------------
            for node in ast.walk(tree):

                if isinstance(node, ast.BinOp):

                    if isinstance(node.op, (ast.Div, ast.FloorDiv, ast.Mod)):

                        if (
                            isinstance(node.right, ast.Constant)
                            and node.right.value == 0
                        ):

                            add_issue(
                                issues,
                                "high",
                                "runtime",
                                node.lineno,
                                "Division or modulo by zero.",
                                "Make sure the denominator is not zero.",
                            )

            # -------------------------------------------------
            # 7. Dangerous eval()
            # -------------------------------------------------
            for node in ast.walk(tree):

                if isinstance(node, ast.Call):

                    if isinstance(node.func, ast.Name):

                        if node.func.id == "eval":

                            add_issue(
                                issues,
                                "high",
                                "security",
                                node.lineno,
                                "Use of eval() can execute arbitrary code.",
                                (
                                    "Avoid eval() with untrusted input. "
                                    "Use safer alternatives."
                                ),
                            )

                        elif node.func.id == "exec":

                            add_issue(
                                issues,
                                "high",
                                "security",
                                node.lineno,
                                "Use of exec() can execute arbitrary code.",
                                (
                                    "Avoid exec() unless it is absolutely "
                                    "necessary and controlled."
                                ),
                            )

            # -------------------------------------------------
            # 8. Empty exception handler
            # -------------------------------------------------
            for node in ast.walk(tree):

                if isinstance(node, ast.ExceptHandler):

                    if node.body:

                        only_pass = all(
                            isinstance(statement, ast.Pass)
                            for statement in node.body
                        )

                        if only_pass:

                            add_issue(
                                issues,
                                "medium",
                                "logic",
                                node.lineno,
                                "Exception is silently ignored.",
                                (
                                    "Handle the exception or log it "
                                    "instead of silently ignoring it."
                                ),
                            )

            # -------------------------------------------------
            # 9. Bare except
            # -------------------------------------------------
            for node in ast.walk(tree):

                if isinstance(node, ast.ExceptHandler):

                    if node.type is None:

                        add_issue(
                            issues,
                            "medium",
                            "quality",
                            node.lineno,
                            "Bare except catches every exception.",
                            (
                                "Catch a specific exception type "
                                "instead of using bare except."
                            ),
                        )

            # -------------------------------------------------
            # 10. Mutable default arguments
            # -------------------------------------------------
            for node in ast.walk(tree):

                if isinstance(
                    node,
                    (ast.FunctionDef, ast.AsyncFunctionDef),
                ):

                    defaults = list(node.args.defaults)

                    for default in defaults:

                        if isinstance(
                            default,
                            (ast.List, ast.Dict, ast.Set),
                        ):

                            add_issue(
                                issues,
                                "medium",
                                "logic",
                                node.lineno,
                                "Mutable default argument detected.",
                                (
                                    "Use None as the default value "
                                    "and create the object inside the function."
                                ),
                            )

            # -------------------------------------------------
            # 11. Dangerous hard-coded password
            # -------------------------------------------------
            for line_number, line in enumerate(lines, start=1):

                lower_line = line.lower()

                if (
                    "password =" in lower_line
                    or "passwd =" in lower_line
                    or "secret =" in lower_line
                ):

                    add_issue(
                        issues,
                        "high",
                        "security",
                        line_number,
                        "A possible hard-coded secret was detected.",
                        (
                            "Use environment variables or a secure "
                            "secret manager."
                        ),
                    )

                # TODO / FIXME
                if "TODO" in line or "FIXME" in line:

                    add_issue(
                        issues,
                        "low",
                        "maintainability",
                        line_number,
                        "This line contains unfinished work.",
                        "Complete the work or remove the TODO/FIXME marker.",
                    )

            # -------------------------------------------------
            # 12. Very long lines
            # -------------------------------------------------
            for line_number, line in enumerate(lines, start=1):

                if len(line) > 120:

                    add_issue(
                        issues,
                        "low",
                        "quality",
                        line_number,
                        "This line is longer than 120 characters.",
                        "Break the line into smaller readable parts.",
                    )

    # =====================================================
    # OTHER LANGUAGES
    # =====================================================
    else:

        # Basic checks for languages that do not yet have
        # language-specific AST analyzers.

        for line_number, line in enumerate(lines, start=1):

            if "TODO" in line or "FIXME" in line:

                add_issue(
                    issues,
                    "low",
                    "maintainability",
                    line_number,
                    "This line contains unfinished work.",
                    "Complete the work or remove the TODO/FIXME marker.",
                )

            if len(line) > 120:

                add_issue(
                    issues,
                    "low",
                    "quality",
                    line_number,
                    "This line is longer than 120 characters.",
                    "Break the line into smaller readable parts.",
                )

    # =====================================================
    # Remove duplicate issues
    # =====================================================
    unique_issues = []

    seen = set()

    for issue in issues:

        key = (
            issue["category"],
            issue["line"],
            issue["message"],
        )

        if key not in seen:

            seen.add(key)
            unique_issues.append(issue)

    issues = unique_issues

    # =====================================================
    # Calculate score
    # =====================================================
    score = 100

    for issue in issues:

        if issue["severity"] == "high":
            score -= 25

        elif issue["severity"] == "medium":
            score -= 15

        elif issue["severity"] == "low":
            score -= 5

    score = max(0, score)

    # =====================================================
    # Summary
    # =====================================================
    if not issues:

        summary = "No issues detected by the current code analyzer."

    else:

        summary = f"Found {len(issues)} potential issue(s)."

    # =====================================================
    # Return API response
    # =====================================================
    return CodeReviewResponse(
        summary=summary,
        score=score,
        issues=issues,
    )