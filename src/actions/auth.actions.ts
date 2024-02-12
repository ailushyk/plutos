'use server'

import { createUser, getUserByEmail } from '@/data/user'
import { verificationToken } from '@/data/verification-token'
import { AUTH_DEFAULT_REDIRECT_URL } from '@/routes'
import { SighUpSchema, SignInSchema } from '@/schemas'
import bcryptjs from 'bcryptjs'
import { AuthError } from 'next-auth'

import { signIn } from '@/lib/auth/auth'
import { sendVerificationEmail } from '@/lib/auth/send-verificatioin-email'
import { FormStateValue } from '@/components/form'

export async function signInAction(
  prevState: FormStateValue,
  formData: FormData,
): Promise<FormStateValue> {
  const data = Object.fromEntries(formData.entries())
  const validatedFields = SignInSchema.safeParse(data)
  if (!validatedFields.success) {
    return {
      status: 'error',
      message:
        'The email or password you entered is incorrect. Please try again.',
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { email, password } = validatedFields.data
  const existingUser = await getUserByEmail(email)
  if (!(existingUser?.email && existingUser?.password)) {
    return {
      status: 'error',
      message: 'Invalid credentials!',
    }
  }
  if (!existingUser.emailVerified) {
    const _token = await verificationToken.generateToken(existingUser.email)
    await sendVerificationEmail(existingUser.email, _token?.token || '')
    return {
      status: 'error',
      message: 'Please verify your email first!',
    }
  }

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: AUTH_DEFAULT_REDIRECT_URL,
    })
    return {
      status: 'ok',
      message: 'You have been successfully logged in!',
    }
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin': {
          return {
            status: 'error',
            message: 'Invalid credentials',
          }
        }
        case 'AuthorizedCallbackError': {
          return {
            status: 'error',
            message: 'Access denied',
          }
        }
        default: {
          return {
            status: 'error',
            message: 'Something went wrong!',
          }
        }
      }
    }
    /**
     * next.js
     * https://nextjs.org/docs/app/building-your-application/routing/redirecting
     * "redirect internally throws an error, so it should be called outside of try/catch blocks."
     */
    throw error
  }
}

export async function signInWithProviderAction(provider: 'google' | 'github') {
  await signIn(provider, {
    callbackUrl: AUTH_DEFAULT_REDIRECT_URL,
  })
}

export async function signUpAction(
  prevState: FormStateValue,
  formData: FormData,
): Promise<FormStateValue> {
  const data = Object.fromEntries(formData.entries())
  const validatedFields = SighUpSchema.safeParse(data)
  if (!validatedFields.success) {
    return {
      status: 'error',
      message: 'Please check the form for errors.',
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { name, email, password } = validatedFields.data

  const existingUser = await getUserByEmail(email)
  if (existingUser) {
    return {
      status: 'error',
      message: 'User with this email already exists',
      errors: {
        email: 'User with this email already exists',
      },
    }
  }

  const hashedPassword = await bcryptjs.hash(password, 10)
  await createUser({
    name,
    email,
    password: hashedPassword,
  })

  const _token = await verificationToken.generateToken(email)
  await sendVerificationEmail(email, _token?.token || '')

  return {
    status: 'ok',
    message:
      'You have been successfully registered. Please check your email for verification.',
  }
}

export async function verifyEmailAction(
  prevState: any,
  { token }: { token: string },
) {
  if (prevState) return prevState

  try {
    const isVerified = await verificationToken.verifyToken(token)
    if (isVerified) {
      return {
        status: 'ok',
        message: 'Your email has been verified!',
      }
    }
    return {
      status: 'error',
      message: 'Invalid token!',
    }
  } catch (error) {
    console.error('verifyEmailAction', error)
    return {
      status: 'error',
      message: 'Something went wrong!',
    }
  }
}
