from pydantic import BaseModel, Field


class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=1000)
    category: str | None = None
    language: str = "zh"


class ChatResponse(BaseModel):
    reply: str
    source: str
