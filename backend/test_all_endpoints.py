"""
Comprehensive Test Suite for Kavach AI FastAPI Backend (Team Beat Bytes)
Validates all 5 core modules:
1. requirements.txt
2. ledger.py (ChainOfCustodyVault & Merkle Hash-Chained Blocks)
3. forensic_engine.py (ELA base64, Librosa STFT 10 harmonic points, pHash, C2PA)
4. legal_engine.py (CourtroomFindings EN/PA/HI, Section 63 BSA Schedule Certificate)
5. main.py (FastAPI Routes & Endpoints)
"""

from fastapi.testclient import TestClient
from main import app
from ledger import GLOBAL_VAULT, ChainOfCustodyVault
from forensic_engine import ForensicEngine
from legal_engine import LegalEngine

client = TestClient(app)

def run_tests():
    print("=== STARTING KAVACH AI BACKEND VERIFICATION SUITE ===")

    # 1. Health Endpoint
    res = client.get("/api/health")
    assert res.status_code == 200
    assert res.json()["status"] == "HEALTHY"
    print("[PASS] GET /api/health")

    # 2. PIN Verification: Inspector Gurpreet Singh (1947)
    res = client.post("/api/auth/verify-pin", json={"pin": "1947"})
    assert res.status_code == 200
    data = res.json()
    assert data["success"] is True
    assert data["officer"]["badge"] == "CP-8821"
    assert "FIPS" in data["fips_seal"]["hsm_standard"]
    print("[PASS] POST /api/auth/verify-pin (1947 -> Insp. Gurpreet Singh)")

    # 3. PIN Verification: SI Ananya Sharma (2026)
    res = client.post("/api/auth/verify-pin", json={"pin": "2026"})
    assert res.status_code == 200
    assert res.json()["officer"]["badge"] == "PB-4474"
    print("[PASS] POST /api/auth/verify-pin (2026 -> SI Ananya Sharma)")

    # 4. PIN Verification: DSP Vikramaditya (3310)
    res = client.post("/api/auth/verify-pin", json={"pin": "3310"})
    assert res.status_code == 200
    assert res.json()["officer"]["badge"] == "HQ-0001"
    print("[PASS] POST /api/auth/verify-pin (3310 -> DSP Vikramaditya)")

    # 5. Direct Module Test: ForensicEngine ELA and Audio Spectrum
    dummy_bytes = b"\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR\x00\x00\x00\x10\x00\x00\x00\x10\x08\x02\x00\x00\x00\x90\x91h6\x00\x00\x00\x0cIDATx\x9cc`\x00\x00\x00\x02\x00\x01H\xaf\xa4q\x00\x00\x00\x00IEND\xaeB`\x82"
    ela_score, ela_b64, ela_diag = ForensicEngine.compute_ela(dummy_bytes)
    assert isinstance(ela_score, float)
    assert ela_b64.startswith("data:image/png;base64,") or ela_b64 == ""
    print(f"[PASS] ForensicEngine.compute_ela (Score: {ela_score}, Status: {ela_diag['ela_status']})")

    audio_res = ForensicEngine.analyze_audio_spectrum(b"DUMMY_AUDIO_WAV_BYTES", "suspect_speech.wav")
    assert len(audio_res["chart_labels"]) == 10
    assert len(audio_res["chart_values"]) == 10
    assert len(audio_res["harmonic_points"]) == 10
    print("[PASS] ForensicEngine.analyze_audio_spectrum (10 Equidistant Chart.js Harmonic Points)")

    # 6. Direct Module Test: LegalEngine Findings & Section 63 BSA Certificate
    findings = LegalEngine.generate_courtroom_findings({
        "case_id": "KV-TEST-99",
        "file_name": "suspect_tampered.mp4",
        "verdict": "FAIL",
        "confidence_score": 95.5,
        "hashes": {"sha256": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"},
    })
    assert len(findings.plain_english_summary) > 20
    assert len(findings.punjabi_summary) > 20
    assert len(findings.hindi_summary) > 20
    print("[PASS] LegalEngine.generate_courtroom_findings (English, Punjabi Gurmukhi, Hindi Devanagari)")

    cert = LegalEngine.build_bsa_schedule_certificate(
        case_id="KV-TEST-99",
        file_name="suspect_tampered.mp4",
        file_sha256="e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
        verdict="FAIL (95.5%)",
        confidence=95.5,
        findings=findings,
    )
    assert "THE SCHEDULE" in cert
    assert "section 63(4)(c)" in cert
    assert "PART A" in cert
    assert "PART B" in cert
    print("[PASS] LegalEngine.build_bsa_schedule_certificate (Statutory Schedule Layout)")

    # 7. Direct Module Test: ChainOfCustodyVault Merkle Integrity
    vault = ChainOfCustodyVault()
    assert vault.verify_ledger_integrity() is True
    print("[PASS] ChainOfCustodyVault.verify_ledger_integrity (Unbroken Merkle Hash-Chain)")

    # 8. API Test: Forensic Analyze (Multipart Upload)
    files = {"file": ("suspect_deepfake_speech.mp4", dummy_bytes, "video/mp4")}
    form_data = {
        "case_id": "KV-0928-A",
        "officer_badge": "CP-8821",
        "officer_name": "Inspector Gurpreet Singh",
        "device_model": "Forensic Workstation Enclave (FIPS 140-3 HSM)",
        "device_serial": "CHD-CYBER-WS-0928",
    }
    res = client.post("/api/forensics/analyze", files=files, data=form_data)
    assert res.status_code == 200
    res_data = res.json()["data"]
    assert "hashes" in res_data
    assert "courtroom_findings" in res_data
    assert "bsa_certificate_text" in res_data
    assert "ledger_record" in res_data
    print(f"[PASS] POST /api/forensics/analyze (Verdict: {res_data['verdict']}, Block: {res_data['chain_of_custody_block']})")

    # 9. API Test: Origin Trace
    res = client.get("/api/forensics/origin-trace?phash=d8e1f0c2a4b89912")
    assert res.status_code == 200
    assert res.json()["total_nodes_traced"] == 3
    assert res.json()["propagation_vector"][0]["is_ground_zero"] is True
    print("[PASS] GET /api/forensics/origin-trace (3-Tier Vector: Telegram -> X -> WhatsApp)")

    # 10. API Test: Forensic Ledger
    res = client.get("/api/forensics/ledger")
    assert res.status_code == 200
    assert len(res.json()["ledger_blocks"]) >= 4
    assert res.json()["integrity_verification"]["chain_intact"] is True
    print("[PASS] GET /api/forensics/ledger (Chronological Hash-Chained Blocks)")

    # 11. API Test: Section 63 BSA Certificate Download
    res = client.get("/api/forensics/certificate/download?case_id=KV-0928-A")
    assert res.status_code == 200
    assert "THE SCHEDULE" in res.text
    assert "section 63(4)(c)" in res.text
    assert "PART A" in res.text
    assert "PART B" in res.text
    print("[PASS] GET /api/forensics/certificate/download (Plain-Text Section 63 BSA Certificate)")

    # 12. API Test: LLM Explain
    res = client.post("/api/forensics/llm-explain", json={
        "case_id": "KV-0928-A",
        "file_name": "suspect_speech_clip.mp4",
        "verdict": "FAIL",
        "confidence_score": 94.2,
    })
    assert res.status_code == 200
    assert "plain_english_summary" in res.json()["data"]
    assert "punjabi_summary" in res.json()["data"]
    assert "hindi_summary" in res.json()["data"]
    print("[PASS] POST /api/forensics/llm-explain")

    # 13. API Test: Investigator Chat
    res = client.post("/api/investigator/chat", json={
        "question": "What does the ELA analysis reveal about this video?",
        "caseId": "KV-0928-A",
        "exhibitName": "suspect_speech_clip.mp4",
        "verdict": "TAMPERED",
    })
    assert res.status_code == 200
    assert len(res.json()["data"]["response"]) > 20
    print("[PASS] POST /api/investigator/chat")

    # 14. API Test: Court Dossier Generate
    res = client.post("/api/dossier/generate", json={"caseId": "KV-0928-A"})
    assert res.status_code == 200
    assert "certificateOfAuthenticity" in res.json()["dossier"]
    print("[PASS] POST /api/dossier/generate")

    # 15. API Test: Live Threat Wire
    res = client.get("/api/threats/live")
    assert res.status_code == 200
    assert len(res.json()["data"]) >= 4
    print("[PASS] GET /api/threats/live")

    # 16. API Test: Interceptor & Benchmark
    res = client.post("/api/shield/intercept", json={"mediaHash": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"})
    assert res.status_code == 200
    assert res.json()["status"] == "INTERCEPTED"
    print("[PASS] POST /api/shield/intercept")

    res = client.post("/api/sentinel/benchmark", json={})
    assert res.status_code == 200
    assert res.json()["robustnessScore"] >= 90
    print("[PASS] POST /api/sentinel/benchmark")

    # 17. API Test: Court-Admissible Section 63 BSA PDF Generation
    res = client.post("/api/forensics/generate-court-pdf", json={
        "case_id": "KV-0928-A",
        "file_name": "suspect_speech_clip.mp4",
        "verdict": "FAIL",
        "confidence_score": 94.2,
        "vit_logit_score": 0.942,
        "ela_variance_score": 0.88,
        "c2pa_provenance_status": "STRIPPED",
        "sha256_hash": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
        "officer_name": "Inspector Gurpreet Singh",
        "badge_number": "CP-8821",
        "jurisdiction": "Cyber Crime Cell, Chandigarh Police",
    })
    assert res.status_code == 200
    assert res.headers.get("content-type") == "application/pdf"
    assert "Section_63_BSA" in res.headers.get("content-disposition", "")
    assert len(res.content) > 1000
    assert res.content.startswith(b"%PDF")
    print(f"[PASS] POST /api/forensics/generate-court-pdf (Server-Side Court PDF: {len(res.content)} bytes)")

    print("\n==========================================================================")
    print(">>> ALL 17 BACKEND FORENSIC & STATUTORY MODULE TESTS PASSED (100%) <<<")
    print("==========================================================================")


if __name__ == "__main__":
    run_tests()
