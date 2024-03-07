'use server'

import { signIn } from '@/lib/auth/auth'
import { FormStateValue } from '@/components/form'
import { AUTH_DEFAULT_REDIRECT_URL } from '@/routes'
import { UserService } from '@/services/user-service'
import { VerificationTokenService } from '@/services/verification-token-service'

export async function signInAction(
  prevState: FormStateValue,
  formData: FormData,
): Promise<FormStateValue> {
  const data = Object.fromEntries(formData.entries())
  return UserService.signIn(data)
}

export async function signInWithProviderAction(
  prevState: FormStateValue,
  formData: FormData,
): Promise<FormStateValue> {
  const data = Object.fromEntries(formData.entries())
  const provider = formData.get('_action') as 'google' | 'github'
  await signIn(provider, {
    callbackUrl: AUTH_DEFAULT_REDIRECT_URL,
  })
  return {
    status: 'ok',
  }
}

export async function signUpAction(
  prevState: FormStateValue,
  formData: FormData,
): Promise<FormStateValue> {
  const data = Object.fromEntries(formData.entries())
  return UserService.signUp(data)
}

export async function verifyEmailAction(
  prevState: any,
  { token }: { token: string },
) {
  if (prevState) return prevState

  return VerificationTokenService.validate(token)
}

export async function resetPasswordAction(
  prevState: any,
  formData: FormData,
): Promise<FormStateValue> {
  const email = formData.get('email')
  return UserService.resetPassword(email)
}

export async function createNewPasswordAction(
  prevState: any,
  formData: FormData,
): Promise<FormStateValue> {
  const data = Object.fromEntries(formData.entries())

  return UserService.createNewPassword(data)
}
