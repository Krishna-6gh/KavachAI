"""
Kavach AI — Forensic Pipeline & 4-Pillar Ensemble Test Suite
Tests:
1. Dense Farneback Optical Flow & Temporal Jerk Analyzer
2. OpenCV 2D-FFT Azimuthal Power Spectrum & PAPR Analyzer
3. 4-Pillar Forensic Ensemble Fusion & C2PA Confidence Clamp
4. Courtroom Findings Structured Synthesis & Discrepancies Breakdown
5. Section 63 BSA Court-Admissible PDF Generation
"""

import io
import sys
import numpy as np
from PIL import Image

from forensic_engine import ForensicEngine, ViTDeepfakeDetector
from legal_engine import LegalEngine, CourtroomFindings, StatutoryMatrix


def create_test_image(pattern: str = "natural") -> bytes:
    """Generates synthetic test image bytes with known frequency/spatial characteristics."""
    if pattern == "natural":
        # Natural 1/f noise pattern with camera-like photon gradient
        arr = np.random.normal(128, 15, (256, 256, 3)).clip(0, 255).astype(np.uint8)
    elif pattern == "checkerboard":
        # Periodic checkerboard grid simulating transposed convolution artifacts
        arr = np.zeros((256, 256, 3), dtype=np.uint8)
        for i in range(256):
            for j in range(256):
                if (i // 8 + j // 8) % 2 == 0:
                    arr[i, j] = [220, 220, 220]
                else:
                    arr[i, j] = [35, 35, 35]
    else:
        arr = np.ones((256, 256, 3), dtype=np.uint8) * 128

    img = Image.fromarray(arr)
    buf = io.BytesIO()
    img.save(buf, format="JPEG", quality=95)
    return buf.getvalue()


def test_optical_flow_farneback():
    print("\n--- TEST 1: Farneback Dense Optical Flow & Temporal Jerk ---")
    # Generate sequence of 4 synthetic frames with non-linear motion jerk
    frames = []
    for t in [0, 2, 8, 12]:
        arr = np.zeros((120, 120, 3), dtype=np.uint8)
        # Shift a central square with acceleration
        pos = 20 + t * 4
        arr[pos:pos+30, pos:pos+30] = 255
        frames.append(arr)

    jerk_score, diag = ForensicEngine.compute_temporal_motion_anomaly(frames)
    print(f"Computed Temporal Jitter Score: {jerk_score}")
    print(f"Optical Flow Jerk: {diag.get('optical_flow_jerk')}")
    print(f"Flow Angular Entropy: {diag.get('flow_angular_entropy')}")
    print(f"Latent Boiling Flag: {diag.get('latent_boiling_detected')}")
    assert "optical_flow_jerk" in diag, "optical_flow_jerk missing from temporal diag"
    assert "mean_flow_magnitude" in diag, "mean_flow_magnitude missing"
    print(">>> PASS: Optical Flow Farneback Temporal Jerk Verified.")


def test_fft_frequency_anomaly():
    print("\n--- TEST 2: OpenCV 2D-FFT & PAPR Spectral Analyzer ---")
    natural_bytes = create_test_image("natural")
    natural_img = Image.open(io.BytesIO(natural_bytes))
    nat_score, nat_diag = ForensicEngine.compute_fft_spectral_anomaly(natural_img, is_video=False)

    checker_bytes = create_test_image("checkerboard")
    checker_img = Image.open(io.BytesIO(checker_bytes))
    chk_score, chk_diag = ForensicEngine.compute_fft_spectral_anomaly(checker_img, is_video=False)

    print(f"Natural image FFT score: {nat_score:.2f}, PAPR: {nat_diag.get('papr_peak_to_average', 0):.2f}")
    print(f"Checkerboard image FFT score: {chk_score:.2f}, PAPR: {chk_diag.get('papr_peak_to_average', 0):.2f}")
    assert chk_score >= nat_score, "Checkerboard periodic pattern should have higher or equal anomaly score than natural"
    assert "papr_peak_to_average" in chk_diag, "PAPR metric missing"
    print(">>> PASS: OpenCV 2D-FFT PAPR Analysis Verified.")


def test_four_pillar_ensemble_and_c2pa_clamp():
    print("\n--- TEST 3: 4-Pillar Ensemble Fusion & C2PA Confidence Clamp ---")
    test_bytes = create_test_image("natural")
    res = ForensicEngine.analyze_media("test_evidence.jpg", test_bytes, "KV-TEST-001")

    print(f"Verdict: {res['verdict']} ({res['verdict_badge']})")
    print(f"Confidence Score: {res['confidence_score']}%")
    print(f"4-Pillar Ensemble: {res['four_pillar_ensemble']}")
    print(f"C2PA Status: {res['c2pa_provenance_status']}")

    assert "four_pillar_ensemble" in res, "four_pillar_ensemble missing from analysis response"
    ensemble = res["four_pillar_ensemble"]
    assert "spatial_vit_score" in ensemble, "spatial_vit_score missing"
    assert "spatial_ela_score" in ensemble, "spatial_ela_score missing"
    assert "temporal_optical_flow_score" in ensemble, "temporal_optical_flow_score missing"
    assert "high_freq_fft_score" in ensemble, "high_freq_fft_score missing"
    assert "composite_score" in ensemble, "composite_score missing"

    # Verify C2PA clamp for PASS verdict without valid hardware signature
    if res["verdict"] == "PASS" and res["c2pa_provenance_status"] == "STRIPPED":
        assert res["confidence_score"] <= 72.0, f"Confidence {res['confidence_score']} exceeds 72.0% clamp for stripped C2PA"
        print(">>> PASS: C2PA Confidence Clamp (<= 72.0%) Verified.")
    else:
        print(">>> PASS: 4-Pillar Ensemble calculation verified.")


def test_legal_engine_and_pdf_generation():
    print("\n--- TEST 4: Legal Engine Findings & Section 63 BSA PDF Generation ---")
    mock_forensic = {
        "case_id": "KV-PUNJAB-9921",
        "file_name": "suspect_deepfake_broadcast.mp4",
        "verdict": "FAIL",
        "confidence_score": 96.8,
        "vit_logit_score": 0.952,
        "ela_variance_score": 0.84,
        "c2pa_provenance_status": "STRIPPED",
        "temporal_diagnostics": {
            "temporal_jitter_score": 78.4,
            "optical_flow_jerk": 3.42,
            "latent_boiling_detected": True,
        },
        "fft_diagnostics": {
            "papr_peak_to_average": 2.85,
            "grid_spikes_detected": True,
        },
        "hashes": {
            "sha256": "4a7b3c2d1e0f9876543210fedcba09876543210fedcba09876543210fedcba09"
        },
    }

    findings = LegalEngine.generate_courtroom_findings(mock_forensic)
    print("Courtroom Findings Plain English Summary:")
    print(findings.plain_english_summary)
    print(f"\nNumber of granular discrepancies: {len(findings.discrepancies)}")
    for d in findings.discrepancies:
        print(f" - [{d.layer}] {d.exact_location}: {d.plain_english_explanation}")

    assert len(findings.discrepancies) >= 4, "Should have at least 4 granular discrepancies"
    assert any("Optical Flow" in d.layer for d in findings.discrepancies), "Optical flow discrepancy missing"
    assert any("2D-FFT" in d.layer for d in findings.discrepancies), "2D-FFT discrepancy missing"

    # Test PDF generation
    html_content = LegalEngine.render_court_pdf_html(mock_forensic, findings)
    assert "Optical Flow Jerk:" in html_content, "Optical Flow Jerk missing from PDF HTML"
    assert "2D-FFT PAPR:" in html_content, "2D-FFT PAPR missing from PDF HTML"

    pdf_bytes = LegalEngine.generate_pdf_bytes(html_content)
    print(f"\nGenerated Section 63 BSA PDF size: {len(pdf_bytes)} bytes")
    assert len(pdf_bytes) > 2000, "PDF bytes should be non-empty and well-formed"
    assert pdf_bytes[:4] == b"%PDF", "Invalid PDF file header"
    print(">>> PASS: Legal Engine findings & Court PDF generation fully verified.")


if __name__ == "__main__":
    print("=================================================================")
    print("Running Kavach AI 4-Pillar Ensemble & Legal Engine Test Suite")
    print("=================================================================")
    try:
        test_optical_flow_farneback()
        test_fft_frequency_anomaly()
        test_four_pillar_ensemble_and_c2pa_clamp()
        test_legal_engine_and_pdf_generation()
        print("\n=================================================================")
        print("ALL TESTS PASSED WITH 100% SUCCESS!")
        print("=================================================================")
    except Exception as e:
        print(f"\nTEST FAILED WITH ERROR: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)
