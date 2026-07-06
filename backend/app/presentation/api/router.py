from fastapi import APIRouter

from app.api.chat import router as chat_router
from app.presentation.api.v1.router import router as v1_router

api_router = APIRouter()
api_router.include_router(v1_router)
api_router.include_router(chat_router, prefix="/api", tags=["chat"])
