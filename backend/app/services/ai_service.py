from typing import Any

NO_MATCH_REPLY = (
    "当前知识库中没有找到完全匹配的信息。"
    "建议确认学校、自治体或相关官方机构发布的信息。"
)


class AIService:
    """Local knowledge answer generator used by the RAG demo."""

    def generate_reply(
        self,
        *,
        message: str,
        category: str | None,
        language: str,
        knowledge_items: list[dict[str, Any]],
    ) -> tuple[str, str]:
        if not knowledge_items:
            return NO_MATCH_REPLY, "knowledge"

        primary_item = knowledge_items[0]
        content = str(primary_item.get("content", "")).strip()

        reply = (
            f"根据当前知识库，{content}\n\n"
            "不同学校、地区和个人情况可能存在差异，"
            "建议以官方机构、自治体或学校发布的信息为准。"
        )

        return reply, "knowledge"


ai_service = AIService()
