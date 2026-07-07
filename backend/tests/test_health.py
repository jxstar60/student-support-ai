from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def test_health_returns_status() -> None:
    response = client.get("/health")

    assert response.status_code == 200
    body = response.json()
    assert body["status"] == "ok"
    assert body["app"] == "Student Support AI"
    assert "database" in body
    assert "knowledge_base" in body
    assert "documents" in body
