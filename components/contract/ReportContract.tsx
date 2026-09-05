'use client'

import React from 'react'
import Image from 'next/image'
import { useI18n } from '@/lib/i18n'

const standardsItems = [
  'CLASSIFICATION VERDICT & CONFIDENCE RATIO',
  'STATISTICAL CONFIDENCE INTERVALS (α=0.01)',
  'SPATIAL-TEMPORAL RESIDUAL MATRICES',
  'SPECTRAL VOCODER ANOMALY LOGS',
  'C2PA MANIFEST ATTESTATION CHAIN',
  'SHA-256 MERKLE CUSTODY REFERENCE',
  'EMPIRICAL METHODOLOGY LIMITATIONS',
]

export function ReportContract() {
  const { t } = useI18n()

  return (
    <section className="contract-viewport" aria-label="Digital Evidence Admissibility Standards">
      <div className="contract-inner">
        <div className="contract-content-side">
          <div className="contract-heading">
            <span className="section-kicker">ADMISSIBILITY STANDARDS</span>
            <span>{t.contract.sectionTitle}</span>
          </div>
          <div className="contract-items">
            {standardsItems.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>

        {/* Holographic Court Admissibility Seal Sticker */}
        <div className="court-seal-wrap">
          <Image
            src="/court-seal.jpg"
            alt="ISO/IEC 27037 Certified Digital Evidence Admissibility Holographic Seal"
            width={130}
            height={130}
            className="court-seal-img"
          />
          <div className="seal-caption">{t.contract.sealText}</div>
        </div>
      </div>
    </section>
  )
}
