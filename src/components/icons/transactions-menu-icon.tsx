import * as React from 'react'
import { ArrowRightLeftIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

export function TransactionsMenuIcon({ className }: { className?: string }) {
  return <ArrowRightLeftIcon className={cn('h-4 w-4', className)} />
}
