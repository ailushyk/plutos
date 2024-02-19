import React from 'react'
import { cva, VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const variants = cva('', {
  variants: {
    size: {
      xs: 'pb-8',
      sm: 'pb-16',
      md: 'pb-24',
      lg: 'pb-32',
      xl: 'pb-40',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

interface Props
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof variants> {}

export const BottomPlaceholder = React.forwardRef<
  React.ElementRef<'div'>,
  Props
>(({ className, size }: Props, ref) => (
  <div ref={ref} className={cn(variants({ size, className }))} />
))
BottomPlaceholder.displayName = 'BottomPlaceholder'
