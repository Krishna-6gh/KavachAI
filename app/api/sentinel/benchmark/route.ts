import { NextResponse } from 'next/server'
import { runSentinelBenchmark } from '@/lib/server/shield-sentinel'

const FASTAPI_URL = process.env.FASTAPI_BACKEND_URL || 'http://localhost:8000'

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}))
    const { vectorId = 'fgsm' } = body

    // 1. Try FastAPI
    try {
      const fastRes = await fetch(`${FASTAPI_URL}/api/sentinel/benchmark`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mediaHash: body.mediaHash || 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
          adversarialAttacks: ['GAUSSIAN_BLUR', 'JPEG_COMPRESSION', 'COLOR_JITTER', 'NOISE_INJECTION'],
        }),
      })
      if (fastRes.ok) {
        const data = await fastRes.json()
        return NextResponse.json(data)
      }
    } catch {
      // Fallback
    }

    const result = runSentinelBenchmark(vectorId)

    return NextResponse.json({
      success: true,
      data: result,
    })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Sentinel benchmark failed' },
      { status: 500 }
    )
  }
}
