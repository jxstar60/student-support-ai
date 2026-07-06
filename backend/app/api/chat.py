from fastapi import APIRouter

from app.schemas.chat import ChatRequest, ChatResponse
from app.services.ai_service import ai_service

router = APIRouter()


@router.post("/chat", response_model=ChatResponse)
def chat(request: ChatRequest) -> ChatResponse:
    reply, source = ai_service.generate_reply(
        message=request.message.strip(),
        category=request.category,
        language=request.language,
    )
    return ChatResponse(reply=reply, source=source)
