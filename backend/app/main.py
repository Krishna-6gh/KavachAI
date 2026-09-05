"""
Kavach AI - Master FastAPI Application Entrypoint (Team Beat Bytes)
Production-grade neural forensic media analysis & legal preservation server.
"""

from contextlib import asynccontextmanager
from datetime import datetime, timezone
import logging
from fastapi import FastAPI, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles

from app.api.v1.api import api_router
from app.core.config import settings
from app.schemas.forensic import HealthResponse

# Configure structured logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - [%(levelname)s] - %(name)s - %(message)s",
)
logger = logging.getLogger("kavach_ai.main")


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Lifespan event handler for startup initialization and teardown."""
    logger.info("Initializing Kavach AI Forensic Engine (Team Beat Bytes)...")
    settings.ensure_directories()
    logger.info(f"Storage enclaves active: uploads={settings.UPLOAD_DIR}, reports={settings.REPORT_DIR}")
    logger.info(f"Cryptographic HSM Enclave: {settings.HSM_ENCLAVE_NODE_ID}")
    yield
    logger.info("Shutting down Kavach AI Forensic Engine. Vault state persisted.")


def create_application() -> FastAPI:
    """Application factory for Kavach AI FastAPI server."""
    app = FastAPI(
        title=settings.APP_NAME,
        description=(
            "Production-Grade Forensic Deepfake Detection & Legal Evidence Preservation Platform. "
            "Analyzes images, video, and audio for AI manipulation, generates Section 65B court dossiers, "
            "and maintains FIPS 140-3 Hardware Security Module Merkle tree chains of custody."
        ),
        version="1.0.0",
        docs_url="/docs",
        redoc_url="/redoc",
        openapi_url="/openapi.json",
        lifespan=lifespan,
    )

    # CORS Middleware Configuration
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.ALLOWED_ORIGINS,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # Static File Enclave Mounts
    app.mount("/uploads", StaticFiles(directory=str(settings.UPLOAD_DIR)), name="uploads")
    app.mount("/reports", StaticFiles(directory=str(settings.REPORT_DIR)), name="reports")

    # API V1 Router Inclusion
    app.include_router(api_router, prefix=settings.API_V1_PREFIX)

    # Health Check Endpoint
    @app.get(
        f"{settings.API_V1_PREFIX}/health",
        response_model=HealthResponse,
        status_code=status.HTTP_200_OK,
        tags=["System Health"],
        summary="Engine health & enclave readiness check",
    )
    async def health_check():
        return HealthResponse(
            status="HEALTHY",
            version="1.0.0",
            engine=settings.APP_NAME,
            hsm_enclave=settings.HSM_ENCLAVE_NODE_ID,
            device=settings.DEVICE,
            timestamp=datetime.now(timezone.utc).isoformat(),
        )

    # Root Discovery Endpoint
    @app.get("/", tags=["System Root"])
    async def root():
        return {
            "app": settings.APP_NAME,
            "version": "1.0.0",
            "team": "Beat Bytes",
            "docs": "/docs",
            "health": f"{settings.API_V1_PREFIX}/health",
            "status": "ONLINE",
        }

    return app


app = create_application()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app.main:app",
        host=settings.HOST,
        port=settings.PORT,
        reload=settings.DEBUG,
    )
