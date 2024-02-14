import React from 'react'

import { Button } from '@/components/ui/button'

export function ResetPassword({ link }: { link: string }) {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-semibold">Reset your password</h1>
      <p>
        You have requested to reset your password. Please click the link below
        to reset your password.
      </p>
      <p>
        If you did not request to reset your password, please ignore this email.
      </p>

      <div className="flex items-center justify-center">
        <Button asChild>
          <a href={link}>Reset password</a>
        </Button>
      </div>
    </div>
  )
}
