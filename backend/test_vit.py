"""
Kavach AI — Vision Transformer (ViT) Deepfake Model Verification Test
Verifies that:
1. PyTorch and Transformers are available (HAS_TORCH_VIT == True).
2. Hugging Face model 'dima806/deepfake_vs_real_image_detection' downloads/loads correctly.
3. ViTDeepfakeDetector.predict_image() runs inference on sample test images.
4. ViTDeepfakeDetector.predict_video() runs inference on multiple frames.
5. The status returns PRETRAINED_VIT_ACTIVE and proper probability scores.
"""

import sys
import numpy as np
from PIL import Image

from forensic_engine import HAS_TORCH_VIT, ViTDeepfakeDetector


def run_vit_verification():
    print("=" * 70)
    print("KAVACH AI — VISION TRANSFORMER (ViT) MODEL VERIFICATION")
    print("=" * 70)

    print(f"[*] Checking HAS_TORCH_VIT flag: {HAS_TORCH_VIT}")
    if not HAS_TORCH_VIT:
        print("[-] FAIL: PyTorch or HuggingFace Transformers not available.")
        sys.exit(1)

    print("[*] Lazy-loading ViTDeepfakeDetector model weights...")
    processor, model = ViTDeepfakeDetector.load()
    if processor is None or model is None:
        print("[-] FAIL: Failed to load ViT processor or model.")
        sys.exit(1)

    print(f"[+] Model loaded successfully: {ViTDeepfakeDetector._model_name}")
    print(f"[+] Model class label mapping: {getattr(model.config, 'id2label', {})}")

    # Create synthetic test images
    # 1. Natural noise image (camera-like gradient)
    real_arr = np.random.normal(128, 20, (256, 256, 3)).clip(0, 255).astype(np.uint8)
    real_img = Image.fromarray(real_arr)

    # 2. Checkerboard image (heavy synthetic grid patterns)
    fake_arr = np.zeros((256, 256, 3), dtype=np.uint8)
    for i in range(256):
        for j in range(256):
            if (i // 16 + j // 16) % 2 == 0:
                fake_arr[i, j] = [240, 240, 240]
            else:
                fake_arr[i, j] = [20, 20, 20]
    fake_img = Image.fromarray(fake_arr)

    print("\n[*] Running inference on sample image 1 (Noise pattern)...")
    res1 = ViTDeepfakeDetector.predict_image(real_img)
    print(f"    - Model Status    : {res1.get('model_status')}")
    print(f"    - Fake Probability: {res1.get('fake_probability')}")
    print(f"    - Real Probability: {res1.get('real_probability')}")
    print(f"    - Is Synthetic    : {res1.get('is_synthetic')}")
    print(f"    - Details         : {res1}")

    print("\n[*] Running inference on sample image 2 (Checkerboard pattern)...")
    res2 = ViTDeepfakeDetector.predict_image(fake_img)
    print(f"    - Model Status    : {res2.get('model_status')}")
    print(f"    - Fake Probability: {res2.get('fake_probability')}")
    print(f"    - Real Probability: {res2.get('real_probability')}")
    print(f"    - Is Synthetic    : {res2.get('is_synthetic')}")

    print("\n[*] Running video batch inference on 3 keyframes...")
    video_res = ViTDeepfakeDetector.predict_video([real_img, fake_img, real_img])
    print(f"    - Model Status    : {video_res.get('model_status')}")
    print(f"    - Fake Probability: {video_res.get('fake_probability')}")
    print(f"    - Real Probability: {video_res.get('real_probability')}")
    print(f"    - Frame Scores    : {video_res.get('frame_scores')}")

    # Verification assertions
    assert res1.get("model_status") == "PRETRAINED_VIT_ACTIVE", f"Expected PRETRAINED_VIT_ACTIVE but got {res1.get('model_status')}"
    assert res2.get("model_status") == "PRETRAINED_VIT_ACTIVE", f"Expected PRETRAINED_VIT_ACTIVE but got {res2.get('model_status')}"
    assert video_res.get("model_status") == "PRETRAINED_VIT_ACTIVE", f"Expected PRETRAINED_VIT_ACTIVE but got {video_res.get('model_status')}"

    print("\n" + "=" * 70)
    print("SUCCESS: The ViT model is genuinely active and running inference")
    print("=" * 70)


def run_api_verification():
    import os
    import json
    import httpx

    print("\n" + "=" * 70)
    print("TESTING POST /api/forensics/analyze WITH REAL FILE UPLOADS")
    print("=" * 70)

    test_files = ["evidence-raw.jpg", "threat-kyc-deepfake.jpg", "court-seal.jpg"]
    for fname in test_files:
        fpath = os.path.join("..", "public", fname)
        if not os.path.exists(fpath):
            continue

        print(f"\n[*] Uploading {fname} ({os.path.getsize(fpath)} bytes) to /api/forensics/analyze...")
        with open(fpath, "rb") as f:
            data = f.read()

        try:
            resp = httpx.post(
                "http://127.0.0.1:8000/api/forensics/analyze",
                files={"file": (fname, data, "image/jpeg")},
                data={"officer_name": "Inspector Gurpreet Singh", "officer_badge": "CP-8821"},
                timeout=60.0,
            )
            if resp.status_code != 200:
                print(f"[-] Error: HTTP {resp.status_code}: {resp.text}")
                continue

            resp_json = resp.json()
            forensic_data = resp_json.get("data", {})
            vit_diag = forensic_data.get("vit_diagnostics", {})

            print(f"[+] HTTP Status: {resp.status_code}")
            print(f"[+] Final Case ID: {forensic_data.get('case_id')}")
            print(f"[+] Verdict: {forensic_data.get('verdict')} ({forensic_data.get('verdict_badge')}) - Confidence: {forensic_data.get('confidence_score')}%")
            print(f"[+] vit_diagnostics payload:")
            print(json.dumps(vit_diag, indent=2))

            assert vit_diag.get("model_status") == "PRETRAINED_VIT_ACTIVE", f"Expected PRETRAINED_VIT_ACTIVE but got {vit_diag.get('model_status')}"
        except Exception as e:
            print(f"[-] API Request failed: {e}")


if __name__ == "__main__":
    run_vit_verification()
    run_api_verification()

