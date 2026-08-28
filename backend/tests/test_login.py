import sys
import unittest
from pathlib import Path

backend_root = Path(__file__).resolve().parents[1]
if str(backend_root) not in sys.path:
    sys.path.insert(0, str(backend_root))

from services.auth_service import authenticate_user


class LoginAuthTests(unittest.TestCase):
    def test_valid_credentials_authenticate(self):
        result = authenticate_user("admin", "admin123")
        self.assertTrue(result["success"])
        self.assertEqual(result["user"]["role"], "admin")

    def test_invalid_credentials_authenticate(self):
        result = authenticate_user("admin", "wrong-password")
        self.assertFalse(result["success"])
        self.assertEqual(result["message"], "Invalid username or password")


if __name__ == "__main__":
    unittest.main()
