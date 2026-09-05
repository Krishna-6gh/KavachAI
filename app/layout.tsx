import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'
import { AppProviders } from '@/components/AppProviders'

export const metadata: Metadata = {
  title: 'KavachAI — Forensic Intelligence & Cryptographic Media Verification',
  description:
    'Evidence-grade digital forensic intelligence platform for deepfake analysis, temporal lattice inspection, and C2PA provenance verification.',
  generator: 'KavachAI',
  icons: {
    icon: [
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: '#0ea5a5',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&family=Outfit:wght@500;600;700;800;900&family=Space+Grotesk:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <AppProviders>
          {children}
        </AppProviders>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
