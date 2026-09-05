'use client'

import React from 'react'
import { LoadingProvider } from '@/context/LoadingContext'
import { RouteTransitionHandler } from '@/components/RouteTransitionHandler'
import { I18nProvider } from '@/lib/i18n'
import { KavachSplashScreen } from '@/components/splash/KavachSplashScreen'

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <I18nProvider>
      <LoadingProvider>
        <KavachSplashScreen />
        <RouteTransitionHandler />
        {children}
      </LoadingProvider>
    </I18nProvider>
  )
}

export default AppProviders
