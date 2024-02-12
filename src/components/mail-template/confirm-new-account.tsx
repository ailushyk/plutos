import React from 'react'

import { Button } from '@/components/ui/button'

export function ConfirmNewAccount({ link }: { link: string }) {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-semibold">Welcome to our platform!</h1>
      <p>
        You have successfully created an account. Please confirm your email
        address to activate your account.
      </p>
      <div className="flex items-center justify-center">
        <Button asChild>
          <a href={link}>Click here</a>
        </Button>
      </div>
    </div>
  )
}
