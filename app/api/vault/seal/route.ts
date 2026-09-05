import { NextResponse } from 'next/server'
import { buildMerkleTree, generateHSMSignature } from '@/lib/server/crypto-vault'

const FASTAPI_URL = process.env.FASTAPI_BACKEND_URL || 'http://localhost:8000'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const {
      caseId = 'KV-CUSTOM',
      exhibitName = 'evidence_file.mp4',
      officerBadge = 'CP-8821',
      jurisdiction = 'Cyber Crime Cell, Chandigarh Police',
      spatialStatus = 'ANOMALY',
      spectralStatus = 'ANOMALY',
      exifStatus = 'ATTESTED',
    } = body

    // 1. Try FastAPI
    try {
      const fastRes = await fetch(`${FASTAPI_URL}/api/vault/seal`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          caseId,
          exhibitName,
          fileSha256: body.fileSha256 || 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
          verdict: body.verdict || 'FAIL (94.2%)',
          confidenceScore: body.confidenceScore || 94.2,
          officerBadge,
          officerName: body.officerName || 'Inspector Gurpreet Singh',
        }),
      })
      if (fastRes.ok) {
        const data = await fastRes.json()
        return NextResponse.json(data)
      }
    } catch {
      // Fallback
    }

    const tree = buildMerkleTree({
      caseId,
      exhibitName,
      spatialStatus,
      spectralStatus,
      exifStatus,
    })

    const hsm = generateHSMSignature(tree.rootHash, officerBadge)

    return NextResponse.json({
      success: true,
      data: {
        rootHash: tree.rootHash,
        rawHex: tree.rawHex,
        nodes: tree.nodes,
        hsmSignature: hsm.signature,
        hsmNode: hsm.hsmNode,
        timestamp: hsm.timestamp,
      },
      message: 'Exhibit cryptographically sealed into FIPS 140-3 Hardware Security Module.',
    })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Sealing failed' },
      { status: 500 }
    )
  }
}
