import crypto from 'crypto'
import { confirmUserEmail, getUserByEmail } from '@/data/user'

import { db } from '@/lib/db'

class VerificationToken {
  async getVerificationTokenByToken(token: string) {
    try {
      return await db.verificationToken.findFirst({
        where: { token },
      })
    } catch (error) {
      console.error('getVerificationTokenByToken', error)
      return null
    }
  }
  async getVerificationTokenByEmail(email: string) {
    try {
      return await db.verificationToken.findFirst({
        where: { email },
      })
    } catch (error) {
      console.error('getVerificationTokenByEmail', error)
      return null
    }
  }
  async createVerificationToken(data: {
    email: string
    token: string
    expires: string
  }) {
    try {
      return await db.verificationToken.create({
        data,
      })
    } catch (error) {
      console.error('createVerificationToken', error)
      return null
    }
  }
  async deleteVerificationToken(id: string) {
    try {
      return await db.verificationToken.delete({
        where: { id },
      })
    } catch (error) {
      console.error('deleteVerificationToken', error)
      return null
    }
  }

  async generateToken(email: string) {
    try {
      const token = crypto.randomBytes(48).toString('hex')
      const expires = new Date(
        new Date().getTime() + 1000 * 60 * 60 * 24,
      ).toISOString() // 24 hours
      const existingToken = await this.getVerificationTokenByEmail(email)

      if (existingToken) {
        await this.deleteVerificationToken(existingToken.id)
      }

      return await this.createVerificationToken({ email, token, expires })
    } catch (error) {
      console.error('generateToken', error)
      return null
    }
  }

  async verifyToken(token: string) {
    const existingToken = await this.getVerificationTokenByToken(token)

    if (!existingToken)
      return {
        status: 'error',
        message: 'Token not found!',
      }

    const isExpired = new Date(existingToken.expires) < new Date()
    if (isExpired) {
      await this.deleteVerificationToken(existingToken.id)
      return {
        status: 'error',
        message: 'Token expired!',
      }
    }

    const user = await getUserByEmail(existingToken.email)
    if (!user) {
      await this.deleteVerificationToken(existingToken.id)
      return {
        status: 'error',
        message: 'User not found!',
      }
    }

    try {
      await confirmUserEmail({
        email: user.email!,
        newEmail: existingToken.email,
      })
      await this.deleteVerificationToken(existingToken.id)
      return {
        status: 'ok',
        message: 'Your email has been verified!',
      }
    } catch (error) {
      console.error('VERIFY TOKEN ERROR: ', error)
      throw error
    }
  }
}

export const verificationToken = new VerificationToken()
