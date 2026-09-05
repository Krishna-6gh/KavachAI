import { NextResponse } from 'next/server'
import { queryFederatedHashExchange, FEDERATED_NODES } from '@/lib/server/federated-zkp'

const FASTAPI_URL = process.env.FASTAPI_BACKEND_URL || 'http://localhost:8000'

export async function GET() {
  try {
    const fastRes = await fetch(`${FASTAPI_URL}/api/federated/lookup`)
    if (fastRes.ok) {
      const data = await fastRes.json()
      return NextResponse.json({
        success: true,
        data: {
          nodes: data.nodes || FEDERATED_NODES,
        },
      })
    }
  } catch {
    // Fallback
  }

  return NextResponse.json({
    success: true,
    data: {
      nodes: FEDERATED_NODES,
    },
  })
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { nodeId = 'police', targetHash = '0x8f14b29c0a1e4d77' } = body

    const result = queryFederatedHashExchange({
      nodeId,
      targetHash,
    })

    return NextResponse.json({
      success: true,
      data: result,
    })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Federated query failed' },
      { status: 500 }
    )
  }
}
