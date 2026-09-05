import { NextResponse } from 'next/server'
import { interceptShieldMedia } from '@/lib/server/shield-sentinel'

const FASTAPI_URL = process.env.FASTAPI_BACKEND_URL || 'http://localhost:8000'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { platform = 'whatsapp', url = '', mediaHash = '0x8f14b29c0a1e4d77' } = body

    // 1. Try FastAPI
    try {
      const fastRes = await fetch(`${FASTAPI_URL}/api/shield/intercept`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mediaUrl: url, mediaHash, action: 'INTERCEPT' }),
      })
      if (fastRes.ok) {
        const data = await fastRes.json()
        return NextResponse.json(data)
      }
    } catch {
      // Fallback
    }

    const result = interceptShieldMedia({
      platform,
      url,
      mediaHash,
    })

    return NextResponse.json({
      success: true,
      data: result,
    })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Shield interception failed' },
      { status: 500 }
    )
  }
}
