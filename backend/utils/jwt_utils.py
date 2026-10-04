# backend/utils/jwt_utils.py

from jose import jwt
from datetime import datetime, timedelta, timezone
import os

SECRET_KEY = os.getenv("CODEOPS_JWT_SECRET", "local-development-secret-change-before-deploy")
ALGORITHM = "HS256"

def create_access_token(data: dict):
    to_encode = data.copy()

    expire = datetime.now(timezone.utc) + timedelta(hours=2)
    to_encode.update({"exp": expire})

    token = jwt.encode(
        to_encode,
        SECRET_KEY,
        algorithm=ALGORITHM
    )

    return token
