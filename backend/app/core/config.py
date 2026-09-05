"""
Kavach AI - Core Configuration Module
Manages application environment variables, directories, security keys, and CORS settings.
"""

import os
from pathlib import Path
from typing import List, Union
from pydantic import Field, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    # App Settings
    APP_NAME: str = "Kavach AI Forensic Engine"
    APP_ENV: str = "development"
    DEBUG: bool = True
    API_V1_PREFIX: str = "/api/v1"
    HOST: str = "0.0.0.0"
    PORT: int = 8000

    # CORS Settings
    ALLOWED_ORIGINS: Union[str, List[str]] = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:8000",
        "http://127.0.0.1:8000",
    ]

    @field_validator("ALLOWED_ORIGINS", mode="before")
    @classmethod
    def parse_cors_origins(cls, value: Union[str, List[str]]) -> List[str]:
        if isinstance(value, str) and not value.startswith("["):
            return [origin.strip() for origin in value.split(",") if origin.strip()]
        elif isinstance(value, (list, str)):
            return value
        raise ValueError("Invalid format for ALLOWED_ORIGINS")

    # Security & HSM Settings
    SECRET_KEY: str = "kavach_master_hmac_secret_key_change_in_production_2026"
    HSM_ENCLAVE_NODE_ID: str = "HSM-PRIMARY-01-FIPS140-3"
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 480

    # File Ingestion & Storage Limits
    MAX_FILE_SIZE_BYTES: int = 500 * 1024 * 1024  # 500 MB
    UPLOAD_DIR: Path = Path("./uploads")
    REPORT_DIR: Path = Path("./reports")

    # Hardware & Model Settings
    DEVICE: str = "cpu"
    LLM_PROVIDER: str = "local"
    OPENAI_API_KEY: str = ""

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=True,
        extra="ignore",
    )

    def ensure_directories(self) -> None:
        """Ensures that required uploads and reports directories exist."""
        self.UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
        self.REPORT_DIR.mkdir(parents=True, exist_ok=True)


# Global settings singleton
settings = Settings()
settings.ensure_directories()
