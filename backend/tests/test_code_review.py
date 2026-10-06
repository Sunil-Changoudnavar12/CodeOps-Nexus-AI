import unittest

from fastapi.testclient import TestClient

from backend.app import app


class CodeReviewApiTests(unittest.TestCase):
    def setUp(self):
        self.client = TestClient(app)

    def test_code_review_returns_expected_response(self):
        response = self.client.post(
            "/api/code-review",
            json={"code": "# TODO: handle errors", "language": "python"},
        )

        self.assertEqual(response.status_code, 200)
        body = response.json()
        self.assertEqual(set(body), {"summary", "score", "issues"})
        self.assertEqual(body["score"], 90)
        self.assertEqual(
            set(body["issues"][0]),
            {"severity", "category", "line", "message", "suggestion"},
        )
        self.assertEqual(body["issues"][0]["line"], 1)


if __name__ == "__main__":
    unittest.main()
