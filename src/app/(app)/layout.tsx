import React from 'react'

import { Sidebar } from '@/components/nav/sidebar'

export const metadata = {
  robots: 'noindex, nofollow',
}

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-full">
      <Sidebar />
      <div className="flex-1">{children}</div>
    </div>
  )
}
