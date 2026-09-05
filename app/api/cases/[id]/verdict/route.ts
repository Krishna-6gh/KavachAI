import { NextResponse } from 'next/server'
import { caseStore } from '@/lib/server/case-store'

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await req.json()
    const {
      verdict = 'TAMPERED',
      officerBadge = '#IN-PB-8821',
      jurisdiction = 'STATE FORENSIC SCIENCE LAB',
    } = body

    const result = caseStore.signVerdict({
      caseId: id,
      verdict,
      officerBadge,
      jurisdiction,
    })

    return NextResponse.json({
      success: true,
      data: result,
      message: `Verdict '${verdict}' cryptographically signed and sealed in Merkle Block ${result.block.blockNumber}.`,
    })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Verdict signing failed' },
      { status: 500 }
    )
  }
}
