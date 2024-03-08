import React from 'react'
import { Slot } from '@radix-ui/react-slot'

import { cn } from '@/lib/utils'

export const List = ({ children }: { children: React.ReactNode }) => {
  return <div className="mx-auto flex max-w-lg flex-col">{children}</div>
}

export function ListGroup({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-4 overflow-hidden rounded-xl border bg-gray-900">
      {children}
    </div>
  )
}

export function ListGroupTitle({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn('mt-2 px-6 py-2 text-sm', className)}>{children}</div>
  )
}

export const ListItem = ({
  children,
  className,
  asChild,
}: {
  children: React.ReactNode
  className?: string
  asChild?: boolean
}) => {
  const Comp = asChild ? Slot : 'div'
  return (
    <Comp
      className={cn(
        'block w-full border-b px-6 py-2 last:border-none hover:bg-accent',
        className,
      )}
    >
      {children}
    </Comp>
  )
}
