import React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const fadingRowVariants = cva(
  'h-16 bg-gradient-to-b from-transparent to-background',
  {
    variants: {
      direction: {
        default: 'bg-gradient-to-b',
        top: 'bg-gradient-to-t',
        bottom: 'bg-gradient-to-b',
      },
      sticky: {
        top: 'sticky top-0',
        bottom: 'sticky bottom-0',
      },
    },
    defaultVariants: {
      direction: 'default',
    },
  },
)

interface FadingRowProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof fadingRowVariants> {
  asChild?: boolean
}

const FadingRow = React.forwardRef<HTMLDivElement, FadingRowProps>(
  ({ className, direction, sticky, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div'
    return (
      <Comp
        className={cn(fadingRowVariants({ direction, sticky, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)

FadingRow.displayName = 'FadingRow'

export { FadingRow, fadingRowVariants }

export type { FadingRowProps }
