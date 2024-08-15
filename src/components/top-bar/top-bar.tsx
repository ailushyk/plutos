'use client'

import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { ChevronLeftIcon } from '@/components/icons/chevron-left-icon'
import { TransactionsMenuIcon } from '@/components/icons/transactions-menu-icon'
import { Button } from '@/components/ui/button'

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
    <div className="flex min-h-12 items-center gap-x-1.5 border-b px-6">
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
      <Button variant="ghost" size="icon" asChild>
        <Link href={href}>
          <ChevronLeftIcon />
        </Link>
      </Button>
    )
  }

  return (
    <Button variant="ghost" size="icon" onClick={() => router.back()}>
      <ChevronLeftIcon />
    </Button>
  )
}

export { TopBar, TopBarTitle }
