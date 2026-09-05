"""
Kavach AI - V1 Master API Router
Combines all v1 endpoint routers (detect, trace, report, shield).
"""

from fastapi import APIRouter
from app.api.v1.endpoints import detect, report, shield, trace

api_router = APIRouter()

api_router.include_router(detect.router, prefix="/detect", tags=["Forensic Detection & Upload"])
api_router.include_router(trace.router, prefix="/trace", tags=["Origin Tracing & Propagation"])
api_router.include_router(report.router, prefix="/report", tags=["Reporting & Section 65B Dossier"])
api_router.include_router(shield.router, prefix="/shield", tags=["Kavach Shield & Extension Protection"])
