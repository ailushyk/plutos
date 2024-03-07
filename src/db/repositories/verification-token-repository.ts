import { eq } from 'drizzle-orm'

import { db } from '@/db'
import { verificationTokens } from '@/db/schema/users'

async function create(data: {
  expires: Date
  identifier: string
  token: string
}) {
  return db.insert(verificationTokens).values(data)
}

async function deleteFn(id: string) {
  return db.delete(verificationTokens).where(eq(verificationTokens.id, id))
}

async function getByEmail(email: string) {
  return db.query.verificationTokens.findFirst({
    where: (token, { eq }) => {
      return eq(token.identifier, email)
    },
  })
}

async function getByToken(token: string) {
  return db.query.verificationTokens.findFirst({
    where: (verificationTokens, { eq }) => {
      return eq(verificationTokens.token, token)
    },
  })
}

export const VerificationTokenRepository = {
  create,
  delete: deleteFn,
  getByEmail,
  getByToken,
}
