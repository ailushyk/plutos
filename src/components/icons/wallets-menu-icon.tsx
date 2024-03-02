import { Wallet2Icon } from 'lucide-react'

import { cn } from '@/lib/utils'

export function WalletsMenuIcon({ className }: { className?: string }) {
  return <Wallet2Icon className={cn('h-4 w-4', className)} />
}
