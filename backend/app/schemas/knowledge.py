from pydantic import BaseModel, Field


class KnowledgeBase(BaseModel):
    category: str = Field(..., min_length=1)
    title: str = Field(..., min_length=1)
    content: str = Field(..., min_length=1)
    source_name: str = Field(..., min_length=1)
    source_url: str = Field(..., min_length=1)
    keywords: list[str] = Field(default_factory=list)
    document_filename: str | None = None


class KnowledgeCreate(KnowledgeBase):
    id: str | None = None


class KnowledgeUpdate(KnowledgeBase):
    id: str | None = None


class KnowledgeItem(KnowledgeBase):
    id: str
