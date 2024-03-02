import React, { ReactNode } from 'react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'

export function MobileMenua(props: { children: ReactNode }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-center gap-5 border-t bg-background/20 p-3 md:hidden">
      {props.children}
    </div>
  )
}

export function MobileMenu(props: { children: ReactNode }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-center gap-4 border-t bg-background/50 p-3 backdrop-blur-md md:hidden">
      {props.children}
    </div>
  )
}

export function MobileMenuItem({
  children,
  href,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <Button asChild variant="outline" className="h-11 w-11 p-0">
      <Link href={href}>{children}</Link>
    </Button>
  )
}
