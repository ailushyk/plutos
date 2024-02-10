import React from 'react'
import { signInAction } from '@/actions/auth.actions'

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

        <SubmitButton type="submit">Login</SubmitButton>
      </Form>
    </CardWrapper>
  )
}
