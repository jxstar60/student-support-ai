from datetime import datetime

from pydantic import BaseModel, Field


class CategoryStat(BaseModel):
    category: str
    count: int


class RecentSession(BaseModel):
    id: str
    title: str
    created_at: datetime
    updated_at: datetime | None = None


class DashboardResponse(BaseModel):
    total_sessions: int
    total_messages: int
    total_knowledge: int
    total_documents: int
    total_feedback: int
    positive_feedback: int
    negative_feedback: int
    category_stats: list[CategoryStat] = Field(default_factory=list)
    recent_sessions: list[RecentSession] = Field(default_factory=list)
