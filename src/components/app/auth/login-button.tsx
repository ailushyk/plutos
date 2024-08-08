import React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { signIn } from '@/lib/auth/auth'

interface LoginButtonProps {
  children: React.ReactNode
  asChild?: boolean
}

export const LoginButton = React.forwardRef<
  HTMLButtonElement,
  LoginButtonProps
>(({ children, asChild }, ref) => {
  const Component = asChild ? Slot : 'button'

  const onClick = async () => {
    'use server'
    await signIn('keycloak')
  }

  return (
    <form
      action={async () => {
        'use server'
        await signIn('keycloak')
      }}
    >
      <Component ref={ref} onClick={onClick}>
        {children}
      </Component>
    </form>

  )
})

LoginButton.displayName = 'LoginButton'
