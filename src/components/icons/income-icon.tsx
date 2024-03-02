import * as React from 'react'
import { ArrowDownIcon, ArrowUpIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

export function IncomeIcon({ className }: { className?: string }) {
  return <ArrowDownIcon className={cn('h-4 w-4', className)} />
}
