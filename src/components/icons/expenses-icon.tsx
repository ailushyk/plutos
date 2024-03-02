import * as React from 'react'
import { ArrowUpIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

export function ExpensesIcon({ className }: { className?: string }) {
  return <ArrowUpIcon className={cn('h-4 w-4', className)} />
}
