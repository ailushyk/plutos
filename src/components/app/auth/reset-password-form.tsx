import { resetPasswordAction } from '@/actions/auth.actions'
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

export const ResetPasswordForm = () => {
  return (
    <CardWrapper
      headerLabel="Reset Password"
      backButtonLabel="Remember your password? Sign in here."
      backButtonHref={AUTH_SIGN_IN_URL}
    >
      <Form action={resetPasswordAction}>
        <FormSection>
          <FormField name="email">
            <FormLabel>Email</FormLabel>
            <FormInput type="email" placeholder="john.doe@example.com" />

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
