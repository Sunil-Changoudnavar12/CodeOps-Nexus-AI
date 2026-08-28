# backend/routes/__init__.py

from .user_auth import router as auth_router
__all__ = ['auth_router']
