'use server'
import { auth } from '@clerk/nextjs'
import { db } from 'db'
import type { DBTypes } from 'db'

const api = () => {
  const currentUser = auth()

  return {
    star: {
      async getAll(): Promise<DBTypes.Star[]> {
        return await db.star.findMany({
          take: 100,
          where: {
            userId: currentUser.userId,
          },
        })
      },
    },
  }
}

export { api }
