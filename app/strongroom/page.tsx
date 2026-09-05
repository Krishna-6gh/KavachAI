import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Strong Room & Forensic Enclave — Kavach AI',
  description:
    'FIPS 140-3 HSM Cleared Cyber Forensic Investigator Console and Strong Room Enclave for Section 65B IEA / Section 63 BSA compliance.',
}

export default function StrongRoomPage() {
  return (
    <div className="w-full h-screen bg-[#06080D] overflow-hidden">
      <iframe
        src="/strongroom.html"
        title="Kavach AI Strong Room Enclave"
        className="w-full h-full border-0"
        allow="camera; microphone; clipboard-write"
      />
    </div>
  )
}
