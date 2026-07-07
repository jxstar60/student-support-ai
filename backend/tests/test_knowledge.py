from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def test_knowledge_list_returns_items() -> None:
    response = client.get("/api/knowledge")

    assert response.status_code == 200
    assert isinstance(response.json(), list)
