import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const FASTAPI_URL = process.env.FASTAPI_BACKEND_URL || 'http://localhost:8000'

    const fastRes = await fetch(`${FASTAPI_URL}/api/forensics/generate-court-pdf`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    if (fastRes.ok) {
      const pdfBytes = await fastRes.arrayBuffer()
      const caseId = body.case_id || 'KV-CASE'
      return new NextResponse(pdfBytes, {
        status: 200,
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `attachment; filename="SECTION_63_BSA_CERTIFICATE_${caseId}.pdf"`,
          'Content-Length': pdfBytes.byteLength.toString(),
        },
      })
    } else {
      const errorText = await fastRes.text()
      return NextResponse.json(
        { success: false, detail: `FastAPI PDF generator error: ${errorText}` },
        { status: fastRes.status }
      )
    }
  } catch (error: any) {
    return NextResponse.json(
      { success: false, detail: error?.message || 'Failed to generate court PDF' },
      { status: 500 }
    )
  }
}
