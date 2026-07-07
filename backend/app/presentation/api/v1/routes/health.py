from fastapi import APIRouter
from sqlalchemy import text

from app.core.config import settings
from app.db.database import engine
from app.services.document_service import list_uploaded_documents
from app.services.knowledge_service import load_knowledge_base

router = APIRouter()


@router.get("/health")
def health_check() -> dict[str, str]:
    return {
        "status": "ok",
        "app": settings.app_name,
        "database": _check_database(),
        "knowledge_base": _check_knowledge_base(),
        "documents": _check_documents(),
    }


def _check_database() -> str:
    try:
        with engine.connect() as connection:
            connection.execute(text("SELECT 1"))
        return "ok"
    except Exception:
        return "error"


def _check_knowledge_base() -> str:
    try:
        load_knowledge_base()
        return "ok"
    except Exception:
        return "error"


def _check_documents() -> str:
    try:
        list_uploaded_documents()
        return "ok"
    except Exception:
        return "error"
