from pydantic import BaseModel, Field


class CategoryStat(BaseModel):
    category: str
    count: int


class DashboardResponse(BaseModel):
    total_sessions: int
    total_messages: int
    total_feedback: int
    positive_feedback: int
    negative_feedback: int
    category_stats: list[CategoryStat] = Field(default_factory=list)
