from fastapi import APIRouter, Depends
from sqlalchemy import func
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.db.models import ChatFeedback, ChatMessage, ChatSession
from app.schemas.dashboard import CategoryStat, DashboardResponse

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

    return DashboardResponse(
        total_sessions=db.query(ChatSession).count(),
        total_messages=db.query(ChatMessage).count(),
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
    )
