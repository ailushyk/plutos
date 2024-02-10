'use client'

import React from 'react'
import { signUpAction } from '@/actions/auth.actions'

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

export function SignUpForm() {
  return (
    <CardWrapper
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

        <SubmitButton type="submit">Login</SubmitButton>

        <FormSuccess message="You have been successfully logged in." />

        <FormError message="There was an error with your submission. Please try again." />
      </Form>
    </CardWrapper>
  )
}
