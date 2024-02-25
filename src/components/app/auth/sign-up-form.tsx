import React from 'react'
import { signUpAction } from '@/actions/auth.actions'

import { SignWrapper } from '@/components/app/auth/sign-wrapper'
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

export function SignUpForm() {
  return (
    <SignWrapper
      headerLabel="Create an Account"
      backButtonLabel="Already have an account? Sign in here."
      backButtonHref="/auth/sign-in"
      showSocial
    >
      <Form action={signUpAction}>
        <FormSection>
          <FormField name="name">
            <FormLabel>Name</FormLabel>
            <FormInput placeholder="John Doe" />
            <FormMessage />
          </FormField>
          <FormField name="email">
            <FormLabel>Email</FormLabel>
            <FormInput type="email" placeholder="john.doe@example.com" />
            <FormMessage />
          </FormField>
          <FormField name="password">
            <FormLabel>Password</FormLabel>
            <FormInput type="password" placeholder="****" autoComplete="off" />
            <FormMessage />
          </FormField>
          <FormField name="passwordConfirmation">
            <FormLabel>Password Confirmation</FormLabel>
            <FormInput type="password" placeholder="****" autoComplete="off" />
            <FormMessage />
          </FormField>
        </FormSection>

        <FormSuccess />
        <FormError />

        <SubmitButton type="submit">Create Account</SubmitButton>
      </Form>
    </SignWrapper>
  )
}
