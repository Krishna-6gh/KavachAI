"""
Kavach AI - Media Processing Service
Handles asynchronous file streaming, local disk persistence, and cryptographic digests.
"""

import os
from pathlib import Path
from typing import Tuple
import aiofiles
from fastapi import UploadFile, HTTPException
from app.core.config import settings
from app.core.security import compute_sha256, compute_sha512, compute_phash_hex
from app.schemas.forensic import MediaTypeEnum


class MediaProcessor:
    @staticmethod
    def detect_media_type(filename: str, content_type: str = "") -> MediaTypeEnum:
        """Determines if the media is image, video, or audio."""
        fn = filename.lower()
        if any(fn.endswith(ext) for ext in [".jpg", ".jpeg", ".png", ".webp", ".bmp", ".tiff"]) or content_type.startswith("image/"):
            return MediaTypeEnum.IMAGE
        elif any(fn.endswith(ext) for ext in [".mp4", ".mov", ".avi", ".mkv", ".webm"]) or content_type.startswith("video/"):
            return MediaTypeEnum.VIDEO
        elif any(fn.endswith(ext) for ext in [".wav", ".mp3", ".aac", ".flac", ".ogg", ".m4a"]) or content_type.startswith("audio/"):
            return MediaTypeEnum.AUDIO
        return MediaTypeEnum.UNKNOWN

    @classmethod
    async def process_upload(cls, file: UploadFile) -> Tuple[bytes, Path, str, str, str, MediaTypeEnum]:
        """
        Streams uploaded file into volatile buffer and saves a copy to disk.
        Returns (raw_bytes, saved_path, sha256, sha512, phash, media_type).
        """
        raw_bytes = await file.read()
        file_size = len(raw_bytes)

        if file_size > settings.MAX_FILE_SIZE_BYTES:
            raise HTTPException(
                status_code=413,
                detail=f"File exceeds maximum allowed size of {settings.MAX_FILE_SIZE_BYTES / (1024 * 1024):.1f} MB",
            )

        sha256 = compute_sha256(raw_bytes)
        sha512 = compute_sha512(raw_bytes)
        phash = compute_phash_hex(raw_bytes)
        media_type = cls.detect_media_type(file.filename or "unknown", file.content_type or "")

        # Save to uploads directory
        save_path = settings.UPLOAD_DIR / f"{sha256[:16]}_{file.filename or 'upload'}"
        async with aiofiles.open(save_path, "wb") as f:
            await f.write(raw_bytes)

        return raw_bytes, save_path, sha256, sha512, phash, media_type


media_processor = MediaProcessor()
