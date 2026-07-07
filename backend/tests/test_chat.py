from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def test_chat_returns_knowledge_reply() -> None:
    response = client.post(
        "/api/chat",
        json={
            "message": "留学生可以每周打工多少小时？",
            "category": "工作·打工",
            "language": "zh",
        },
    )

    assert response.status_code == 200
    body = response.json()
    assert body["source"] == "knowledge"
    assert body["reply"]
    assert "references" in body
