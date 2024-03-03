import React from 'react'

export const metadata = {
  robots: 'noindex, nofollow',
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-background to-sky-200 dark:from-sky-600 dark:to-slate-950">
      {children}
    </div>
  )
}
