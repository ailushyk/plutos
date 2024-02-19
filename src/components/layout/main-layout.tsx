import React from 'react'

import { cn } from '@/lib/utils'
import { ScrollArea } from '@/components/ui/scroll-area'

export const MainLayout = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return <div className={cn('flex h-full flex-col', className)}>{children}</div>
}

export const Main = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <ScrollArea>
      <main className={cn('', className)}>{children}</main>
    </ScrollArea>
  )
}

export const Container = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return <div className={cn('container', className)}>{children}</div>
}
