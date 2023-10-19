import React from 'react'
import type { Metadata } from 'next'
import { Navbar } from './components'
import { Inter } from 'next/font/google'
import { ReduxProvider } from '@/redux/provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Web',
  description: 'Track Finance WEB'
}

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}): JSX.Element {
  return (
    <html lang="es">
      <body className={inter.className} suppressHydrationWarning={true}>
        <Navbar />
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  )
}
