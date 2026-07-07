import json
import logging
import re
from datetime import datetime, timezone
from pathlib import Path
from uuid import uuid4

import fitz

from app.schemas.document import UploadedDocument
from app.schemas.knowledge import KnowledgeCreate
from app.services.knowledge_service import CATEGORY_FILES, create_knowledge

logger = logging.getLogger(__name__)

UPLOAD_DIR = Path(__file__).resolve().parents[1] / "data" / "uploads"
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
DOCUMENTS_METADATA_PATH = UPLOAD_DIR / "documents.json"
MAX_UPLOAD_SIZE = 10 * 1024 * 1024
SUPPORTED_EXTENSIONS = {".pdf", ".txt"}

DOMAIN_KEYWORDS = [
    "搬家",
    "住址变更",
    "住所变更",
    "市区町村",
    "在留卡",
    "手续",
    "打工",
    "资格外活动",
    "工作时间",
    "国民健康保险",
    "奖学金",
    "税金",
    "学校",
    "紧急",
]


def import_document(
    *,
    filename: str,
    content: bytes,
    category: str,
    source_name: str,
    source_url: str,
    keywords_text: str,
) -> dict:
    safe_filename = _safe_filename(filename)
    extension = Path(safe_filename).suffix.lower()
    normalized_category = category.strip()
    normalized_source_name = source_name.strip()
    normalized_source_url = source_url.strip()
    file_size = len(content)

    logger.info(
        "Document upload received: filename=%s category=%s source_name=%s extension=%s size=%s",
        safe_filename,
        normalized_category,
        normalized_source_name,
        extension,
        file_size,
    )

    if not normalized_category:
        raise ValueError("请选择分类")

    if normalized_category not in CATEGORY_FILES:
        raise ValueError("请选择有效分类")

    if not normalized_source_name:
        raise ValueError("请填写来源机构")

    if not normalized_source_url:
        raise ValueError("请填写来源链接")

    if extension not in SUPPORTED_EXTENSIONS:
        raise ValueError("仅支持 PDF 或 TXT 文件")

    if file_size == 0:
        raise ValueError("文件内容为空，无法导入")

    if file_size > MAX_UPLOAD_SIZE:
        raise ValueError("文件过大，请上传 10MB 以内的文件")

    saved_path = _unique_upload_path(safe_filename)
    saved_path.write_bytes(content)

    text = _extract_text(saved_path, extension)
    chunks = split_text_into_chunks(text)

    if not chunks:
        raise ValueError("文件内容为空，无法导入")

    provided_keywords = _parse_keywords(keywords_text)
    for index, chunk in enumerate(chunks, start=1):
        keywords = provided_keywords or _extract_keywords(chunk)
        create_knowledge(
            KnowledgeCreate(
                id=f"doc_{uuid4().hex[:10]}",
                category=normalized_category,
                title=f"{saved_path.name} - 第{index}部分",
                content=chunk,
                source_name=normalized_source_name,
                source_url=normalized_source_url,
                keywords=keywords,
            )
        )

    metadata = {
        "filename": saved_path.name,
        "category": normalized_category,
        "source_name": normalized_source_name,
        "chunks_created": len(chunks),
        "uploaded_at": datetime.now(timezone.utc).isoformat(),
    }
    _append_metadata(metadata)

    logger.info(
        "Document import completed: filename=%s category=%s source_name=%s extension=%s size=%s chunks_created=%s",
        saved_path.name,
        normalized_category,
        normalized_source_name,
        extension,
        file_size,
        len(chunks),
    )

    return {
        "success": True,
        "filename": saved_path.name,
        "category": normalized_category,
        "chunks_created": len(chunks),
    }


def list_uploaded_documents() -> list[UploadedDocument]:
    return [
        UploadedDocument(**record)
        for record in _read_metadata()
        if record.get("filename") and (UPLOAD_DIR / record["filename"]).exists()
    ]


def delete_uploaded_document(filename: str) -> None:
    safe_filename = Path(filename).name
    file_path = UPLOAD_DIR / safe_filename

    if not file_path.exists():
        raise FileNotFoundError("上传文件不存在")

    file_path.unlink()
    metadata = [
        record
        for record in _read_metadata()
        if record["filename"] != safe_filename
    ]
    _write_metadata(metadata)


def split_text_into_chunks(text: str) -> list[str]:
    clean_text = text.replace("\ufeff", "").strip()
    paragraphs = [
        paragraph.strip()
        for paragraph in re.split(r"\n\s*\n|\r\n\s*\r\n", clean_text)
        if paragraph.strip()
    ]
    chunks: list[str] = []
    current = ""

    for paragraph in paragraphs:
        if not current:
            current = paragraph
            continue

        if len(current) + len(paragraph) <= 800:
            current = f"{current}\n\n{paragraph}"
        else:
            chunks.extend(_split_long_text(current))
            current = paragraph

    if current:
        chunks.extend(_split_long_text(current))

    return [chunk for chunk in chunks if chunk.strip()]


def _split_long_text(text: str) -> list[str]:
    if len(text) <= 800:
        return [text]

    chunks = []
    start = 0
    while start < len(text):
        end = min(start + 700, len(text))
        chunks.append(text[start:end].strip())
        start = end
    return chunks


def _extract_text(file_path: Path, extension: str) -> str:
    if extension == ".txt":
        return _read_txt(file_path)

    if extension == ".pdf":
        return _read_pdf(file_path)

    raise ValueError("仅支持 PDF 或 TXT 文件")


def _read_txt(file_path: Path) -> str:
    content = file_path.read_bytes()
    for encoding in ("utf-8-sig", "utf-8", "cp932"):
        try:
            return content.decode(encoding)
        except UnicodeDecodeError:
            continue
    return content.decode("utf-8", errors="ignore")


def _read_pdf(file_path: Path) -> str:
    document = fitz.open(file_path)
    try:
        pages = [page.get_text().strip() for page in document]
    finally:
        document.close()

    text = "\n\n".join(page for page in pages if page)
    if not text.strip():
        raise ValueError("PDF 无法解析文本，可能是扫描件或图片型 PDF")
    return text


def _parse_keywords(keywords_text: str) -> list[str]:
    if not keywords_text:
        return []
    return [
        keyword.strip()
        for keyword in re.split(r"[,，、\n]", keywords_text)
        if keyword.strip()
    ]


def _extract_keywords(text: str) -> list[str]:
    keywords = [keyword for keyword in DOMAIN_KEYWORDS if keyword in text]
    return keywords[:8] or ["官方资料", "留学生"]


def _safe_filename(filename: str) -> str:
    name = Path(filename).name.strip()
    if not name:
        raise ValueError("请选择文件")
    return name


def _unique_upload_path(filename: str) -> Path:
    path = UPLOAD_DIR / filename
    if not path.exists():
        return path

    stem = path.stem
    suffix = path.suffix
    return UPLOAD_DIR / f"{stem}_{uuid4().hex[:8]}{suffix}"


def _read_metadata() -> list[dict]:
    if not DOCUMENTS_METADATA_PATH.exists():
        return []
    with DOCUMENTS_METADATA_PATH.open("r", encoding="utf-8-sig") as file:
        data = json.load(file)

    if isinstance(data, list):
        return [record for record in data if isinstance(record, dict)]

    if isinstance(data, dict):
        return [data]

    return []


def _write_metadata(records: list[dict]) -> None:
    with DOCUMENTS_METADATA_PATH.open("w", encoding="utf-8") as file:
        json.dump(records, file, ensure_ascii=False, indent=2)
        file.write("\n")


def _append_metadata(record: dict) -> None:
    records = _read_metadata()
    records.append(record)
    _write_metadata(records)
