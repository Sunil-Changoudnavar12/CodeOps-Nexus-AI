from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from backend.database import get_db
from backend.schemas.auth_schema import SignupRequest, LoginRequest
from backend.services.auth_service import signup_user, login_user

router = APIRouter()

@router.post("/signup")
def signup(data: SignupRequest, db: Session = Depends(get_db)):
    return signup_user(data, db)


@router.post("/login")
def login(data: LoginRequest, db: Session = Depends(get_db)):
    return login_user(data, db)
