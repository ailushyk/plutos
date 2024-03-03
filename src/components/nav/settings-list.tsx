import React from 'react'
import Link from 'next/link'

import { ChevronLeftIcon } from '@/components/icons/chevron-left-icon'

export const SettingsList = ({ children }: { children: React.ReactNode }) => {
  return <nav className="flex flex-col gap-3">{children}</nav>
}
export const SettingsListItem = ({
  title,
  description,
  href,
}: {
  title: string
  description?: string
  href: string
}) => {
  return (
    <Link
      href={href}
      className="h-11 rounded-md bg-background py-2 transition hover:bg-accent"
    >
      <div className="flex items-center justify-between rounded-md">
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">{title}</p>
          {description ? (
            <p className="text-xs leading-none text-muted-foreground">
              {description}
            </p>
          ) : null}
        </div>
        <div className="ml-auto flex flex-col items-end font-medium">
          <ChevronLeftIcon className="rotate-180" />
        </div>
      </div>
    </Link>
  )
}
