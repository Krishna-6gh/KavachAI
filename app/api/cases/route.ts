import { NextResponse } from 'next/server'
import { caseStore, CaseFile } from '@/lib/server/case-store'

const FASTAPI_URL = process.env.FASTAPI_BACKEND_URL || 'http://localhost:8000'

export async function GET() {
  try {
    const fastRes = await fetch(`${FASTAPI_URL}/api/cases`)
    if (fastRes.ok) {
      const data = await fastRes.json()
      return NextResponse.json({
        success: true,
        data: data.cases || caseStore.getAllCases(),
      })
    }
  } catch {
    // Fallback
  }

  const cases = caseStore.getAllCases()
  return NextResponse.json({
    success: true,
    data: cases,
  })
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const {
      id = `KV-${Math.floor(1000 + Math.random() * 9000)}-D`,
      title = 'New Digital Evidence Case',
      officer = 'CP-8821',
      jurisdiction = 'Cyber Crime Cell, Chandigarh Police',
      asset = 'evidence_file.mp4',
      verdict = 'PENDING',
      severity = 'EVAL',
    } = body

    const newCase: CaseFile = {
      id,
      title,
      officer,
      jurisdiction,
      date: new Date().toISOString(),
      severity,
      asset,
      verdict,
      signedByOfficer: false,
    }

    caseStore.addCase(newCase)

    return NextResponse.json({
      success: true,
      data: newCase,
      message: `Case ${id} successfully added to investigator queue.`,
    })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create case' },
      { status: 500 }
    )
  }
}
