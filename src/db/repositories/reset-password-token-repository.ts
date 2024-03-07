import { eq } from 'drizzle-orm'

import { db } from '@/db'
import { resetPasswordToken } from '@/db/schema/users'

async function create(param: { email: string; token: string; expires: Date }) {
  return db.insert(resetPasswordToken).values(param)
}

async function deleteFn(id: string) {
  return db.delete(resetPasswordToken).where(eq(resetPasswordToken.id, id))
}

async function getByEmail(email: string) {
  return db.query.resetPasswordToken.findFirst({
    where: (users, { eq }) => {
      return eq(users.email, email)
    },
  })
}

function getByToken(token: string) {
  return db.query.resetPasswordToken.findFirst({
    where: (resetPasswordToken, { eq }) => {
      return eq(resetPasswordToken.token, token)
    },
  })
}

export const ResetPasswordTokenRepository = {
  create,
  delete: deleteFn,
  getByEmail,
  getByToken,
}
