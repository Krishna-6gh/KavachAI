import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const authHeader = req.headers.get('authorization')
  
  if (!authHeader || !authHeader.startsWith('Bearer JWT-KAVACH-')) {
    return NextResponse.json(
      {
        authenticated: false,
        message: 'No active session found or invalid bearer token.',
      },
      { status: 401 }
    )
  }

  const token = authHeader.replace('Bearer ', '')

  return NextResponse.json({
    authenticated: true,
    token,
    officer: {
      badge: '#IN-PB-8821',
      jurisdiction: 'STATE FORENSIC SCIENCE LAB',
      role: 'CHIEF EVALUATION OFFICER',
      hsmNode: 'HSM-PRIMARY-01',
    },
  })
}
