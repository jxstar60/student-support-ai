from datetime import datetime

from pydantic import BaseModel


class DocumentUploadResponse(BaseModel):
    success: bool
    filename: str
    category: str
    chunks_created: int


class UploadedDocument(BaseModel):
    filename: str
    category: str
    source_name: str
    chunks_created: int
    uploaded_at: datetime
