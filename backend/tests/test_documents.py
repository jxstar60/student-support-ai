from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def test_documents_list_returns_items() -> None:
    response = client.get("/api/documents")

    assert response.status_code == 200
    assert isinstance(response.json(), list)
