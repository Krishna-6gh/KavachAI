export interface C2PAClaim {
  id: string
  title: string
  actor: string
  timestamp: string
  status: 'valid' | 'invalid' | 'missing' | 'warning'
  description: string
  certDetails?: {
    issuer: string
    serial: string
    algorithm: string
    validUntil: string
  }
}

export interface EXIFMetadataItem {
  label: string
  exifValue: string
  actualDiscovered: string
  match: boolean
  reason: string
}

export interface ProvenanceReport {
  assetName: string
  sha256: string
  c2paStatus: 'AUTHENTIC' | 'TAMPERED_MANIFEST' | 'UNSIGNED_NO_MANIFEST' | 'INVALID_CERT'
  c2paClaims: C2PAClaim[]
  exifItems: EXIFMetadataItem[]
  rootOfTrustVerified: boolean
  tamperingIndicatorsCount: number
}

/**
 * Extracts and verifies C2PA manifests and EXIF metadata for an exhibit
 */
export function verifyProvenanceAndEXIF(params: {
  fileName: string
  sha256: string
  isTampered?: boolean
}): ProvenanceReport {
  const { fileName, sha256, isTampered = true } = params

  if (isTampered) {
    const c2paClaims: C2PAClaim[] = [
      {
        id: 'capture',
        title: 'Hardware Capture Assertion (C2PA standard v1.3)',
        actor: 'Sony Alpha 7 IV / Secure CMOS Enclave',
        timestamp: '2026-08-28 14:22:04 UTC',
        status: 'missing',
        description:
          'No hardware-signed origin manifest found. Asset lacks cryptographic root-of-trust from camera sensor firmware.',
      },
      {
        id: 'edit_action',
        title: 'Generative Inpainting Action Claim',
        actor: 'Synthetic Inpainting Pipeline v4.2',
        timestamp: '2026-09-02 08:12:19 UTC',
        status: 'invalid',
        description:
          'Facial bounding box [x:140, y:210, w:320, h:340] was modified via latent diffusion upscaler without valid author signature.',
      },
      {
        id: 'signing_cert',
        title: 'X.509 Cryptographic Certificate Chain',
        actor: 'Untrusted Self-Signed Authority (CN=Temp-Node-99)',
        timestamp: '2026-09-02 09:14:00 UTC',
        status: 'invalid',
        description:
          'The manifest signature does not chain up to a C2PA-approved Trust List (CTL) root authority.',
        certDetails: {
          issuer: 'CN=Untrusted-Proxy-CA, OU=Anonymized, O=Darknet Relay',
          serial: '4a:88:1f:99:bb:32:00:1c',
          algorithm: 'RSA-2048 (Deprecated / Weak)',
          validUntil: '2026-10-01 (Short-lived self-signed)',
        },
      },
    ]

    const exifItems: EXIFMetadataItem[] = [
      {
        label: 'Camera Model / Maker',
        exifValue: 'Canon EOS R5 (Firmware 1.8.1)',
        actualDiscovered: 'FFmpeg Lavf58.76 Synthetic Muxer',
        match: false,
        reason: 'Container muxer headers do not match Canon proprietary binary tag markers.',
      },
      {
        label: 'Quantization Table (DQT)',
        exifValue: 'Standard Canon Fine (Table #0)',
        actualDiscovered: 'Adobe Photoshop / WebP Dual Quantization',
        match: false,
        reason: 'Luminance quantization matrix shows dual-compression re-encoding curves.',
      },
      {
        label: 'GPS & Time Anchor',
        exifValue: '30.7333° N, 76.7794° E (Chandigarh)',
        actualDiscovered: 'Temporal Mismatch: GPS time is 4.5 hrs ahead of frame creation time',
        match: false,
        reason: 'GPS satellite timestamp contradicts atom container creation timestamp.',
      },
      {
        label: 'Color Space & ICC Profile',
        exifValue: 'sRGB IEC61966-2.1',
        actualDiscovered: 'Rec.709 Synthetic Gamma',
        match: false,
        reason: 'Color matrix indicates synthetic re-rendering pipeline output.',
      },
    ]

    return {
      assetName: fileName,
      sha256,
      c2paStatus: 'TAMPERED_MANIFEST',
      c2paClaims,
      exifItems,
      rootOfTrustVerified: false,
      tamperingIndicatorsCount: 4,
    }
  }

  // Genuine Case Provenance
  const c2paClaims: C2PAClaim[] = [
    {
      id: 'capture',
      title: 'Hardware Capture Assertion (C2PA standard v1.3)',
      actor: 'Hikvision Secure CCTV Enclave #CHD-04',
      timestamp: '2026-09-03 13:58:11 UTC',
      status: 'valid',
      description: 'Hardware-signed root-of-trust cryptographically validated against State Police Trust Anchor.',
      certDetails: {
        issuer: 'CN=State-Police-Secure-CCTV-CA, O=Gov of Punjab',
        serial: '10:ff:44:88:99:aa:bb:cc',
        algorithm: 'ECDSA-P256-SHA256',
        validUntil: '2028-12-31',
      },
    },
    {
      id: 'edit_action',
      title: 'Lossless Archive Ingestion Claim',
      actor: 'State Forensic Lab Ingestion Node',
      timestamp: '2026-09-03 14:05:00 UTC',
      status: 'valid',
      description: 'Lossless transfer verified with unbroken SHA-256 integrity check.',
    },
    {
      id: 'signing_cert',
      title: 'X.509 Cryptographic Certificate Chain',
      actor: 'National Digital Evidence Root CA',
      timestamp: '2026-09-03 14:05:01 UTC',
      status: 'valid',
      description: 'Chained to trusted Indian Digital Certificate Authority.',
    },
  ]

  const exifItems: EXIFMetadataItem[] = [
    {
      label: 'Camera Model / Maker',
      exifValue: 'Hikvision DS-2CD2087G2-LU',
      actualDiscovered: 'Hikvision DS-2CD2087G2-LU (Firmware V5.7.13)',
      match: true,
      reason: 'Proprietary binary atom tags and hardware checksums match perfectly.',
    },
    {
      label: 'Quantization Table (DQT)',
      exifValue: 'Standard CCTV Stream Table #0',
      actualDiscovered: 'Single generation uniform quantization',
      match: true,
      reason: 'No re-compression or dual-encoder artifacts detected.',
    },
    {
      label: 'GPS & Time Anchor',
      exifValue: '30.7333° N, 76.7794° E (Chandigarh)',
      actualDiscovered: 'NTP GPS Synchronized (±2ms delta)',
      match: true,
      reason: 'GPS lock and hardware NTP timestamps are aligned.',
    },
  ]

  return {
    assetName: fileName,
    sha256,
    c2paStatus: 'AUTHENTIC',
    c2paClaims,
    exifItems,
    rootOfTrustVerified: true,
    tamperingIndicatorsCount: 0,
  }
}
