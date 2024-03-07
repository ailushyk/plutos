import { eq } from 'drizzle-orm'

import { db } from '@/db'
import { users } from '@/db/schema/users'

function create(p: { password: string; name: string; email: string }) {
  return db.insert(users).values({
    email: p.email,
    name: p.name,
    password: p.password,
  })
}

function getById(id: string) {
  return db.query.users.findFirst({
    where: (users, { eq }) => {
      return eq(users.id, id)
    },
  })
}

async function getByEmail(email: string) {
  return db.query.users.findFirst({
    where: (users, { eq }) => {
      return eq(users.email, email)
    },
  })
}

function update(id: string, data: Partial<typeof users.$inferInsert>) {
  return db.update(users).set(data).where(eq(users.id, id))
}

export const UserRepository = {
  create,
  getById,
  getByEmail,
  update,
}
