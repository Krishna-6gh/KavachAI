import type { Metadata } from 'next'
import { InvestigatorConsole } from '@/components/console/InvestigatorConsole'

export const metadata: Metadata = {
  title: 'Investigator Console — Kavach AI',
  description:
    'Digital forensics & origin tracing console for Chandigarh Police Hackathon 2026. Interactive ViT, ELA, and Social Propagation inspection.',
}

export default function ConsolePage() {
  return <InvestigatorConsole />
}
