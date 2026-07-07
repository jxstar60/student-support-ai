from fastapi import APIRouter, File, Form, HTTPException, UploadFile, status

from app.schemas.document import DocumentUploadResponse, UploadedDocument
from app.services.document_service import (
    delete_uploaded_document,
    import_document,
    list_uploaded_documents,
)

router = APIRouter()


@router.post("/documents/upload", response_model=DocumentUploadResponse)
async def upload_document(
    file: UploadFile = File(...),
    category: str = Form(...),
    source_name: str = Form(...),
    source_url: str = Form(...),
    keywords: str = Form(""),
) -> DocumentUploadResponse:
    content = await file.read()

    try:
        result = import_document(
            filename=file.filename or "",
            content=content,
            category=category,
            source_name=source_name,
            source_url=source_url,
            keywords_text=keywords,
        )
    except ValueError as error:
        raise HTTPException(status_code=400, detail=str(error)) from error
    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail="资料导入失败，请稍后再试",
        ) from error

    return DocumentUploadResponse(**result)


@router.get("/documents", response_model=list[UploadedDocument])
def get_documents() -> list[UploadedDocument]:
    return list_uploaded_documents()


@router.delete("/documents/{filename}", status_code=status.HTTP_204_NO_CONTENT)
def delete_document(filename: str) -> None:
    try:
        delete_uploaded_document(filename)
    except FileNotFoundError as error:
        raise HTTPException(status_code=404, detail=str(error)) from error
