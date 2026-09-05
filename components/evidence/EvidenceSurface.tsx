'use client'

import React from 'react'
import { TemporalEvidenceCard } from './TemporalEvidenceCard'
import { ShieldProtocolCard } from './ShieldProtocolCard'
import { ComparisonLens } from './ComparisonLens'
import { FacialMeshVisualizer } from './FacialMeshVisualizer'
import { OriginTraceDetector } from './OriginTraceDetector'
import { useI18n } from '@/lib/i18n'

export function EvidenceSurface() {
  const { t } = useI18n()

  return (
    <section className="my-6" id="evidence" aria-label="Digital Forensic Evidence Surface">
      <div className="section-intro text-center mb-8 max-w-3xl mx-auto">
        <span className="stamp-red mb-2.5">
          EVIDENTIARY SENSORS // OPTICAL &amp; PROPAGATION
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#1c1917] tracking-tight font-sans m-0 mt-2">
          {t.evidence.sectionTitle}
        </h2>
        <p className="text-[#57534e] text-sm md:text-base mt-2 leading-relaxed font-sans">
          {t.evidence.sectionDesc}
        </p>
      </div>

      {/* Interactive Evidence Lab (Split-Screen Lens + Biometric Landmark Mesh) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div>
          <ComparisonLens />
        </div>
        <div>
          <FacialMeshVisualizer />
        </div>
      </div>

      {/* Social Media Origin & Dissemination Trace */}
      <div className="mb-6">
        <OriginTraceDetector />
      </div>

      {/* Secondary Evidence Telemetry Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <TemporalEvidenceCard />
        </div>
        <div>
          <ShieldProtocolCard />
        </div>
      </div>
    </section>
  )
}
