"""
Kavach AI - Forensic Pydantic Schemas
Defines request/response models for media ingestion, neural analysis, custody ledger, and court dossiers.
"""

from enum import Enum
from typing import Any, Dict, List, Optional
from pydantic import BaseModel, Field


class VerdictEnum(str, Enum):
    TAMPERED = "TAMPERED"
    GENUINE = "GENUINE"
    CLONED_VOICE = "CLONED VOICE"
    INCONCLUSIVE = "INCONCLUSIVE"
    PENDING = "PENDING"


class SeverityEnum(str, Enum):
    CRITICAL = "CRITICAL"
    HIGH = "HIGH"
    EVAL = "EVAL"


class MediaTypeEnum(str, Enum):
    IMAGE = "image"
    VIDEO = "video"
    AUDIO = "audio"
    UNKNOWN = "unknown"


# --- Sub-Schemas for Neural & Spatial-Spectral Telemetry ---

class ViTPatchSchema(BaseModel):
    id: int = Field(..., description="Patch index (0-35 for 6x6 grid)")
    label: str = Field(..., description="Token label e.g., P-15")
    attention_weight: float = Field(..., description="Cross-attention head weight [0.0 - 1.0]")
    sub_pixel_drift: float = Field(..., description="Displacement anomaly in pixels")
    is_anomalous: bool = Field(..., description="Whether patch contains diffusion blending artifacts")
    anomaly_type: str = Field(default="NORMAL", description="Type of anomaly (DIFFUSION_SEAM, OPTICAL_WARP, NORMAL)")


class ELAResultSchema(BaseModel):
    intensity: int = Field(default=75, description="Rescale amplification factor percentage")
    mean_square_error: float = Field(default=48.2, description="Calculated compression MSE")
    compression_artifact_count: int = Field(default=1420, description="Count of anomalous high-frequency pixels")
    rescale_anomaly_score: float = Field(default=94.2, description="Rescale error anomaly score percentage")
    heatmap_bounding_boxes: List[Dict[str, Any]] = Field(default_factory=list, description="Coordinates of spliced regions")
    tampered_seams_detected: bool = Field(default=True, description="Whether compression mismatch seams were found")


class SpectralAudioResultSchema(BaseModel):
    sample_rate: str = Field(default="48.0 kHz 32-BIT")
    cutoff_frequency_hz: int = Field(default=14800, description="Brick-wall vocoder frequency cutoff in Hz")
    is_vocoder_detected: bool = Field(default=True, description="Detection of neural diffusion vocoder")
    spectral_phase_discontinuity: float = Field(default=0.942, description="Phase discontinuity score [0.0 - 1.0]")
    mfcc_coefficients: List[float] = Field(default_factory=list, description="MFCC spectral coefficients")
    harmonic_to_noise_ratio: float = Field(default=14.2, description="HNR in dB")
    biological_pulse_detected: bool = Field(default=False, description="Biological vocal tract variance status")


class C2PAClaimSchema(BaseModel):
    id: str
    title: str
    actor: str
    timestamp: str
    status: str = Field(..., description="valid, invalid, missing, warning")
    description: str
    cert_details: Optional[Dict[str, str]] = None


class EXIFItemSchema(BaseModel):
    label: str
    exif_value: str
    actual_discovered: str
    match: bool
    reason: str


# --- Primary Forensic Detection Models ---

class DetectionRequest(BaseModel):
    case_id: Optional[str] = Field(default="KV-0928-A", description="Case reference identifier")
    file_name: Optional[str] = Field(default="media_asset_0928.mp4", description="Name of exhibit asset")


class ForensicAnalysisResponse(BaseModel):
    file_name: str
    file_size_bytes: int
    sha256: str
    sha512: Optional[str] = None
    perceptual_hash: str
    media_type: MediaTypeEnum
    timestamp: str
    threat_score: int = Field(..., ge=0, le=100, description="Calculated synthetic risk score [0-100]")
    verdict: VerdictEnum
    confidence: float = Field(..., description="Statistical confidence score percentage")
    spatial_score: int
    spectral_score: int
    exif_score: int
    vit_patches: List[ViTPatchSchema]
    ela: ELAResultSchema
    audio: SpectralAudioResultSchema
    c2pa_claims: List[C2PAClaimSchema] = Field(default_factory=list)
    exif_items: List[EXIFItemSchema] = Field(default_factory=list)
    telemetry_summary: Dict[str, Any]


# --- Chain of Custody & Ledger Models ---

class MerkleNodeSchema(BaseModel):
    id: str
    label: str
    short_name: str
    hash: str
    raw_hex: str
    type: str
    status: str
    details: str
    meta: Dict[str, str]


class LedgerBlockSchema(BaseModel):
    block_number: str
    block_index: int
    previous_block_hash: str
    merkle_root_hash: str
    hsm_signature: str
    timestamp: str
    officer_badge: str
    jurisdiction: str
    case_id: str
    exhibit_name: str
    verdict: VerdictEnum
    confidence: float
    leaf_nodes: List[MerkleNodeSchema]


class VerdictSignRequest(BaseModel):
    verdict: VerdictEnum
    officer_badge: str = Field(default="#IN-PB-8821")
    jurisdiction: str = Field(default="STATE FORENSIC SCIENCE LAB")


# --- Q&A & AI Investigator Models ---

class InvestigatorChatRequest(BaseModel):
    question: str
    case_id: Optional[str] = "KV-0928-A"
    exhibit_name: Optional[str] = "media_asset_0928.mp4"
    verdict: Optional[str] = "TAMPERED"


class InvestigatorChatResponse(BaseModel):
    question: str
    answer: str
    legal_sections: List[str]
    admissibility_status: str
    confidence: str
    timestamp: str


# --- Shield & Tracing Models ---

class ShieldInterceptRequest(BaseModel):
    platform: str = Field(default="whatsapp", description="whatsapp, twitter, telegram, instagram")
    url: Optional[str] = ""
    media_hash: Optional[str] = "0x8f14b29c0a1e4d77"


class ShieldInterceptResponse(BaseModel):
    platform: str
    action: str = Field(..., description="BLOCKED, WARNED, CLEARED")
    threat_category: str
    confidence: float
    phash_match: str
    reason: str
    recommendation: str
    timestamp: str


# --- Standard Generic / Health Response ---

class StandardResponse(BaseModel):
    success: bool
    message: str
    data: Optional[Any] = None


class HealthResponse(BaseModel):
    status: str = "HEALTHY"
    version: str = "1.0.0"
    engine: str = "Kavach AI Neural Forensic Engine"
    hsm_enclave: str
    device: str
    timestamp: str
