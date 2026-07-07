from fastapi import APIRouter, Depends
from sqlalchemy import func
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.db.models import ChatFeedback, ChatMessage, ChatSession
from app.schemas.dashboard import CategoryStat, DashboardResponse, RecentSession
from app.services.document_service import count_uploaded_documents
from app.services.knowledge_service import count_knowledge

router = APIRouter()


@router.get("/dashboard", response_model=DashboardResponse)
def get_dashboard(db: Session = Depends(get_db)) -> DashboardResponse:
    category_rows = (
        db.query(ChatMessage.category, func.count(ChatMessage.id))
        .filter(ChatMessage.role == "user")
        .filter(ChatMessage.category.isnot(None))
        .group_by(ChatMessage.category)
        .order_by(func.count(ChatMessage.id).desc())
        .all()
    )
    recent_sessions = (
        db.query(ChatSession)
        .order_by(ChatSession.updated_at.desc())
        .limit(5)
        .all()
    )

    return DashboardResponse(
        total_sessions=db.query(ChatSession).count(),
        total_messages=db.query(ChatMessage).count(),
        total_knowledge=count_knowledge(),
        total_documents=count_uploaded_documents(),
        total_feedback=db.query(ChatFeedback).count(),
        positive_feedback=(
            db.query(ChatFeedback)
            .filter(ChatFeedback.rating == "up")
            .count()
        ),
        negative_feedback=(
            db.query(ChatFeedback)
            .filter(ChatFeedback.rating == "down")
            .count()
        ),
        category_stats=[
            CategoryStat(category=str(category), count=count)
            for category, count in category_rows
        ],
        recent_sessions=[
            RecentSession(
                id=session.id,
                title=session.title,
                created_at=session.created_at,
                updated_at=session.updated_at,
            )
            for session in recent_sessions
        ],
    )
