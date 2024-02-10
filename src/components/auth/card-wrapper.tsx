import React from 'react'

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { AuthHeader } from '@/components/auth/auth-header'
import { BackButton } from '@/components/auth/back-button'
import { Social } from '@/components/auth/social'

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
        <CardFooter>
          <Social />
        </CardFooter>
      )}
      <CardFooter>
        <BackButton href={backButtonHref}>{backButtonLabel}</BackButton>
      </CardFooter>
    </Card>
  )
}
