import crypto from 'crypto'

import { db } from '@/lib/db'
import { FormStateValue } from '@/components/form'

class ResetPasswordToken {
  private createToken(data: { expires: string; email: string; token: string }) {
    return db.resetPasswordToken.create({
      data,
    })
  }
  async deleteToken(id: string) {
    return db.resetPasswordToken.delete({
      where: { id },
    })
  }

  async getTokenByEmail(email: string) {
    return db.resetPasswordToken.findFirst({
      where: { email },
    })
  }

  async getTokenByToken(token: string) {
    return db.resetPasswordToken.findFirst({
      where: { token },
    })
  }

  async generateToken(email: string) {
    try {
      const token = crypto.randomBytes(32).toString('hex')
      const expires = new Date(
        new Date().getTime() + 1000 * 60 * 60 * 24,
      ).toISOString()
      const existingToken = await this.getTokenByEmail(email)
      if (existingToken) {
        await this.deleteToken(existingToken.id)
      }
      return this.createToken({
        email,
        token,
        expires,
      })
    } catch (error) {
      console.error('RESET PASSWORD TOKEN GENERATE TOKEN: ', error)
      return null
    }
  }
}

export const resetPasswordToken = new ResetPasswordToken()
