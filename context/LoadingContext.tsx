'use client'

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'
import { AnimatePresence } from 'framer-motion'
import CyberLoadingScreen from '@/components/CyberLoadingScreen'

interface LoadingContextType {
  startLoading: (message?: string) => void
  stopLoading: () => void
  isLoading: boolean
}

const LoadingContext = createContext<LoadingContextType>({
  startLoading: () => {},
  stopLoading: () => {},
  isLoading: false,
})

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [activeMessage, setActiveMessage] = useState<string | undefined>()

  useEffect(() => {
    setMounted(true)
  }, [])

  const startLoading = useCallback((message?: string) => {
    setActiveMessage(message)
    setIsLoading(true)
  }, [])

  const stopLoading = useCallback(() => {
    setIsLoading(false)
  }, [])

  const handleComplete = useCallback(() => {
    setIsLoading(false)
  }, [])

  return (
    <LoadingContext.Provider value={{ startLoading, stopLoading, isLoading }}>
      <AnimatePresence mode="wait">
        {mounted && isLoading && (
          <CyberLoadingScreen
            customMessage={activeMessage}
            onComplete={handleComplete}
            minDurationMs={800} // Fast and punchy 800ms
          />
        )}
      </AnimatePresence>
      {children}
    </LoadingContext.Provider>
  )
}

export const useLoader = () => {
  const context = useContext(LoadingContext)
  if (!context) {
    throw new Error('useLoader must be used within a LoadingProvider')
  }
  return context
}

export default LoadingContext
