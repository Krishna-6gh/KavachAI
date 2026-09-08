'use client'

import React, { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { useLoader } from '@/context/LoadingContext'

/**
 * RouteTransitionHandler
 * Provides smooth cyber-forensic loading feedback whenever route navigation occurs or takes time.
 */
export function RouteTransitionHandler() {
  const pathname = usePathname()
  const prevPathnameRef = useRef<string | null>(null)
  const { startLoading } = useLoader()

  useEffect(() => {
    // Check if route changed after initial mount
    if (prevPathnameRef.current !== null && prevPathnameRef.current !== pathname) {
      const getMessage = (path: string) => {
        if (path.includes('console')) return 'Entering Forensic Enclave...'
        if (path.includes('strongroom')) return 'Accessing Evidence Vault...'
        if (path.includes('dashboard')) return 'Loading Intel Operations...'
        if (path.includes('login') || path.includes('auth')) return 'Authenticating Credentials...'
        return 'Connecting Cryptographic Session...'
      }
      startLoading(getMessage(pathname))
    }
    prevPathnameRef.current = pathname
  }, [pathname, startLoading])

  return null
}

export default RouteTransitionHandler
