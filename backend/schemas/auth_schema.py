# backend/schemas/auth_schema.py

from pydantic import AliasChoices, BaseModel, ConfigDict, EmailStr, Field

class SignupRequest(BaseModel):
    username: str
    email: EmailStr
    password: str
    confirm_password: str


class LoginRequest(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    login_id: str = Field(validation_alias=AliasChoices("login_id", "username"))
    password: str
