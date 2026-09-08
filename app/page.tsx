'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { CyberNavbar } from '@/components/landing/CyberNavbar'
import { CyberHero } from '@/components/landing/CyberHero'
import { ProblemBento } from '@/components/landing/ProblemBento'
import { FivePillarsFramework } from '@/components/landing/FivePillarsFramework'
import { ArchitecturePipelineFlow } from '@/components/landing/ArchitecturePipelineFlow'
import { DifferentiatorsGrid } from '@/components/landing/DifferentiatorsGrid'
import { LiveThreatFeed } from '@/components/live-threat-feed'
import { ThreatBriefings } from '@/components/landing/ThreatBriefings'
import { UseCasesBento } from '@/components/landing/UseCasesBento'
import { InteractiveSpecimenModal } from '@/components/landing/InteractiveSpecimenModal'
import { CyberFooter } from '@/components/landing/CyberFooter'
import { AuthModal, OfficerCredentials } from '@/components/modals/AuthModal'
import { CyberCursor } from '@/components/ui/CyberCursor'
import { sfx } from '@/lib/soundEffects'

export default function Home() {
  const router = useRouter()
  const [session, setSession] = useState<string | null>(null)
  const [loginOpen, setLoginOpen] = useState(false)
  const [specimenOpen, setSpecimenOpen] = useState(false)

  // Initialize session
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved =
        window.sessionStorage.getItem('kavach_officer_badge') ||
        window.localStorage.getItem('kavach-session')
      if (saved) setSession(saved)
    }
  }, [])

  const handleSignIn = (credentials: OfficerCredentials) => {
    sfx.playSeal()
    setSession(credentials.badge)
    setLoginOpen(false)
    router.push('/console')
  }

  const handleSignOut = () => {
    sfx.playClick()
    if (typeof window !== 'undefined') {
      window.sessionStorage.removeItem('kavach_clearance_token')
      window.sessionStorage.removeItem('kavach_officer_badge')
      window.sessionStorage.removeItem('kavach_officer_jurisdiction')
      window.sessionStorage.removeItem('kavach_officer_hsm')
      window.sessionStorage.removeItem('kavach_authority_key')
      window.sessionStorage.removeItem('kavach_analyst_role')
      window.localStorage.removeItem('kavach-session')
    }
    setSession(null)
  }

  return (
    <>
      {/* Main Landing Page Enclave */}
      <motion.main
        initial={{ opacity: 0.95 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="min-h-screen bg-[#070A0E] text-slate-100 selection:bg-emerald-500 selection:text-black font-sans relative overflow-x-hidden"
      >
        {/* Cybernetic Precision Reticle Cursor */}
        <CyberCursor />

        {/* Sticky Glass Navbar */}
        <CyberNavbar
          onSignInClick={() => setLoginOpen(true)}
        />

        {/* Cyber Hero Section */}
        <CyberHero
          onOpenSpecimen={() => setSpecimenOpen(true)}
          onSignInClick={() => setLoginOpen(true)}
        />

        {/* Main Content Flow */}
        <div className="flex flex-col gap-8 md:gap-16">
          {/* Problem Bento Grid */}
          <ProblemBento />

          {/* Kavach 5-Pillar Operating Framework */}
          <FivePillarsFramework />

          {/* Working Pipeline Architecture Flow */}
          <ArchitecturePipelineFlow />

          {/* Competitive Differentiators */}
          <DifferentiatorsGrid />

          {/* Live Real-Time Global Threat Intelligence Wire */}
          <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <LiveThreatFeed />
          </div>

          {/* Real-World AI Fraud Briefings & Industry Applications */}
          <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col gap-16">
            <ThreatBriefings />
            <UseCasesBento />
          </div>
        </div>

        {/* Cyber Forensic Footer */}
        <CyberFooter />

        {/* Interactive Court-Admissible Specimen Report Modal */}
        <AnimatePresence>
          {specimenOpen && (
            <InteractiveSpecimenModal
              isOpen={specimenOpen}
              onClose={() => setSpecimenOpen(false)}
            />
          )}
        </AnimatePresence>

        {/* Cyber Crime Cell Clearance Auth Modal */}
        <AnimatePresence>
          {loginOpen && (
            <AuthModal
              isOpen={loginOpen}
              onClose={() => setLoginOpen(false)}
              onSignIn={handleSignIn}
            />
          )}
        </AnimatePresence>
      </motion.main>
    </>
  )
}
