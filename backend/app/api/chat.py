from fastapi import APIRouter

from app.schemas.chat import ChatRequest, ChatResponse, Reference
from app.services.ai_service import ai_service
from app.services.knowledge_service import search_knowledge

router = APIRouter()


@router.post("/chat", response_model=ChatResponse)
def chat(request: ChatRequest) -> ChatResponse:
    knowledge_items = search_knowledge(
        message=request.message.strip(),
        category=request.category,
    )
    reply, source = ai_service.generate_reply(
        message=request.message.strip(),
        category=request.category,
        language=request.language,
        knowledge_items=knowledge_items,
    )
    references = [
        Reference(
            title=str(item.get("title", "")),
            source_name=str(item.get("source_name", "")),
            source_url=str(item.get("source_url", "")),
        )
        for item in knowledge_items
    ]
    return ChatResponse(reply=reply, source=source, references=references)
