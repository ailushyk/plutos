import { SlidersIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

export function SettingsMenuIcon({ className }: { className?: string }) {
  return <SlidersIcon className={cn('h-4 w-4', className)} />
}
