'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import { Icon, IconProps } from '@/components/icons/icon'

function NavDivider() {
  return <div className="h-4" />
}

const navGroupVariants = cva('space-y-1', {
  variants: {
    variant: {
      default: 'border-none',
      border: 'border-l border-accent pl-1',
      accordion: 'border-l border-accent pl-1',
    },
    nested: {
      none: 'ml-0',
      md: 'ml-4',
    },
    spaces: {
      xs: 'space-y-0.5',
      sm: 'space-y-1',
      md: 'space-y-2',
    },
  },
  defaultVariants: {
    variant: 'default',
    nested: 'none',
    spaces: 'xs',
  },
})

interface NavGroupProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof navGroupVariants> {
  asChild?: boolean
}
const NavGroup = React.forwardRef<HTMLDivElement, NavGroupProps>(
  ({ variant, nested, spaces, className, children, asChild }, ref) => {
    const Comp = asChild ? Slot : 'div'
    return (
      <Comp
        ref={ref}
        className={cn(
          navGroupVariants({
            variant,
            nested,
            spaces,
            className,
          }),
        )}
      >
        {children}
      </Comp>
    )
  },
)
NavGroup.displayName = 'NavGroup'

function NavItem({
  children,
  ...props
}: {
  children: React.ReactNode
  href?: string
}) {
  const pathname = usePathname()

  if (props.href) {
    return (
      <Link
        href={props.href}
        className={cn(
          'group flex cursor-default items-center gap-2 rounded-md px-3 py-1 text-sm text-muted-foreground transition-colors hover:bg-accent',
          pathname === props.href && 'bg-accent',
        )}
      >
        {children}
      </Link>
    )
  }

  return (
    <div
      {...props}
      className={cn(
        'group flex cursor-default items-center gap-2 rounded-md px-3 py-1 text-sm text-muted-foreground transition-colors',
      )}
    >
      {children}
    </div>
  )
}

function NavItemIcon({ className, ...props }: IconProps) {
  return (
    <Icon
      className={cn(
        'h-3 w-3 text-muted-foreground transition-colors group-hover:text-accent-foreground',
        className,
      )}
      {...props}
    />
  )
}

function NavLabel({ children }: { children: React.ReactNode }) {
  return <div className="px-2 text-xs text-muted-foreground">{children}</div>
}

export { NavDivider, NavGroup, NavItem, NavItemIcon, NavLabel }
