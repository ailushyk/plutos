import React from 'react'
import Link from 'next/link'
import { signInAction } from '@/actions/auth.actions'

import { Button } from '@/components/ui/button'
import { CardWrapper } from '@/components/auth/card-wrapper'
import {
  Form,
  FormError,
  FormField,
  FormInput,
  FormLabel,
  FormMessage,
  FormSection,
  FormSuccess,
  SubmitButton,
} from '@/components/form'

export function SignInForm() {
  return (
    <CardWrapper
      headerLabel="Welcome Back"
      backButtonLabel="Don't have an account? Sign up here."
      backButtonHref="/auth/sign-up"
      showSocial
    >
      <Form action={signInAction}>
        <FormSection>
          <FormField name="email">
            <FormLabel>Email</FormLabel>
            <FormInput type="email" placeholder="john.doe@example.com" />
            <FormMessage />
          </FormField>
          <FormField name="password">
            <FormLabel>Password</FormLabel>
            <FormInput type="password" placeholder="******" />
            <FormMessage />
          </FormField>
        </FormSection>

        <FormSuccess />

        <FormError />

        <div className="flex flex-col gap-3">
          <SubmitButton type="submit">Sign In</SubmitButton>
          <div className="text-center">
            <Button
              asChild
              size="sm"
              variant="link"
              className="p-0 text-xs font-normal text-muted-foreground"
            >
              <Link href="/auth/reset-password">
                Forgot your password? Click here.
              </Link>
            </Button>
          </div>
        </div>
      </Form>
    </CardWrapper>
  )
}
