import React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { signIn } from '@/lib/auth/auth'

interface LoginButtonProps {
  children: React.ReactNode
  asChild?: boolean
}

export function SignIn({ children, asChild }: LoginButtonProps) {
  const Component = asChild ? Slot : 'button'

  return <form
    action={async () => {
      'use server'
      await signIn('keycloak')
    }}
  >
    <Component>
      {children}
    </Component>
  </form>
}
