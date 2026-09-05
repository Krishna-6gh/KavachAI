"""
Kavach AI - Origin Tracing Endpoints
Provides botnet propagation maps and reverse perceptual hash lookup.
"""

from fastapi import APIRouter, HTTPException, Query, status
from pydantic import BaseModel
from app.schemas.forensic import StandardResponse
from app.services.tracing import tracing_service

router = APIRouter()


class ReverseLookupRequest(BaseModel):
    target_hash: str = "0x8f14b29c0a1e4d77"


@router.get(
    "/nodes",
    response_model=StandardResponse,
    status_code=status.HTTP_200_OK,
    summary="Get active origin and social media propagation nodes",
)
async def get_propagation_nodes():
    """Returns darknet seed nodes, closed messenger gateways, and syndicated targets."""
    nodes = tracing_service.get_propagation_nodes()
    return StandardResponse(
        success=True,
        message="Active propagation nodes retrieved.",
        data=nodes,
    )


@router.post(
    "/lookup",
    response_model=StandardResponse,
    status_code=status.HTTP_200_OK,
    summary="Reverse perceptual hash lookup across state cyber cell registries",
)
async def reverse_hash_lookup(payload: ReverseLookupRequest):
    """Matches an exhibit perceptual hash against known disinformation botnet swarms."""
    result = tracing_service.reverse_lookup(payload.target_hash)
    return StandardResponse(
        success=True,
        message="Reverse hash lookup completed.",
        data=result,
    )
