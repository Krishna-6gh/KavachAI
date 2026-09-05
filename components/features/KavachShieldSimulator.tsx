'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  AlertOctagon,
  ArrowRight,
  Bell,
  CheckCircle2,
  ExternalLink,
  Eye,
  FileWarning,
  Globe,
  Lock,
  Pause,
  Play,
  Send,
  Share2,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Smartphone,
  Sparkles,
  UploadCloud,
  Zap,
} from 'lucide-react'
import { sfx } from '@/lib/soundEffects'

type PlatformType = 'whatsapp' | 'twitter' | 'telegram' | 'instagram'

export function KavachShieldSimulator() {
  const [platform, setPlatform] = useState<PlatformType>('whatsapp')
  const [isShieldActive, setIsShieldActive] = useState<boolean>(true)
  const [isIntercepted, setIsIntercepted] = useState<boolean>(true)
  const [interceptAction, setInterceptAction] = useState<'blocked' | 'warned' | 'analyzed' | null>(null)
  const [interceptDetails, setInterceptDetails] = useState<any>(null)

  const handleSimulateUpload = async () => {
    sfx.playScan()
    setIsIntercepted(false)
    setInterceptAction(null)

    try {
      const res = await fetch('/api/shield/intercept', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ platform }),
      })
      const json = await res.json()
      if (json.success && json.data) {
        setInterceptDetails(json.data)
      }
    } catch {
      // fallback
    } finally {
      setTimeout(() => {
        sfx.playSeal()
        setIsIntercepted(true)
      }, 300)
    }
  }

  const handleAction = (action: 'blocked' | 'warned' | 'analyzed') => {
    sfx.playClick()
    setInterceptAction(action)
  }

  return (
    <section
      className="kavach-shield-card p-6 md:p-8 rounded-3xl bg-[#080d1a] border border-[#00f2fe]/25 shadow-2xl relative overflow-hidden"
      id="kavach-shield"
      aria-label="Kavach Shield Browser Protection"
    >
      {/* Glow Effect */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#38bdf8]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#00f2fe]/15 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#38bdf8] animate-ping" />
            <span className="font-mono text-xs font-bold text-[#38bdf8] tracking-wider uppercase">
              WHAT MAKES US DIFFERENT • FEATURE #01
            </span>
          </div>
          <h3 className="text-2xl md:text-3xl font-extrabold text-[#f8fafc]">
            Kavach Shield: Real-Time Browser Protection
          </h3>
          <p className="text-slate-300 text-sm mt-1">
            Real-time browser extension that intercepts and flags AI-synthesized media <i>before</i> it gets forwarded or posted.
          </p>
        </div>

        {/* Shield Active Toggle */}
        <div className="flex items-center gap-3 self-start md:self-auto">
          <button
            type="button"
            onClick={() => {
              sfx.playClick()
              setIsShieldActive((prev) => !prev)
            }}
            className={`px-4 py-2 rounded-xl text-xs md:text-sm font-mono font-bold transition-all cursor-pointer flex items-center gap-2 border ${
              isShieldActive
                ? 'bg-[#10b981]/20 border-[#10b981] text-[#34d399] shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                : 'bg-[#ef4444]/20 border-[#ef4444] text-[#ef4444]'
            }`}
          >
            <ShieldCheck size={16} />
            <span>{isShieldActive ? 'SHIELD EXTENSION ACTIVE' : 'SHIELD DISABLED (UNPROTECTED)'}</span>
          </button>
        </div>
      </div>

      {/* Interactive Browser Simulation Viewport */}
      <div className="mt-6 relative z-10">
        {/* Simulated Browser Bar */}
        <div className="rounded-2xl bg-[#030712] border border-white/15 overflow-hidden shadow-2xl">
          {/* Top Browser Tab / URL Bar */}
          <div className="px-4 py-3 bg-[#080d1a] border-b border-white/10 flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#ef4444]/80" />
              <span className="w-3 h-3 rounded-full bg-[#f59e0b]/80" />
              <span className="w-3 h-3 rounded-full bg-[#10b981]/80" />
            </div>

            {/* URL Input */}
            <div className="flex-1 max-w-[540px] px-3 py-1.5 rounded-lg bg-[#030712] border border-white/10 flex items-center gap-2 font-mono text-xs text-slate-300">
              <Lock size={12} className="text-[#34d399]" />
              <span>https://web.{platform}.com/share/upload_attachment</span>
            </div>

            {/* Platform Selector Buttons */}
            <div className="flex items-center gap-1.5">
              {(['whatsapp', 'twitter', 'telegram', 'instagram'] as PlatformType[]).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => {
                    sfx.playClick()
                    setPlatform(p)
                  }}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-mono font-bold capitalize transition-all cursor-pointer ${
                    platform === p
                      ? 'bg-[#00f2fe] text-[#02040a]'
                      : 'bg-[#111827] text-slate-400 hover:text-white'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Simulated Web Application Page Body */}
          <div className="p-6 md:p-8 bg-[#0b1329]/60 min-h-[360px] flex flex-col items-center justify-center relative">
            {/* Social Share Upload Mock Dialog */}
            <div className="w-full max-w-lg p-6 rounded-2xl bg-[#030712] border border-white/15 shadow-xl flex flex-col gap-4 relative">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="font-mono text-xs font-bold text-slate-200 uppercase">
                  {platform} • NEW MEDIA FORWARD / POST
                </span>
                <span className="text-[10px] font-mono text-slate-400">Target: Public Feed</span>
              </div>

              {/* Upload Item Preview */}
              <div className="p-4 rounded-xl bg-[#080d1a] border border-white/10 flex items-center gap-3">
                <div className="w-14 h-14 rounded-lg bg-[#111827] border border-white/10 flex items-center justify-center text-[#38bdf8] flex-shrink-0">
                  <FileWarning size={24} />
                </div>
                <div className="flex-1 overflow-hidden">
                  <b className="text-xs text-slate-100 block truncate">breaking_press_conference_leak.mp4</b>
                  <span className="text-[10px] font-mono text-slate-400">Size: 14.2 MB • H.264 Video</span>
                </div>
                <button
                  type="button"
                  onClick={handleSimulateUpload}
                  className="px-3 py-1.5 rounded-lg bg-[#38bdf8]/10 hover:bg-[#38bdf8]/20 border border-[#38bdf8]/40 text-[#38bdf8] text-xs font-mono font-bold cursor-pointer"
                >
                  Re-test Upload
                </button>
              </div>

              {/* Kavach Shield Intercept Overlay Modal (Pops up directly over the share dialog) */}
              <AnimatePresence>
                {isShieldActive && isIntercepted && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="p-4 md:p-5 rounded-2xl bg-[#030712] border-2 border-[#ef4444] shadow-[0_0_30px_rgba(239,68,68,0.3)] flex flex-col gap-3 relative"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#ef4444]">
                        <AlertOctagon size={18} className="animate-pulse text-[#ef4444]" />
                        <span>KAVACH SHIELD: PRE-TRANSMISSION INTERCEPT</span>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#ef4444]/20 border border-[#ef4444] text-[#ef4444]">
                        94.2% SYNTHETIC
                      </span>
                    </div>

                    <p className="text-xs text-slate-200 leading-relaxed font-sans">
                      <b>Suspect Deepfake Detected:</b> Sub-pixel facial warping and vocoder speech cloning identified in <b>340ms</b> prior to network transmission. Forwarding this asset may spread malicious disinformation.
                    </p>

                    {/* Action Selector */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-white/10 font-mono text-xs">
                      <button
                        type="button"
                        onClick={() => handleAction('blocked')}
                        className={`p-2 rounded-xl border font-bold cursor-pointer transition-all ${
                          interceptAction === 'blocked'
                            ? 'bg-[#ef4444] text-white border-[#ef4444]'
                            : 'bg-[#ef4444]/10 border-[#ef4444]/40 text-[#ef4444] hover:bg-[#ef4444]/20'
                        }`}
                      >
                        ⛔ Block Share
                      </button>

                      <button
                        type="button"
                        onClick={() => handleAction('warned')}
                        className={`p-2 rounded-xl border font-bold cursor-pointer transition-all ${
                          interceptAction === 'warned'
                            ? 'bg-[#f59e0b] text-black border-[#f59e0b]'
                            : 'bg-[#f59e0b]/10 border-[#f59e0b]/40 text-[#f59e0b] hover:bg-[#f59e0b]/20'
                        }`}
                      >
                        ⚠️ Add Warning Tag
                      </button>

                      <button
                        type="button"
                        onClick={() => handleAction('analyzed')}
                        className={`p-2 rounded-xl border font-bold cursor-pointer transition-all ${
                          interceptAction === 'analyzed'
                            ? 'bg-[#00f2fe] text-black border-[#00f2fe]'
                            : 'bg-[#00f2fe]/10 border-[#00f2fe]/40 text-[#00f2fe] hover:bg-[#00f2fe]/20'
                        }`}
                      >
                        🔍 Open In Vault
                      </button>
                    </div>

                    {interceptAction && (
                      <div className="p-2.5 rounded-lg bg-[#080d1a] border border-white/10 font-mono text-[11px] text-[#34d399] flex items-center gap-1.5">
                        <CheckCircle2 size={13} />
                        <span>Action Executed: {interceptAction.toUpperCase()} (Audit hash logged locally)</span>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {!isShieldActive && (
                <div className="p-4 rounded-xl bg-[#ef4444]/10 border border-[#ef4444]/30 text-xs font-mono text-[#ef4444] flex items-center gap-2">
                  <AlertOctagon size={16} />
                  <span>Shield Disabled: Deepfake asset would be shared to 100,000+ users without warnings.</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
