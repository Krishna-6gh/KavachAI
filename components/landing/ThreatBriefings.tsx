'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Mic, Video, ShieldAlert, ChevronLeft, ChevronRight, Pause, Play, AlertCircle } from 'lucide-react'
import { sfx } from '@/lib/soundEffects'

interface ThreatSlide {
  id: string
  num: string
  tag: string
  tagColor: string
  tagBg: string
  title: string
  subtitle: string
  desc: string
  impact: string
  countermeasure: string
  icon: any
  image: string
  imageAlt: string
  rimColor: string
}

const THREAT_SLIDES: ThreatSlide[] = [
  {
    id: 'audio-clone',
    num: '01',
    tag: 'AUDIO ATTACK VECTOR // BEC FRAUD',
    tagColor: 'text-[#f59e0b]',
    tagBg: 'bg-[#f59e0b]/10 border-[#f59e0b]/30 shadow-[0_0_10px_rgba(245,158,11,0.2)]',
    title: 'Executive Audio Impersonation',
    subtitle: 'CEO Voice Cloning & Wire Fraud Transfer',
    desc: 'Attackers synthesize 3-second acoustic samples of C-suite executives to authorize urgent treasury wire transfers, defeating voice biometrics and dual-authorization phone calls.',
    impact: '₹280+ Cr stolen globally via neural voice clone BEC attacks.',
    countermeasure: 'Kavach Phase-Vocoder MFCC detects synthetic vocoder spectral artifacts & phase loss in < 400ms.',
    icon: Mic,
    image: '/threat-voice-clone.jpg',
    imageAlt: 'AI Voice Cloning Forensic Telemetry',
    rimColor: 'border-t-2 border-t-amber-500/80 shadow-[0_0_25px_rgba(245,158,11,0.15)]',
  },
  {
    id: 'legal-video',
    num: '02',
    tag: 'JUDICIARY RISK // TAINTED EVIDENCE',
    tagColor: 'text-[#ef4444]',
    tagBg: 'bg-[#ef4444]/10 border-[#ef4444]/30 shadow-[0_0_10px_rgba(239,68,68,0.2)]',
    title: 'Fabricated Video in Legal Discovery',
    subtitle: 'Tainted Digital Courtroom Depositions',
    desc: 'Manipulated surveillance footage and lip-synced witness depositions introduced into criminal litigation, threatening evidentiary integrity and misleading judiciary trials.',
    impact: 'Contaminates judicial discovery and delays Section 65B certifications.',
    countermeasure: 'Generates ISO/IEC 27037 tamper-proof Merkle certificates signed with hardware HSM timestamps.',
    icon: Video,
    image: '/threat-courtroom-video.jpg',
    imageAlt: 'Courtroom Video Evidence Tampering Discovery',
    rimColor: 'border-t-2 border-t-red-500/80 shadow-[0_0_25px_rgba(239,68,68,0.15)]',
  },
  {
    id: 'kyc-spoof',
    num: '03',
    tag: 'FINANCIAL RISK // VIDEO KYC',
    tagColor: 'text-[#00f2fe]',
    tagBg: 'bg-[#00f2fe]/10 border-[#00f2fe]/30 shadow-[0_0_10px_rgba(0,242,254,0.2)]',
    title: 'Synthetic Identity Bypasses in Video KYC',
    subtitle: 'Real-Time Facial Reenactment Injection',
    desc: 'Generative diffusion overlays injected directly into live banking onboarding cameras to defeat standard 2D liveness tests and establish fraudulent mule bank accounts.',
    impact: 'Enables ghost-mule account creation and automated identity laundering across retail fintech.',
    countermeasure: '18-Frame optical flow lattice validates sub-surface skin reflectance & natural micro-tremors.',
    icon: ShieldAlert,
    image: '/threat-kyc-deepfake.jpg',
    imageAlt: 'Video KYC Biometric Deepfake Spoofing',
    rimColor: 'border-t-2 border-t-cyan-500/80 shadow-[0_0_25px_rgba(0,242,254,0.15)]',
  },
]

export function ThreatBriefings() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState<1 | -1>(1)
  const [isPaused, setIsPaused] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isPaused) return

    timerRef.current = setInterval(() => {
      setDirection(1)
      setCurrentIndex((prev) => (prev + 1) % THREAT_SLIDES.length)
    }, 4500)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [currentIndex, isPaused])

  const handleNext = () => {
    sfx.playClick()
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % THREAT_SLIDES.length)
  }

  const handlePrev = () => {
    sfx.playClick()
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + THREAT_SLIDES.length) % THREAT_SLIDES.length)
  }

  const handleSelectTab = (idx: number) => {
    sfx.playClick()
    setDirection(idx > currentIndex ? 1 : -1)
    setCurrentIndex(idx)
  }

  const currentSlide = THREAT_SLIDES[currentIndex]

  return (
    <section className="threat-briefings-section my-12 px-4 max-w-[1300px] mx-auto" id="briefings" aria-label="Real-World AI Fraud Briefings">
      {/* Section Header */}
      <div className="section-intro text-center mb-8 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-[#ef4444] text-xs font-mono font-bold mb-3 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
          <AlertCircle size={14} />
          <span>POLICE BRIEFINGS - ACTIVE THREAT VECTORS</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight font-sans m-0">
          Real-World AI Fraud Briefings
        </h2>
        <p className="text-[#94a3b8] text-base mt-2 leading-relaxed font-sans">
          How modern criminal syndicates weaponize generative models and how Kavach AI neutralizes each vector.
        </p>
      </div>

      {/* Case Tabs & Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2 flex-wrap">
          {THREAT_SLIDES.map((slide, idx) => {
            const isActive = currentIndex === idx
            return (
              <button
                key={slide.id}
                type="button"
                className={`px-4 py-2 text-xs font-mono font-bold transition-all cursor-pointer rounded-md border ${
                  isActive
                    ? 'bg-slate-900 text-[#00f2fe] border-cyan-500 shadow-[0_0_15px_rgba(0,242,254,0.2)]'
                    : 'bg-slate-900/50 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-white'
                }`}
                onClick={() => handleSelectTab(idx)}
              >
                <span>CASE #{slide.num} // {slide.title.split(' ')[0]} {slide.title.split(' ')[1]}</span>
              </button>
            )
          })}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="p-2 bg-slate-900/60 border border-slate-800 text-slate-300 hover:text-white rounded-md cursor-pointer"
            onClick={() => setIsPaused((prev) => !prev)}
            title={isPaused ? 'Resume Autoplay' : 'Pause'}
          >
            {isPaused ? <Play size={14} /> : <Pause size={14} className="text-cyan-400" />}
          </button>
          <button
            type="button"
            className="p-2 bg-slate-900/60 border border-slate-800 text-slate-300 hover:text-white rounded-md cursor-pointer"
            onClick={handlePrev}
            aria-label="Previous"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            className="p-2 bg-slate-900/60 border border-slate-800 text-slate-300 hover:text-white rounded-md cursor-pointer"
            onClick={handleNext}
            aria-label="Next"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Main Showcase Card with Signature Rim Lighting */}
      <div
        className={`p-6 md:p-8 bg-slate-900/70 border border-slate-800 rounded-xl relative backdrop-blur-md transition-all ${currentSlide.rimColor}`}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentSlide.id}
            custom={direction}
            initial={{ opacity: 0, x: direction * 25 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -direction * 25 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            {/* Left Col: Case Intelligence */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <span className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded border ${currentSlide.tagBg} ${currentSlide.tagColor}`}>
                  {currentSlide.tag}
                </span>
                <span className="font-mono text-xs text-slate-400">
                  CASE FILE #{currentSlide.num}
                </span>
              </div>

              <h3 className="text-2xl md:text-3xl font-bold text-white font-sans m-0">
                {currentSlide.title}
              </h3>
              <div className={`text-xs font-mono font-bold ${currentSlide.tagColor}`}>
                {currentSlide.subtitle}
              </div>

              <p className="text-sm md:text-base text-[#94a3b8] leading-relaxed font-sans m-0">
                {currentSlide.desc}
              </p>

              {/* Impact & Defense Boxes */}
              <div className="space-y-2.5 mt-2 pt-3 border-t border-slate-800">
                <div className="p-3.5 bg-red-500/10 border border-red-500/30 rounded-md font-sans text-xs shadow-[0_0_10px_rgba(239,68,68,0.1)]">
                  <span className="font-mono text-[10px] font-bold text-[#ef4444] block mb-1 uppercase tracking-wider">
                    CRITICAL DAMAGE ESTIMATE:
                  </span>
                  <span className="text-slate-200">{currentSlide.impact}</span>
                </div>

                <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/30 rounded-md font-sans text-xs shadow-[0_0_10px_rgba(16,185,129,0.1)]">
                  <span className="font-mono text-[10px] font-bold text-[#34d399] block mb-1 uppercase tracking-wider">
                    KAVACH AI FORENSIC COUNTERMEASURE:
                  </span>
                  <span className="text-slate-200">{currentSlide.countermeasure}</span>
                </div>
              </div>
            </div>

            {/* Right Col: Evidence Photograph */}
            <div className="lg:col-span-5 relative h-64 md:h-80 rounded-lg overflow-hidden border border-slate-700/80 bg-slate-950 shadow-2xl">
              <Image
                src={currentSlide.image}
                alt={currentSlide.imageAlt}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-slate-950/80 border border-cyan-500/40 text-[10px] font-mono text-cyan-300 font-bold shadow-[0_0_8px_rgba(0,242,254,0.3)]">
                EVIDENTIARY EXHIBIT
              </div>
              <div className="absolute bottom-3 right-3 bg-slate-950/80 border border-slate-700 px-2.5 py-1 rounded font-mono text-[10px] text-white font-bold">
                CONFIDENCE: 99.4%
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
