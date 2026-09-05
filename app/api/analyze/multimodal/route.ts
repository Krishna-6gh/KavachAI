import { NextResponse } from 'next/server'
import { analyzeMediaExhibit } from '@/lib/server/forensic-analyzer'
import { caseStore } from '@/lib/server/case-store'

const FASTAPI_URL = process.env.FASTAPI_BACKEND_URL || 'http://localhost:8000'

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get('content-type') || ''
    let fileName = 'media_asset_0928.mp4'
    let buffer: Buffer | undefined = undefined
    let fileType = ''
    let caseId = 'KV-0928-A'

    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData()
      const file = formData.get('file') as File | null
      const requestedCaseId = (formData.get('caseId') || formData.get('case_id')) as string | null

      if (file) {
        fileName = file.name
        fileType = file.type
        const arrayBuffer = await file.arrayBuffer()
        buffer = Buffer.from(arrayBuffer)
      }

      if (requestedCaseId) {
        caseId = requestedCaseId
      }

      // Try FastAPI
      try {
        if (file && buffer) {
          const fastForm = new FormData()
          fastForm.append('file', new Blob([buffer]), fileName)
          fastForm.append('case_id', caseId)
          fastForm.append('officer_name', 'Inspector Gurpreet Singh')
          fastForm.append('officer_badge', 'CP-8821')

          const fastRes = await fetch(`${FASTAPI_URL}/api/forensics/analyze`, {
            method: 'POST',
            body: fastForm,
          })
          if (fastRes.ok) {
            const data = await fastRes.json()
            return NextResponse.json(data)
          }
        }
      } catch {
        // Fallback to internal analyzer
      }
    } else {
      const json = await req.json().catch(() => ({}))
      if (json.fileName) fileName = json.fileName
      if (json.caseId) caseId = json.caseId
      if (json.fileType) fileType = json.fileType

      // Try FastAPI JSON
      try {
        const fastRes = await fetch(`${FASTAPI_URL}/api/analyze/multimodal`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ fileName, caseId, fileType }),
        })
        if (fastRes.ok) {
          const data = await fastRes.json()
          return NextResponse.json(data)
        }
      } catch {
        // Fallback
      }
    }

    const auditResult = analyzeMediaExhibit({
      fileName,
      buffer,
      fileType,
      caseId,
    })

    // Update or create case in case store
    const existingCase = caseStore.getCase(caseId)
    if (existingCase) {
      existingCase.asset = fileName
      existingCase.verdict = auditResult.verdict
      existingCase.auditResult = auditResult
      existingCase.severity = auditResult.threatScore > 50 ? 'CRITICAL' : 'EVAL'
      caseStore.addCase(existingCase)
    }

    return NextResponse.json({
      success: true,
      data: auditResult,
      message: 'Forensic multi-modal spatial-spectral audit completed successfully.',
    })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Forensic analysis failed' },
      { status: 500 }
    )
  }
}
