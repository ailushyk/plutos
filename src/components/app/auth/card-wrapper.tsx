import React from 'react'

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { AuthHeader } from '@/components/app/auth/auth-header'
import { BackButton } from '@/components/app/auth/back-button'
import { Social } from '@/components/app/auth/social'

interface CardWrapperProps {
  children: React.ReactNode
  headerLabel: string
  backButtonLabel: string
  backButtonHref: string
  showSocial?: boolean
}

export function CardWrapper({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocial,
}: CardWrapperProps) {
  return (
    <Card className="m-4 w-full max-w-sm shadow-md">
      <CardHeader>
        <AuthHeader>{headerLabel}</AuthHeader>
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial && (
        <CardFooter className="flex flex-col gap-y-4">
          <div className="relative flex w-full items-center justify-center before:absolute before:top-1/2 before:w-full before:border-t before:border-border">
            <div className="relative bg-background px-3 text-sm font-normal text-muted-foreground">
              OR
            </div>
          </div>
          <Social />
        </CardFooter>
      )}
      <CardFooter>
        <BackButton href={backButtonHref}>{backButtonLabel}</BackButton>
      </CardFooter>
    </Card>
  )
}
