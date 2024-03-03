import React from 'react'

import { cn } from '@/lib/utils'

export const EmptyContent = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <div
      className={cn(
        'flex h-full flex-col items-center justify-center gap-6 p-6 text-muted-foreground',
        className,
      )}
    >
      {children}
    </div>
  )
}
