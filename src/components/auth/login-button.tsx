'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { Slot } from '@radix-ui/react-slot'

interface LoginButtonProps {
  children: React.ReactNode
  mode?: 'redirect' | 'modal'
  asChild?: boolean
}

export const LoginButton = React.forwardRef<
  HTMLButtonElement,
  LoginButtonProps
>(({ children, mode = 'redirect', asChild }, ref) => {
  const router = useRouter()
  const Component = asChild ? Slot : 'button'

  if (mode === 'modal') {
    return <span>TODO: implement modal</span>
  }

  const onClick = () => {
    console.log('TODO: implement redirect click handler')
    router.push('/auth/login')
  }

  return (
    <Component ref={ref} onClick={onClick}>
      {children}
    </Component>
  )
})

LoginButton.displayName = 'LoginButton'
