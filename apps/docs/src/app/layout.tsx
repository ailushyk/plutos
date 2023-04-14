import React from 'react'
import '../styles/globals.css'
// include styles from the ui package
import 'ui/styles.css'
import { Inter } from 'next/font/google'

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
    <html lang="en" className={`${inter.variable} bg-zinc-900`}>
      <body className="antialiased">{children}</body>
    </html>
  )
}
