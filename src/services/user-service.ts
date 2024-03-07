import bcryptjs from 'bcryptjs'
import { AuthError } from 'next-auth'

import { signIn as authSignIn } from '@/lib/auth/auth'
import { sendResetPasswordEmail, sendVerificationEmail } from '@/lib/mail/mail'
import { ResetPasswordTokenRepository } from '@/db/repositories/reset-password-token-repository'
import { UserRepository } from '@/db/repositories/user-repository'
import { FormStateValue } from '@/components/form'
import { verificationToken } from '@/data/verification-token'
import { AUTH_DEFAULT_REDIRECT_URL } from '@/routes'
import {
  CreateNewPasswordSchema,
  ResetPasswordSchema,
  SighUpSchema,
  SignInSchema,
} from '@/schemas'
import { ResetPasswordTokenService } from '@/services/reset-password-token-service'
import { VerificationTokenService } from '@/services/verification-token-service'

async function signIn(data: any): Promise<FormStateValue> {
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
  const existingUser = await UserRepository.getByEmail(email)
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
    await authSignIn('credentials', {
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

async function signUp(data: any): Promise<FormStateValue> {
  const validatedFields = SighUpSchema.safeParse(data)
  if (!validatedFields.success) {
    return {
      status: 'error',
      message: 'Please check the form for errors.',
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { name, email, password } = validatedFields.data

  const existingUser = await UserRepository.getByEmail(email)
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
  await UserRepository.create({
    name,
    email,
    password: hashedPassword,
  })

  const token = await VerificationTokenService.generateToken(email)
  if (!token) {
    return {
      status: 'error',
      message: 'Something went wrong!',
    }
  }

  await sendVerificationEmail(email, token.token)

  return {
    status: 'ok',
    message:
      'You have been successfully registered. Please check your email for verification.',
  }
}

async function confirmEmail(email: string) {
  const user = await UserRepository.getByEmail(email)
  if (!user)
    throw new Error(`Confirmation Email: User with ${email} not found!`)
  await UserRepository.update(user.id, {
    emailVerified: new Date(),
  })
}

async function resetPassword(email: unknown): Promise<FormStateValue> {
  const validatedFields = ResetPasswordSchema.safeParse({ email })
  if (!validatedFields.success) {
    return {
      status: 'error',
      message: 'Please check the form for errors.',
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const existingUser = await UserRepository.getByEmail(
    validatedFields.data.email,
  )

  if (existingUser?.email) {
    if (!existingUser.password) {
      return {
        status: 'error',
        message: 'Use another method to sign in!',
      }
    }
    if (!existingUser.emailVerified) {
      return {
        status: 'error',
        message: 'Please verify your email first!',
      }
    }
    const _token = await ResetPasswordTokenService.generateToken(
      existingUser.email,
    )
    await sendResetPasswordEmail({
      email: existingUser.email,
      token: _token?.token || '',
    })
  }

  return {
    status: 'ok',
    message: 'Please check your email for further instructions.',
  }
}

async function createNewPassword(data: unknown): Promise<FormStateValue> {
  const validatedFields = CreateNewPasswordSchema.safeParse(data)
  if (!validatedFields.success) {
    return {
      status: 'error',
      message: 'Your form has errors or token is invalid!',
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }
  const { token, password } = validatedFields.data

  try {
    const existingToken = await ResetPasswordTokenRepository.getByToken(token)
    if (!existingToken) {
      return {
        status: 'error',
        message: 'Invalid token!',
      }
    }
    if (new Date(existingToken.expires) < new Date()) {
      return {
        status: 'error',
        message: 'Token has expired!',
      }
    }

    const existingUser = await UserRepository.getByEmail(existingToken.email)
    if (!existingUser) {
      return {
        status: 'error',
        message: 'User not found!',
      }
    }

    const hashedPassword = await bcryptjs.hash(password, 10)
    await UserRepository.update(existingUser.id, {
      password: hashedPassword,
    })
    await ResetPasswordTokenRepository.delete(existingToken.id)

    return {
      status: 'ok',
      message: 'Your password has been successfully updated!',
    }
  } catch (error) {
    console.error('CREATE NEW PASSWORD ACTION ERROR: ', error)
    return {
      status: 'error',
      message: 'Something went wrong!',
    }
  }
}

export const UserService = {
  signIn,
  signUp,
  confirmEmail,
  resetPassword,
  createNewPassword,
}
