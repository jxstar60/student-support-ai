from pydantic import BaseModel, Field


class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=1000)
    category: str | None = None
    language: str = "zh"


class Reference(BaseModel):
    title: str
    source_name: str
    source_url: str


class ChatResponse(BaseModel):
    reply: str
    source: str
    references: list[Reference] = Field(default_factory=list)
