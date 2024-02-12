import React from 'react'
import { Loader } from 'lucide-react'

import { cn } from '@/lib/utils'

export const SpinnerIcon = ({ className }: { className?: string }) => {
  return <Loader className={cn('h-4 w-4 text-muted-foreground', className)} />
}
