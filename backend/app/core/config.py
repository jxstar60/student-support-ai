from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""

    app_name: str = "student-support-ai"
    app_version: str = "0.1.0"
    environment: str = "development"
    database_url: str = "sqlite:///./student_support_ai.db"
    openai_api_key: str | None = None
    openai_model: str = "gpt-4o-mini"
    backend_cors_origins: str = (
        "http://localhost:5173,http://127.0.0.1:5173"
    )

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    @property
    def cors_origins(self) -> list[str]:
        return [
            origin.strip()
            for origin in self.backend_cors_origins.split(",")
            if origin.strip()
        ]


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
