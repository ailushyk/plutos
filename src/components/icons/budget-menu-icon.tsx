import * as React from 'react'
import { PieChartIcon } from '@radix-ui/react-icons'

import { cn } from '@/lib/utils'

export function BudgetMenuIcon({ className }: { className?: string }) {
  return <PieChartIcon className={cn('h-4 w-4', className)} />
}
