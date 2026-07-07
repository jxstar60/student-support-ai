from fastapi import APIRouter, HTTPException, Query, status

from app.schemas.knowledge import KnowledgeCreate, KnowledgeItem, KnowledgeUpdate
from app.services.knowledge_service import (
    create_knowledge,
    delete_knowledge,
    list_knowledge,
    update_knowledge,
)

router = APIRouter()


@router.get("/knowledge", response_model=list[KnowledgeItem])
def get_knowledge(
    category: str | None = Query(default=None),
    keyword: str | None = Query(default=None),
) -> list[KnowledgeItem]:
    return [
        KnowledgeItem(**item)
        for item in list_knowledge(category=category, keyword=keyword)
    ]


@router.post(
    "/knowledge",
    response_model=KnowledgeItem,
    status_code=status.HTTP_201_CREATED,
)
def post_knowledge(payload: KnowledgeCreate) -> KnowledgeItem:
    try:
        return create_knowledge(payload)
    except ValueError as error:
        raise HTTPException(status_code=400, detail=str(error)) from error


@router.put("/knowledge/{knowledge_id}", response_model=KnowledgeItem)
def put_knowledge(
    knowledge_id: str,
    payload: KnowledgeUpdate,
) -> KnowledgeItem:
    try:
        return update_knowledge(knowledge_id, payload)
    except KeyError as error:
        raise HTTPException(status_code=404, detail=str(error)) from error
    except ValueError as error:
        raise HTTPException(status_code=400, detail=str(error)) from error


@router.delete("/knowledge/{knowledge_id}", status_code=status.HTTP_204_NO_CONTENT)
def remove_knowledge(knowledge_id: str) -> None:
    try:
        delete_knowledge(knowledge_id)
    except KeyError as error:
        raise HTTPException(status_code=404, detail=str(error)) from error
