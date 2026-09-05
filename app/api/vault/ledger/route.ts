import { NextResponse } from 'next/server'
import { caseStore } from '@/lib/server/case-store'
import { generateMerkleInclusionProof } from '@/lib/server/crypto-vault'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const caseId = url.searchParams.get('caseId') || 'KV-0928-A'
  const leafId = url.searchParams.get('leafId') || 'spatial'

  const blocks = caseStore.getLedgerBlocks()
  const latestBlock = caseStore.getLatestLedgerBlock() || blocks[0]

  const proof = generateMerkleInclusionProof(
    leafId,
    latestBlock.leafNodes,
    latestBlock.merkleRootHash
  )

  return NextResponse.json({
    success: true,
    data: {
      activeCaseId: caseId,
      latestBlock,
      allBlocks: blocks,
      merkleTreeNodes: latestBlock.leafNodes,
      inclusionProof: proof,
    },
  })
}
