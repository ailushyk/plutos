import React from 'react'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { GradientText } from 'ui'

import '@/styles/globals.css'
import '../../../../../packages/ui/dist/index.css'
import { dark } from '@clerk/themes'

export const metadata = {
  title: 'Plutos',
  description: '',
}

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en">
        <body
          className={`${inter.variable} bg-zinc-950 text-white/90 antialiased`}
        >
          <div className="status-bar h-12" />
          <div>
            <div className="container mx-auto mb-12 flex items-center justify-center">
              <h1 className="text-lg font-extrabold text-white/80 sm:text-2xl lg:text-3xl xl:text-4xl">
                <GradientText>
                  <span className="sm:text-4xl">Plutos</span>
                </GradientText>
              </h1>
            </div>
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  )
}
