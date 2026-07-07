import json
from pathlib import Path
from typing import Any
from uuid import uuid4

from app.schemas.knowledge import KnowledgeCreate, KnowledgeItem, KnowledgeUpdate

KnowledgeRecord = dict[str, Any]

KNOWLEDGE_DIR = Path(__file__).resolve().parents[1] / "data" / "knowledge"

CATEGORY_FILES = {
    "在留手续": "visa.json",
    "生活指南": "life.json",
    "工作·打工": "work.json",
    "打工": "work.json",
    "奖学金": "scholarship.json",
    "医疗保险": "insurance.json",
    "保险·税金": "insurance.json",
    "税金": "tax.json",
    "学校生活": "school.json",
    "紧急支援": "emergency.json",
}

FILE_PREFIXES = {
    "visa.json": "visa",
    "life.json": "life",
    "work.json": "work",
    "scholarship.json": "scholarship",
    "insurance.json": "insurance",
    "tax.json": "tax",
    "school.json": "school",
    "emergency.json": "emergency",
}


def load_knowledge_base() -> dict[str, list[KnowledgeRecord]]:
    knowledge_base: dict[str, list[KnowledgeRecord]] = {}

    for file_path in sorted(KNOWLEDGE_DIR.glob("*.json")):
        with file_path.open("r", encoding="utf-8") as file:
            knowledge_base[file_path.name] = json.load(file)

    return knowledge_base


def list_knowledge(
    category: str | None = None,
    keyword: str | None = None,
) -> list[KnowledgeRecord]:
    items = _target_items(category)
    normalized_keyword = (keyword or "").strip().lower()

    if not normalized_keyword:
        return items

    return [
        item
        for item in items
        if _matches_keyword(item, normalized_keyword)
    ]


def search_knowledge(message: str, category: str | None) -> list[KnowledgeRecord]:
    scored_items = [
        (_score_item(message, item), item)
        for item in _target_items(category)
    ]

    matches = [
        item
        for score, item in sorted(
            scored_items,
            key=lambda scored_item: scored_item[0],
            reverse=True,
        )
        if score > 0
    ]

    return matches[:3]


def create_knowledge(payload: KnowledgeCreate) -> KnowledgeItem:
    file_name = _file_name_for_category(payload.category)
    records = _read_file(file_name)
    record = payload.model_dump()
    record["id"] = record["id"] or _generate_id(file_name)

    if _find_record(record["id"]):
        raise ValueError("Knowledge id already exists")

    records.append(record)
    _write_file(file_name, records)
    return KnowledgeItem(**record)


def update_knowledge(knowledge_id: str, payload: KnowledgeUpdate) -> KnowledgeItem:
    current_file_name, current_index, _ = _find_record_or_raise(knowledge_id)
    next_file_name = _file_name_for_category(payload.category)
    next_record = payload.model_dump()
    next_record["id"] = payload.id or knowledge_id

    if next_record["id"] != knowledge_id and _find_record(next_record["id"]):
        raise ValueError("Knowledge id already exists")

    if current_file_name == next_file_name:
        records = _read_file(current_file_name)
        records[current_index] = next_record
        _write_file(current_file_name, records)
    else:
        old_records = _read_file(current_file_name)
        old_records.pop(current_index)
        _write_file(current_file_name, old_records)

        new_records = _read_file(next_file_name)
        new_records.append(next_record)
        _write_file(next_file_name, new_records)

    return KnowledgeItem(**next_record)


def delete_knowledge(knowledge_id: str) -> None:
    file_name, index, _ = _find_record_or_raise(knowledge_id)
    records = _read_file(file_name)
    records.pop(index)
    _write_file(file_name, records)


def _target_items(category: str | None) -> list[KnowledgeRecord]:
    knowledge_base = load_knowledge_base()

    if category:
        file_name = CATEGORY_FILES.get(category)
        if file_name:
            return knowledge_base.get(file_name, [])

    items: list[KnowledgeRecord] = []
    for knowledge_items in knowledge_base.values():
        items.extend(knowledge_items)
    return items


def _score_item(message: str, item: KnowledgeRecord) -> int:
    normalized_message = message.lower()
    score = 0

    for keyword in item.get("keywords", []):
        keyword_text = str(keyword).lower()
        if keyword_text and keyword_text in normalized_message:
            score += 3

    title = str(item.get("title", "")).lower()
    content = str(item.get("content", "")).lower()
    category = str(item.get("category", "")).lower()

    for phrase in [title, category]:
        if phrase and phrase in normalized_message:
            score += 2

    for token in _tokenize(normalized_message):
        if token in title:
            score += 2
        if token in content:
            score += 1
        if token in category:
            score += 1

    return score


def _matches_keyword(item: KnowledgeRecord, keyword: str) -> bool:
    fields = [
        str(item.get("id", "")),
        str(item.get("category", "")),
        str(item.get("title", "")),
        str(item.get("content", "")),
        str(item.get("source_name", "")),
        " ".join(str(keyword) for keyword in item.get("keywords", [])),
    ]
    return keyword in " ".join(fields).lower()


def _tokenize(text: str) -> list[str]:
    separators = ["?", "？", "，", ",", "。", ".", "、", "；", ";", "：", ":"]
    for separator in separators:
        text = text.replace(separator, " ")
    return [token for token in text.split() if token]


def _file_name_for_category(category: str) -> str:
    file_name = CATEGORY_FILES.get(category)
    if not file_name:
        raise ValueError("Unsupported knowledge category")
    return file_name


def _read_file(file_name: str) -> list[KnowledgeRecord]:
    file_path = KNOWLEDGE_DIR / file_name
    with file_path.open("r", encoding="utf-8") as file:
        return json.load(file)


def _write_file(file_name: str, records: list[KnowledgeRecord]) -> None:
    file_path = KNOWLEDGE_DIR / file_name
    with file_path.open("w", encoding="utf-8") as file:
        json.dump(records, file, ensure_ascii=False, indent=2)
        file.write("\n")


def _find_record(knowledge_id: str) -> tuple[str, int, KnowledgeRecord] | None:
    for file_name, records in load_knowledge_base().items():
        for index, record in enumerate(records):
            if record.get("id") == knowledge_id:
                return file_name, index, record
    return None


def _find_record_or_raise(knowledge_id: str) -> tuple[str, int, KnowledgeRecord]:
    result = _find_record(knowledge_id)
    if result is None:
        raise KeyError("Knowledge item not found")
    return result


def _generate_id(file_name: str) -> str:
    prefix = FILE_PREFIXES.get(file_name, "knowledge")
    return f"{prefix}_{uuid4().hex[:8]}"
