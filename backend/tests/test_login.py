import unittest

from fastapi import HTTPException
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from backend.database import Base
from backend.schemas.auth_schema import LoginRequest, SignupRequest
from backend.services.auth_service import login_user, signup_user


class LoginAuthTests(unittest.TestCase):
    def setUp(self):
        self.engine = create_engine(
            "sqlite://",
            connect_args={"check_same_thread": False},
            poolclass=StaticPool,
        )
        Base.metadata.create_all(bind=self.engine)
        self.session = sessionmaker(bind=self.engine)()
        signup_user(
            SignupRequest(
                username="admin",
                email="admin@example.com",
                password="admin123",
                confirm_password="admin123",
            ),
            self.session,
        )

    def tearDown(self):
        self.session.close()
        self.engine.dispose()

    def test_signup_and_login_with_username_or_email(self):
        for login_id in ("admin", "ADMIN@example.com"):
            result = login_user(LoginRequest(login_id=login_id, password="admin123"), self.session)
            self.assertEqual(result["message"], "Login successful")
            self.assertTrue(result["access_token"])
            self.assertEqual(result["user"]["username"], "admin")

    def test_invalid_credentials_are_rejected(self):
        with self.assertRaises(HTTPException) as error:
            login_user(LoginRequest(login_id="admin", password="wrong-password"), self.session)
        self.assertEqual(error.exception.status_code, 401)

    def test_duplicate_email_is_rejected_case_insensitively(self):
        with self.assertRaises(HTTPException) as error:
            signup_user(
                SignupRequest(
                    username="another",
                    email="ADMIN@example.com",
                    password="admin123",
                    confirm_password="admin123",
                ),
                self.session,
            )
        self.assertEqual(error.exception.status_code, 400)


if __name__ == "__main__":
    unittest.main()
