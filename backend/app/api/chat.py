from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.db.models import ChatFeedback, ChatMessage, ChatSession, utc_now
from app.schemas.chat import (
    ChatMessageResponse,
    ChatRequest,
    ChatResponse,
    ChatSessionCreateResponse,
    ChatSessionDetailResponse,
    ChatSessionResponse,
    FeedbackRequest,
    FeedbackResponse,
    Reference,
)
from app.services.ai_service import ai_service
from app.services.knowledge_service import search_knowledge

router = APIRouter()


@router.post("/chat/sessions", response_model=ChatSessionCreateResponse)
def create_chat_session(db: Session = Depends(get_db)) -> ChatSession:
    session = ChatSession(title="新咨询")
    db.add(session)
    db.commit()
    db.refresh(session)
    return session


@router.get("/chat/sessions", response_model=list[ChatSessionResponse])
def list_chat_sessions(db: Session = Depends(get_db)) -> list[ChatSession]:
    return (
        db.query(ChatSession)
        .order_by(ChatSession.updated_at.desc())
        .limit(50)
        .all()
    )


@router.get("/chat/sessions/{session_id}", response_model=ChatSessionDetailResponse)
def get_chat_session(
    session_id: str,
    db: Session = Depends(get_db),
) -> ChatSessionDetailResponse:
    session = db.get(ChatSession, session_id)
    if session is None:
        raise HTTPException(status_code=404, detail="Chat session not found")

    return ChatSessionDetailResponse(
        id=session.id,
        title=session.title,
        created_at=session.created_at,
        updated_at=session.updated_at,
        messages=[
            ChatMessageResponse(
                id=message.id,
                session_id=message.session_id,
                role=message.role,
                content=message.content,
                category=message.category,
                source=message.source,
                created_at=message.created_at,
                references=[],
            )
            for message in session.messages
        ],
    )


@router.delete("/chat/sessions/{session_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_chat_session(
    session_id: str,
    db: Session = Depends(get_db),
) -> None:
    session = db.get(ChatSession, session_id)
    if session is None:
        raise HTTPException(status_code=404, detail="Chat session not found")

    db.delete(session)
    db.commit()


@router.post("/chat", response_model=ChatResponse)
def chat(request: ChatRequest, db: Session = Depends(get_db)) -> ChatResponse:
    session = _get_or_create_session(db, request.session_id, request.message)
    message_text = request.message.strip()

    user_message = ChatMessage(
        session_id=session.id,
        role="user",
        content=message_text,
        category=request.category,
        source=None,
    )
    db.add(user_message)

    knowledge_items = search_knowledge(
        message=message_text,
        category=request.category,
    )
    reply, source = ai_service.generate_reply(
        message=message_text,
        category=request.category,
        language=request.language,
        knowledge_items=knowledge_items,
    )

    assistant_message = ChatMessage(
        session_id=session.id,
        role="assistant",
        content=reply,
        category=request.category,
        source=source,
    )
    db.add(assistant_message)
    session.updated_at = utc_now()
    db.commit()
    db.refresh(assistant_message)

    references = [
        Reference(
            title=str(item.get("title", "")),
            source_name=str(item.get("source_name", "")),
            source_url=str(item.get("source_url", "")),
        )
        for item in knowledge_items[:3]
    ]
    return ChatResponse(
        session_id=session.id,
        message_id=assistant_message.id,
        reply=reply,
        source=source,
        references=references,
    )


@router.post("/chat/feedback", response_model=FeedbackResponse)
def create_feedback(
    request: FeedbackRequest,
    db: Session = Depends(get_db),
) -> FeedbackResponse:
    message = db.get(ChatMessage, request.message_id)
    if message is None:
        raise HTTPException(status_code=404, detail="Chat message not found")

    feedback = (
        db.query(ChatFeedback)
        .filter(ChatFeedback.message_id == request.message_id)
        .one_or_none()
    )

    if feedback is None:
        feedback = ChatFeedback(
            message_id=request.message_id,
            rating=request.rating,
            comment=request.comment,
        )
        db.add(feedback)
    else:
        feedback.rating = request.rating
        feedback.comment = request.comment
        feedback.created_at = utc_now()

    db.commit()
    return FeedbackResponse(success=True)


def _get_or_create_session(
    db: Session,
    session_id: str | None,
    first_message: str,
) -> ChatSession:
    session = db.get(ChatSession, session_id) if session_id else None

    if session is not None:
        return session

    title = first_message.strip()[:32] or "新咨询"
    session = ChatSession(title=title)
    db.add(session)
    db.flush()
    return session
