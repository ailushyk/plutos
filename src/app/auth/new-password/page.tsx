import React from 'react'
import { createNewPasswordAction } from '@/actions/auth.actions'
import { AUTH_SIGN_IN_URL } from '@/routes'

import { CardWrapper } from '@/components/app/auth/card-wrapper'
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

export default function AuthNewPasswordPage({
  searchParams,
}: {
  searchParams: { token: string }
}) {
  return (
    <CardWrapper
      headerLabel="Enter your new password below."
      backButtonHref={AUTH_SIGN_IN_URL}
      backButtonLabel="Back to Sign In"
    >
      <Form action={createNewPasswordAction}>
        <input type="hidden" name="token" value={searchParams.token} />
        <FormSection>
          <FormField name="password">
            <FormLabel>New Password</FormLabel>
            <FormInput type="password" />
            <FormMessage />
          </FormField>
          <FormField name="passwordConfirmation">
            <FormLabel>Confirm Password</FormLabel>
            <FormInput type="password" />
            <FormMessage />
          </FormField>
        </FormSection>

        <FormSuccess />
        <FormError />

        <SubmitButton type="submit">Reset Password</SubmitButton>
      </Form>
    </CardWrapper>
  )
}
