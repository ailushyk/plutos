import React from 'react'

import { cn } from '@/lib/utils'

export const List = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex flex-col">{children}</div>
}

export const ListItem = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="border-b bg-background px-6 py-2 transition hover:bg-accent">
      {children}
    </div>
  )
}

export function ListGroup({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'sticky top-0 z-10 flex h-11 items-center gap-3 border-b bg-accent px-6 text-sm dark:bg-gray-900',
        className,
      )}
    >
      {children}
    </div>
  )
}
