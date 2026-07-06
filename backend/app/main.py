from fastapi import FastAPI

from app.core.config import settings
from app.core.cors import configure_cors
from app.presentation.api.router import api_router


def create_app() -> FastAPI:
    """Create and configure the FastAPI application."""
    app = FastAPI(
        title=settings.app_name,
        version=settings.app_version,
        docs_url="/docs",
        redoc_url="/redoc",
    )

    configure_cors(app)
    app.include_router(api_router)

    return app


app = create_app()
