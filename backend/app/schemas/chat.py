from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field

class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=1000)
    category: str | None = None
    language: str = "zh"
    session_id: str | None = None


class Reference(BaseModel):
    title: str
    source_name: str
    source_url: str


class ChatResponse(BaseModel):
    session_id: str
    message_id: str
    reply: str
    source: str
    references: list[Reference] = Field(default_factory=list)


class ChatSessionCreateResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    title: str
    created_at: datetime
    updated_at: datetime | None = None


class ChatSessionResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    title: str
    created_at: datetime
    updated_at: datetime | None = None


class ChatMessageResponse(BaseModel):
    id: str
    session_id: str
    role: str
    content: str
    category: str | None = None
    source: str | None = None
    created_at: datetime
    references: list[Reference] = Field(default_factory=list)


class ChatSessionDetailResponse(BaseModel):
    id: str
    title: str
    created_at: datetime
    updated_at: datetime | None = None
    messages: list[ChatMessageResponse] = Field(default_factory=list)


class FeedbackRequest(BaseModel):
    message_id: str
    rating: str = Field(..., pattern="^(up|down)$")
    comment: str = ""


class FeedbackResponse(BaseModel):
    success: bool
