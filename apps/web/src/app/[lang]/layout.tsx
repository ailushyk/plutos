import React from 'react'
import '../../styles/globals.css'
// include styles from the ui package
import '../../../../../packages/ui/dist/index.css'
import { Inter } from 'next/font/google'

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
    <html
      lang={params.lang}
      className={`${inter.variable} bg-zinc-950 text-white/90`}
    >
      <body className="antialiased">
        <div className="status-bar h-12" />
        {children}
      </body>
    </html>
  )
}
