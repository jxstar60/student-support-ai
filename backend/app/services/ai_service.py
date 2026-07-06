from openai import OpenAI

from app.core.config import settings

SYSTEM_PROMPT = """
你是 Student Support AI，一个面向在日外国留学生的生活支援助手。
你的回答需要清晰、礼貌、谨慎。
你可以回答在留手续、生活指南、打工、奖学金、医疗保险、税金、学校生活、紧急支援等问题。
如果涉及正式手续、法律、签证、医疗、税务等内容，请提醒用户以官方机构发布的信息为准。
不要要求用户输入护照号码、在留卡号码、密码等个人敏感信息。
请使用用户选择的语言回答。
""".strip()

MOCK_REPLY = (
    "这是模拟回复。之后系统将接入 AI 模型和官方知识库，"
    "为您提供更准确的回答。"
)


class AIService:
    """Small wrapper around the OpenAI client with a mock fallback."""

    def __init__(self) -> None:
        self.api_key = settings.openai_api_key
        self.model = settings.openai_model
        self.client = OpenAI(api_key=self.api_key) if self.api_key else None

    def generate_reply(
        self,
        *,
        message: str,
        category: str | None,
        language: str,
    ) -> tuple[str, str]:
        if self.client is None:
            return MOCK_REPLY, "mock"

        category_text = category or "未选择"
        user_prompt = (
            f"咨询分类：{category_text}\n"
            f"回答语言：{language}\n"
            f"用户问题：{message}"
        )

        completion = self.client.chat.completions.create(
            model=self.model,
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": user_prompt},
            ],
            temperature=0.2,
        )

        reply = completion.choices[0].message.content or MOCK_REPLY
        return reply, "openai"


ai_service = AIService()
