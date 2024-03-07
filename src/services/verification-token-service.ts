import crypto from 'crypto'
import { UserService } from '@/services/user-service'

import { VerificationTokenRepository } from '@/db/repositories/verification-token-repository'

async function generateToken(identifier: string) {
  try {
    const token = crypto.randomBytes(48).toString('hex')
    const expires = new Date(new Date().getTime() + 1000 * 60 * 60 * 24)
    const existingToken =
      await VerificationTokenRepository.getByEmail(identifier)

    if (existingToken) {
      await VerificationTokenRepository.delete(existingToken.id)
    }

    await VerificationTokenRepository.create({
      identifier,
      token,
      expires,
    })

    return {
      token,
      expires,
    }
  } catch (error) {
    console.error('generateToken', error)
    return null
  }
}

async function validate(token: string) {
  try {
    const existingToken = await VerificationTokenRepository.getByToken(token)
    if (!existingToken) {
      return {
        status: 'error',
        message: 'Token not found!',
      }
    }

    const isExpired = new Date(existingToken.expires) < new Date()
    if (isExpired) {
      await VerificationTokenRepository.delete(existingToken.id)
      return {
        status: 'error',
        message: 'Token expired!',
      }
    }

    await UserService.confirmEmail(existingToken.identifier)
    await VerificationTokenRepository.delete(existingToken.id)
    return {
      status: 'ok',
      message: 'Your email has been verified!',
    }
  } catch (error) {
    console.error('VERIFY TOKEN ERROR: ', error)
    return {
      status: 'error',
      message: 'Something went wrong!',
    }
  }
}

export const VerificationTokenService = {
  generateToken,
  validate,
}
