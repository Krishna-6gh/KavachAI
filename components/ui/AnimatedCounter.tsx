'use client'

import React, { useEffect, useState, useRef } from 'react'
import { useInView } from 'framer-motion'

export interface AnimatedCounterProps {
  /** Raw string like "2,137%", "$25 Million", "< 60 Sec", "98.4%", or pure number */
  value?: string | number
  target?: number
  prefix?: string
  suffix?: string
  decimals?: number
  duration?: number // in seconds, default 1.8s
  className?: string
}

function parseNumberString(str: string | number): {
  target: number
  prefix: string
  suffix: string
  decimals: number
  useCommas: boolean
  isParsable: boolean
} {
  if (typeof str === 'number') {
    return {
      target: str,
      prefix: '',
      suffix: '',
      decimals: Number.isInteger(str) ? 0 : 1,
      useCommas: str >= 1000,
      isParsable: true,
    }
  }

  if (!str) {
    return { target: 0, prefix: '', suffix: '', decimals: 0, useCommas: false, isParsable: false }
  }

  // Matches optional prefix, digits with commas/decimals, and optional suffix
  const match = str.trim().match(/^([^\d.-]*)([\d,]+(?:\.\d+)?)([^\d]*)$/)
  if (!match) {
    return { target: 0, prefix: '', suffix: str, decimals: 0, useCommas: false, isParsable: false }
  }

  const prefix = match[1] || ''
  const numStr = match[2] || '0'
  const suffix = match[3] || ''
  const useCommas = numStr.includes(',')
  const rawNum = parseFloat(numStr.replace(/,/g, ''))
  const decimalParts = numStr.split('.')
  const decimals = decimalParts.length > 1 ? decimalParts[1].length : 0

  return {
    target: isNaN(rawNum) ? 0 : rawNum,
    prefix,
    suffix,
    decimals,
    useCommas,
    isParsable: true,
  }
}

export function AnimatedCounter({
  value,
  target: propTarget,
  prefix: propPrefix,
  suffix: propSuffix,
  decimals: propDecimals,
  duration = 1.8,
  className = '',
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  // Trigger when 20% visible in viewport
  const isInView = useInView(ref, { once: false, amount: 0.2 })

  const parsed = parseNumberString(value ?? 0)
  const target = propTarget ?? parsed.target
  const prefix = propPrefix ?? parsed.prefix
  const suffix = propSuffix ?? parsed.suffix
  const decimals = propDecimals ?? parsed.decimals
  const useCommas = parsed.useCommas

  const [displayValue, setDisplayValue] = useState<string>(() => {
    if (!parsed.isParsable && typeof value === 'string') return value
    return `${prefix}${decimals > 0 ? (0).toFixed(decimals) : '0'}${suffix}`
  })

  useEffect(() => {
    if (!parsed.isParsable && typeof value === 'string') {
      setDisplayValue(value)
      return
    }

    if (!isInView) {
      return
    }

    let animationFrameId: number
    const durationMs = duration * 1000
    const startTime = performance.now()

    const updateCounter = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(1, elapsed / durationMs)
      
      // Luxurious ease-out cubic curve: 1 - (1 - t)^3
      const easeProgress = 1 - Math.pow(1 - progress, 3)
      const currentVal = target * easeProgress

      let formattedNumber = ''
      if (decimals > 0) {
        formattedNumber = currentVal.toFixed(decimals)
      } else {
        const rounded = Math.round(currentVal)
        formattedNumber = useCommas ? rounded.toLocaleString('en-US') : rounded.toString()
      }

      setDisplayValue(`${prefix}${formattedNumber}${suffix}`)

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateCounter)
      } else {
        // Final exact snap
        let finalFormatted = ''
        if (decimals > 0) {
          finalFormatted = target.toFixed(decimals)
        } else {
          finalFormatted = useCommas ? target.toLocaleString('en-US') : target.toString()
        }
        setDisplayValue(`${prefix}${finalFormatted}${suffix}`)
      }
    }

    animationFrameId = requestAnimationFrame(updateCounter)

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [isInView, target, prefix, suffix, decimals, useCommas, duration, value, parsed.isParsable])

  return (
    <span ref={ref} className={`inline-block tabular-nums ${className}`}>
      {displayValue}
    </span>
  )
}

export default AnimatedCounter
