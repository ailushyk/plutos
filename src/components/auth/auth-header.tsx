import React from 'react'
import { Poppins } from 'next/font/google'
import Link from 'next/link'
import { appConfig } from '@/app-config'

import { cn } from '@/lib/utils'

const font = Poppins({
  subsets: ['latin'],
  weight: ['600'],
})

export function AuthHeader({ children }: { children: string }) {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-y-1.5">
      <h1 className={cn('text-3xl font-semibold', font.className)}>
        <Link href="/">{appConfig.appName}</Link>
      </h1>
      <p className="text-sm text-muted-foreground">{children}</p>
    </div>
  )
}
