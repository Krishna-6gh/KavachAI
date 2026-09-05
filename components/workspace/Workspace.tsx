'use client'

import React from 'react'
import { MediaIngestion, AuditState } from './MediaIngestion'
import { FeatureStrip } from './FeatureStrip'

interface WorkspaceProps {
  fileName: string
  auditState: AuditState
  onFileSelect: (file?: File | { name: string; isFake?: boolean }) => void
  onStartAudit: () => void
  onResetAudit?: () => void
  onExportClick?: () => void
}

export function Workspace({
  fileName,
  auditState,
  onFileSelect,
  onStartAudit,
  onResetAudit,
  onExportClick,
}: WorkspaceProps) {
  return (
    <section className="workspace-viewport" id="analysis" aria-label="Evidence Scanner & Features">
      <div className="workspace-stacked-container">
        {/* Step 1: Upload Suspect Media & Real/Fake Scanner */}
        <div className="workspace-full-row">
          <MediaIngestion
            fileName={fileName}
            auditState={auditState}
            onFileSelect={onFileSelect}
            onStartAudit={onStartAudit}
            onResetAudit={onResetAudit}
            onDownloadReport={onExportClick}
          />
        </div>

        {/* Simple 3-Box Feature Strip */}
        <div className="workspace-full-row mt-6">
          <FeatureStrip />
        </div>
      </div>
    </section>
  )
}
