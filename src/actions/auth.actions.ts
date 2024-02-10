'use server'

import { SignInSchema } from '@/schemas'

import { FormStateValue } from '@/components/form'

export async function signInAction(
  prevState: FormStateValue,
  formData: FormData,
) {
  const data = Object.fromEntries(formData.entries())
  const validatedFields = SignInSchema.safeParse(data)
  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  return {
    success: true,
  }
}
