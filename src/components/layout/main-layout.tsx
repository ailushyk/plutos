import React from 'react'

import { cn } from '@/lib/utils'
import { ScrollArea } from '@/components/ui/scroll-area'
import { BottomPlaceholder } from '@/components/bottom-placeholder'

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
  wrapperClassName,
}: {
  children: React.ReactNode
  className?: string
  wrapperClassName?: string
}) => {
  return (
    <ScrollArea className={cn('h-full', wrapperClassName)}>
      <main className={cn('', className)}>{children}</main>
      <BottomPlaceholder />
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
