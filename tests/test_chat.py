from fastapi.testclient import TestClient

from app.api import chat as chat_module
from app.main import app


def test_chat_endpoint_returns_reply(monkeypatch):
    def fake_generate_reply(*, message: str, category: str | None, language: str):
        assert message == "在留卡地址变更怎么办？"
        assert category == "在留手续"
        assert language == "zh"
        return "测试回复", "mock"

    monkeypatch.setattr(
        chat_module.ai_service,
        "generate_reply",
        fake_generate_reply,
    )
    client = TestClient(app)

    response = client.post(
        "/api/chat",
        json={
            "message": "在留卡地址变更怎么办？",
            "category": "在留手续",
            "language": "zh",
        },
    )

    assert response.status_code == 200
    assert response.json() == {"reply": "测试回复", "source": "mock"}
