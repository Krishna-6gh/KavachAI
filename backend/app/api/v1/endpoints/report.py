"""
Kavach AI - Reporting, Q&A & Legal Dossier Endpoints
Powers explainable authenticity reports, Section 65B court packages, and verdict sealing.
"""

from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel
from app.schemas.forensic import (
    InvestigatorChatRequest,
    InvestigatorChatResponse,
    StandardResponse,
    VerdictEnum,
    VerdictSignRequest,
)
from app.services.custody_ledger import custody_ledger_service
from app.services.llm_reporter import llm_reporter_service

router = APIRouter()


class DossierGenerateRequest(BaseModel):
    case_id: str = "KV-0928-A"
    exhibit_name: str = "media_asset_0928.mp4"
    verdict: str = "TAMPERED"
    officer_badge: str = "#IN-PB-8821"
    jurisdiction: str = "STATE FORENSIC SCIENCE LAB"


@router.post(
    "/chat",
    response_model=StandardResponse,
    status_code=status.HTTP_200_OK,
    summary="Forensic LLM Investigator query",
)
async def query_investigator_ai(payload: InvestigatorChatRequest):
    """Answers investigator inquiries with Indian Cyber Law references and forensic breakdowns."""
    response = llm_reporter_service.generate_investigator_response(
        question=payload.question,
        case_id=payload.case_id or "KV-0928-A",
        exhibit_name=payload.exhibit_name or "media_asset_0928.mp4",
        verdict=payload.verdict or "TAMPERED",
    )
    return StandardResponse(
        success=True,
        message="Forensic explanation generated.",
        data=response.model_dump(),
    )


@router.post(
    "/dossier",
    response_model=StandardResponse,
    status_code=status.HTTP_200_OK,
    summary="Generate court-admissible Section 65B / ISO 27037 forensic dossier",
)
async def generate_court_dossier(payload: DossierGenerateRequest):
    """Generates an ISO 27037 court-admissible digital evidence package."""
    latest_block = custody_ledger_service.get_latest_block()
    dossier = llm_reporter_service.generate_dossier_package(
        case_id=payload.case_id,
        exhibit_name=payload.exhibit_name,
        verdict=payload.verdict,
        officer_badge=payload.officer_badge,
        jurisdiction=payload.jurisdiction,
        root_hash=latest_block.merkle_root_hash,
        hsm_sig=latest_block.hsm_signature,
    )
    return StandardResponse(
        success=True,
        message="Court dossier generated and sealed successfully.",
        data=dossier,
    )


@router.post(
    "/verdict",
    response_model=StandardResponse,
    status_code=status.HTTP_200_OK,
    summary="Officer Verdict Authority: cryptographically sign and seal verdict",
)
async def sign_officer_verdict(payload: VerdictSignRequest):
    """Cryptographically signs the case verdict and seals a new block into the Ledger Vault."""
    new_block = custody_ledger_service.seal_verdict_block(
        case_id="KV-0928-A",
        exhibit_name="media_asset_0928.mp4",
        verdict=payload.verdict,
        officer_badge=payload.officer_badge,
        jurisdiction=payload.jurisdiction,
    )
    return StandardResponse(
        success=True,
        message=f"Verdict '{payload.verdict.value}' cryptographically sealed in Block {new_block.block_number}.",
        data=new_block.model_dump(),
    )


@router.get(
    "/ledger",
    response_model=StandardResponse,
    status_code=status.HTTP_200_OK,
    summary="Retrieve full Merkle Tree chain of custody blocks",
)
async def get_ledger_blocks():
    """Returns the latest Merkle Tree nodes and history of sealed blocks."""
    blocks = custody_ledger_service.get_all_blocks()
    latest = custody_ledger_service.get_latest_block()
    return StandardResponse(
        success=True,
        message="Ledger vault retrieved.",
        data={
            "latest_block": latest.model_dump(),
            "all_blocks": [b.model_dump() for b in blocks],
            "merkle_tree_nodes": [n.model_dump() for n in latest.leaf_nodes],
        },
    )
