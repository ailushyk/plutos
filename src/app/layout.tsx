import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import './globals.css'

import React from 'react'

import { cn } from '@/lib/utils'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Plutos',
    template: '%s - Plutos',
  },
  description: 'Plutos is a your personal finance manager.',
  robots: 'index, follow',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={cn('dark', inter.className)}>{children}</body>
    </html>
  )
}
