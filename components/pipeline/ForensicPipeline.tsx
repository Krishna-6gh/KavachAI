'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useI18n } from '@/lib/i18n'

const steps = [
  {
    step: '01',
    title: 'Evidence Ingestion',
    desc: 'Container demuxing & keyframe lattice extraction',
  },
  {
    step: '02',
    title: 'Spectral Transform',
    desc: 'FFT audio decomposition & rPPG vascular flux analysis',
  },
  {
    step: '03',
    title: 'Cross-Attention Audit',
    desc: 'Multi-model neural checks & C2PA certificate verification',
  },
  {
    step: '04',
    title: 'Cryptographic Seal',
    desc: 'ISO/IEC 27037 tamper-evident court dossier generation',
  },
]

export function ForensicPipeline() {
  const { t } = useI18n()

  return (
    <section className="pipeline-viewport" id="docs" aria-label="Forensic Investigation Pipeline">
      <div className="section-intro">
        <span className="section-kicker">WORKFLOW SPECIFICATION</span>
        <h2>{t.pipeline.sectionTitle}</h2>
        <p>{t.pipeline.sectionDesc}</p>
      </div>

      <div className="pipeline-trace">
        <svg viewBox="0 0 900 130" preserveAspectRatio="none" aria-hidden="true">
          <path className="trace-back" d="M10 65 H890" />
          <motion.path
            className="trace-front"
            d="M10 65 H890"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: 'easeInOut' }}
          />
        </svg>

        {steps.map((item, index) => (
          <div key={item.step} className="pipeline-node">
            <span className="node-number">{item.step}</span>
            <div className="node-point" />
            <div className="node-content">
              <b>{item.title}</b>
              <small>{item.desc}</small>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
