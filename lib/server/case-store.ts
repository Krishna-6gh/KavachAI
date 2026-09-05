import { MerkleNode, buildMerkleTree, generateHSMSignature, LedgerBlock } from './crypto-vault'
import { analyzeMediaExhibit, ForensicAuditResult } from './forensic-analyzer'

export interface CaseFile {
  id: string
  title: string
  officer: string
  jurisdiction: string
  date: string
  severity: 'CRITICAL' | 'HIGH' | 'EVAL'
  asset: string
  verdict: 'TAMPERED' | 'GENUINE' | 'CLONED VOICE' | 'INCONCLUSIVE'
  signedByOfficer: boolean
  signedTimestamp?: string
  hsmAttestation?: string
  auditResult?: ForensicAuditResult
  merkleRootHash?: string
}

// Global In-Memory Persistent Store
class CaseStore {
  private cases: Map<string, CaseFile> = new Map()
  private blocks: LedgerBlock[] = []
  private activeBlockNumber = 4291

  constructor() {
    this.seedDefaultCases()
  }

  private seedDefaultCases() {
    const case1Audit = analyzeMediaExhibit({ fileName: 'media_asset_0928.mp4', caseId: 'KV-0928-A' })
    const case2Audit = analyzeMediaExhibit({ fileName: 'ceo_audio_intercept.wav', caseId: 'KV-1044-B' })
    const case3Audit = analyzeMediaExhibit({ fileName: 'traffic_cctv_chd_real.mp4', caseId: 'KV-2033-C' })

    const tree1 = buildMerkleTree({
      caseId: 'KV-0928-A',
      exhibitName: 'media_asset_0928.mp4',
      spatialStatus: 'ANOMALY',
      spectralStatus: 'ANOMALY',
      exifStatus: 'ATTESTED',
    })

    const tree2 = buildMerkleTree({
      caseId: 'KV-1044-B',
      exhibitName: 'ceo_audio_intercept.wav',
      spatialStatus: 'VALID',
      spectralStatus: 'ANOMALY',
      exifStatus: 'ATTESTED',
    })

    const tree3 = buildMerkleTree({
      caseId: 'KV-2033-C',
      exhibitName: 'traffic_cctv_chd_real.mp4',
      spatialStatus: 'VALID',
      spectralStatus: 'VALID',
      exifStatus: 'VALID',
    })

    this.cases.set('KV-0928-A', {
      id: 'KV-0928-A',
      title: 'Minister Video Impersonation & Splicing',
      officer: '#IN-PB-8821',
      jurisdiction: 'STATE FORENSIC SCIENCE LAB',
      date: '2026-09-02 09:41 UTC',
      severity: 'CRITICAL',
      asset: 'media_asset_0928.mp4',
      verdict: 'TAMPERED',
      signedByOfficer: true,
      signedTimestamp: '2026-09-02 09:44:12 UTC',
      hsmAttestation: '0x6533623063343432393866633163313439616662',
      auditResult: case1Audit,
      merkleRootHash: tree1.rootHash,
    })

    this.cases.set('KV-1044-B', {
      id: 'KV-1044-B',
      title: 'Bank CEO Wire Authorization Voice Clone',
      officer: '#IN-CH-4412',
      jurisdiction: 'CENTRAL BUREAU OF INVESTIGATION',
      date: '2026-09-03 11:20 UTC',
      severity: 'CRITICAL',
      asset: 'ceo_audio_intercept.wav',
      verdict: 'CLONED VOICE',
      signedByOfficer: true,
      signedTimestamp: '2026-09-03 11:25:00 UTC',
      hsmAttestation: '0x94a201c009824719284710293847102938471029',
      auditResult: case2Audit,
      merkleRootHash: tree2.rootHash,
    })

    this.cases.set('KV-2033-C', {
      id: 'KV-2033-C',
      title: 'CCTV Surveillance Authentic Verification',
      officer: '#IN-PB-8821',
      jurisdiction: 'STATE CYBER CRIME CELL',
      date: '2026-09-03 14:05 UTC',
      severity: 'EVAL',
      asset: 'traffic_cctv_chd_real.mp4',
      verdict: 'GENUINE',
      signedByOfficer: true,
      signedTimestamp: '2026-09-03 14:06:19 UTC',
      hsmAttestation: '0x4a8b192c81726354819203847162534819203847',
      auditResult: case3Audit,
      merkleRootHash: tree3.rootHash,
    })

    // Seed Ledger Block
    const hsm = generateHSMSignature(tree1.rootHash, '#IN-PB-8821')
    this.blocks.push({
      blockNumber: '#004291',
      blockIndex: 4291,
      previousBlockHash: '0x38f1082c94a81b29c018247b9182374819203847162534819203847162534819',
      merkleRootHash: tree1.rootHash,
      hsmSignature: hsm.signature,
      timestamp: '2026-09-02 09:44:12 UTC',
      officerBadge: '#IN-PB-8821',
      jurisdiction: 'STATE FORENSIC SCIENCE LAB',
      caseId: 'KV-0928-A',
      exhibitName: 'media_asset_0928.mp4',
      verdict: 'TAMPERED',
      confidence: 99.4,
      leafNodes: tree1.nodes,
    })
  }

  public getAllCases(): CaseFile[] {
    return Array.from(this.cases.values())
  }

  public getCase(id: string): CaseFile | undefined {
    return this.cases.get(id)
  }

  public addCase(caseFile: CaseFile): CaseFile {
    this.cases.set(caseFile.id, caseFile)
    return caseFile
  }

  public signVerdict(params: {
    caseId: string
    verdict: 'TAMPERED' | 'GENUINE' | 'CLONED VOICE' | 'INCONCLUSIVE'
    officerBadge: string
    jurisdiction?: string
  }): { caseFile: CaseFile; block: LedgerBlock } {
    const existing = this.cases.get(params.caseId)
    const officerBadge = params.officerBadge || '#IN-PB-8821'
    const jurisdiction = params.jurisdiction || 'STATE FORENSIC SCIENCE LAB'
    const timestamp = new Date().toISOString()

    const caseItem: CaseFile = existing || {
      id: params.caseId,
      title: `Forensic Ingestion Case ${params.caseId}`,
      officer: officerBadge,
      jurisdiction,
      date: timestamp,
      severity: params.verdict === 'GENUINE' ? 'EVAL' : 'CRITICAL',
      asset: 'exhibit_analyzed.mp4',
      verdict: params.verdict,
      signedByOfficer: true,
    }

    const tree = buildMerkleTree({
      caseId: params.caseId,
      exhibitName: caseItem.asset,
      spatialStatus: params.verdict === 'GENUINE' ? 'VALID' : 'ANOMALY',
      spectralStatus: params.verdict === 'GENUINE' ? 'VALID' : 'ANOMALY',
      exifStatus: params.verdict === 'GENUINE' ? 'VALID' : 'ATTESTED',
    })

    const hsm = generateHSMSignature(tree.rootHash, officerBadge)

    caseItem.verdict = params.verdict
    caseItem.signedByOfficer = true
    caseItem.signedTimestamp = timestamp
    caseItem.hsmAttestation = hsm.signature
    caseItem.merkleRootHash = tree.rootHash
    this.cases.set(params.caseId, caseItem)

    this.activeBlockNumber += 1
    const newBlock: LedgerBlock = {
      blockNumber: `#00${this.activeBlockNumber}`,
      blockIndex: this.activeBlockNumber,
      previousBlockHash: this.blocks.length > 0 ? this.blocks[this.blocks.length - 1].merkleRootHash : '0x000000000000',
      merkleRootHash: tree.rootHash,
      hsmSignature: hsm.signature,
      timestamp,
      officerBadge,
      jurisdiction,
      caseId: params.caseId,
      exhibitName: caseItem.asset,
      verdict: params.verdict,
      confidence: 99.4,
      leafNodes: tree.nodes,
    }

    this.blocks.push(newBlock)
    return { caseFile: caseItem, block: newBlock }
  }

  public getLedgerBlocks(): LedgerBlock[] {
    return this.blocks
  }

  public getLatestLedgerBlock(): LedgerBlock {
    return this.blocks[this.blocks.length - 1]
  }
}

// Singleton instance
export const caseStore = new CaseStore()
