# backend/services/auth_service.py

from fastapi import HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func, or_

from backend.models.user_module import User
from backend.utils.password_util import hash_password, verify_password
from backend.utils.jwt_utils import create_access_token

def signup_user(data, db: Session):
    if data.password != data.confirm_password:
        raise HTTPException(
            status_code=400,
            detail="Passwords do not match"
        )

    username = data.username.strip()
    email = str(data.email).strip().lower()
    existing_user = db.query(User).filter(
        or_(func.lower(User.email) == email, func.lower(User.username) == username.lower())
    ).first()

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    new_user = User(
        username=username,
        email=email,
        password_hash=hash_password(data.password),
        role="user",
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    token = create_access_token({
        "user_id": new_user.id,
        "email": new_user.email,
    })

    return {
        "message": "Signup successful",
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": new_user.id,
            "username": new_user.username,
            "email": new_user.email,
        }
    }


def login_user(data, db: Session):
    user = db.query(User).filter(
        or_(
            func.lower(User.username) == data.login_id.strip().lower(),
            func.lower(User.email) == data.login_id.strip().lower()
        )
    ).first()

    if not user:
        raise HTTPException(
            status_code=401,
            detail="Invalid username/email or password"
        )

    if not verify_password(data.password, user.password_hash):
        raise HTTPException(
            status_code=401,
            detail="Invalid username/email or password"
        )

    token = create_access_token({
        "user_id": user.id,
        "email": user.email,
       
    })

    return {
        "message": "Login successful",
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "username": user.username,
            "email": user.email,
           
        }
    }
