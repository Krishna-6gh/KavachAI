'use client'

class SoundEffectsEngine {
  private ctx: AudioContext | null = null
  private enabled: boolean = true

  private initCtx() {
    if (typeof window === 'undefined') return null
    try {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
        if (AudioCtx) {
          this.ctx = new AudioCtx()
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {})
      }
      return this.ctx
    } catch {
      return null
    }
  }

  public setEnabled(val: boolean) {
    this.enabled = val
  }

  public isEnabled(): boolean {
    return this.enabled
  }

  // Subtle sci-fi click
  public playClick() {
    if (!this.enabled) return
    const ctx = this.initCtx()
    if (!ctx) return

    try {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(1200, ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.04)

      gain.gain.setValueAtTime(0.04, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start()
      osc.stop(ctx.currentTime + 0.04)
    } catch {
      // Ignore audio error
    }
  }

  // Forensic scanner sweep
  public playScan() {
    if (!this.enabled) return
    const ctx = this.initCtx()
    if (!ctx) return

    try {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(300, ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(1400, ctx.currentTime + 0.18)
      osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.35)

      gain.gain.setValueAtTime(0.06, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start()
      osc.stop(ctx.currentTime + 0.35)
    } catch {
      // Ignore audio error
    }
  }

  // Cryptographic Merkle Seal Chime
  public playSeal() {
    if (!this.enabled) return
    const ctx = this.initCtx()
    if (!ctx) return

    try {
      const notes = [523.25, 659.25, 783.99, 1046.5] // C Major Chord
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()

        osc.type = 'triangle'
        osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.05)

        gain.gain.setValueAtTime(0.035, ctx.currentTime + i * 0.05)
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.05 + 0.3)

        osc.connect(gain)
        gain.connect(ctx.destination)

        osc.start(ctx.currentTime + i * 0.05)
        osc.stop(ctx.currentTime + i * 0.05 + 0.3)
      })
    } catch {
      // Ignore audio error
    }
  }
}

export const sfx = new SoundEffectsEngine()
