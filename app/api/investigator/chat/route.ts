import { NextResponse } from 'next/server'
import { generateForensicInvestigationResponse } from '@/lib/server/llm-investigator'

const FASTAPI_URL = process.env.FASTAPI_BACKEND_URL || 'http://localhost:8000'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { question = '', caseId = 'KV-0928-A', exhibitName = 'media_asset_0928.mp4', verdict = 'TAMPERED' } = body

    if (!question.trim()) {
      return NextResponse.json(
        { success: false, error: 'Query question parameter is required' },
        { status: 400 }
      )
    }

    // Try FastAPI
    try {
      const fastRes = await fetch(`${FASTAPI_URL}/api/investigator/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, caseId, exhibitName, verdict }),
      })
      if (fastRes.ok) {
        const data = await fastRes.json()
        return NextResponse.json(data)
      }
    } catch {
      // Fallback
    }

    const response = generateForensicInvestigationResponse({
      question,
      caseId,
      exhibitName,
      verdict,
    })

    return NextResponse.json({
      success: true,
      data: response,
    })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'LLM investigation query failed' },
      { status: 500 }
    )
  }
}
