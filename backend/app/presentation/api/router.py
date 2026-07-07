from fastapi import APIRouter

from app.api.admin import router as admin_router
from app.api.chat import router as chat_router
from app.api.documents import router as documents_router
from app.api.knowledge import router as knowledge_router
from app.presentation.api.v1.router import router as v1_router

api_router = APIRouter()
api_router.include_router(v1_router)
api_router.include_router(chat_router, prefix="/api", tags=["chat"])
api_router.include_router(knowledge_router, prefix="/api", tags=["knowledge"])
api_router.include_router(admin_router, prefix="/api/admin", tags=["admin"])
api_router.include_router(documents_router, prefix="/api", tags=["documents"])
