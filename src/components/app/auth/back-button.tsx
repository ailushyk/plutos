import React from 'react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'

export function BackButton({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <Button variant="link" className="w-full font-normal" size="sm" asChild>
      <Link href={href}>{children}</Link>
    </Button>
  )
}
