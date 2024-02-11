import React from 'react'
import { Loader } from 'lucide-react'

interface Props {
  isPending: boolean
  children: React.ReactNode
}

export const TextWithPendingSpinner = ({ isPending, children }: Props) => {
  return (
    <span className="relative flex items-center justify-center">
      <span className={isPending ? 'invisible' : 'visible'}>{children}</span>
      {isPending ? (
        <span className="absolute animate-spin duration-1000">
          <Loader className="h-4 w-4 text-muted-foreground" />
        </span>
      ) : null}
    </span>
  )
}
