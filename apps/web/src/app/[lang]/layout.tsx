import React from 'react'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'

import '@/styles/globals.css'
import '../../../../../packages/ui/dist/index.css'
import { dark } from '@clerk/themes'

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
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang={params.lang}>
        <body
          className={`${inter.variable} bg-zinc-950 text-white/90 antialiased`}
        >
          <div className="status-bar h-12" />
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
