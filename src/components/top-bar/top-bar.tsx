'use client'

import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { ChevronLeftIcon } from '@/components/icons/chevron-left-icon'

const TopBar = ({
  children,
  backButton,
  backButtonHref,
}: {
  children: React.ReactNode
  backButton?: boolean
  backButtonHref?: string
}) => {
  return (
    <div className="flex min-h-12 items-center gap-1 border-b px-6 py-2">
      {backButton && <TopBarBackButton href={backButtonHref} />}

      <div className="flex flex-1 items-center justify-between gap-2">
        {children}
      </div>
    </div>
  )
}
const TopBarTitle = ({ children }: { children: string | string[] }) => {
  return (
    <div className="text-sm font-light">
      <h1>{children}</h1>
    </div>
  )
}

function TopBarBackButton({ href }: { href?: string }) {
  const router = useRouter()
  if (href) {
    return (
      <Button variant="ghost" className="p-0" asChild>
        <Link href={href}>
          <ChevronLeftIcon />
        </Link>
      </Button>
    )
  }

  return (
    <Button variant="ghost" className="p-0" onClick={() => router.back()}>
      <ChevronLeftIcon />
    </Button>
  )
}

export { TopBar, TopBarTitle }
