import React from 'react'

import { SpinnerIcon } from '@/components/icons/spinner-icon'

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
          <SpinnerIcon />
        </span>
      ) : null}
    </span>
  )
}
