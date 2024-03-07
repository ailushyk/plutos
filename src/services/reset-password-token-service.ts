import crypto from 'crypto'

import { ResetPasswordTokenRepository } from '@/db/repositories/reset-password-token-repository'

async function generateToken(email: string) {
  try {
    const token = crypto.randomBytes(32).toString('hex')
    const expires = new Date(new Date().getTime() + 1000 * 60 * 60 * 24)
    const existingToken = await ResetPasswordTokenRepository.getByEmail(email)

    if (existingToken) {
      await ResetPasswordTokenRepository.delete(existingToken.id)
    }

    const data = {
      email,
      token,
      expires,
    }
    await ResetPasswordTokenRepository.create(data)

    return data
  } catch (error) {
    console.error('RESET PASSWORD TOKEN GENERATE TOKEN: ', error)
    return null
  }
}

export const ResetPasswordTokenService = {
  generateToken,
}
