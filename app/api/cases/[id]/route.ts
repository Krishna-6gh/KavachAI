import { NextResponse } from 'next/server'
import { caseStore } from '@/lib/server/case-store'

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const caseItem = caseStore.getCase(id)

  if (!caseItem) {
    return NextResponse.json(
      { success: false, error: `Case ${id} not found` },
      { status: 404 }
    )
  }

  return NextResponse.json({
    success: true,
    data: caseItem,
  })
}
