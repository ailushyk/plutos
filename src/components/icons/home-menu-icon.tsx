import * as React from 'react'
import { LayoutGridIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

export function HomeMenuIcon({ className }: { className?: string }) {
  return <LayoutGridIcon className={cn('h-4 w-4', className)} />
}
