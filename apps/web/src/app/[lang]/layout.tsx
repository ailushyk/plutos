import React from 'react'
import { Inter } from 'next/font/google'
import { AuthProvider } from '@/app/AuthProvider'

import '@/styles/globals.css'
import 'ui/styles.css'

export const runtime = 'edge'

export const metadata = {
  title: 'Plutos',
  description: '',
}

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export default function RootLayout({
  params,
  children,
}: {
  params: { lang: string }
  children: React.ReactNode
}) {
  return (
    <AuthProvider params={params}>
      <html lang={params.lang}>
        <body
          className={`${inter.variable} bg-zinc-950 text-white/90 antialiased`}
        >
          <div className="status-bar h-12" />
          {children}
        </body>
      </html>
    </AuthProvider>
  )
}
