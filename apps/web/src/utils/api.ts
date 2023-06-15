'use server'
import { auth } from '@clerk/nextjs'
import { db } from '@/utils/db'

const api = () => {
  const currentUser = auth()

  return {
    star: {
      async getAll() {
        // if (!currentUser) return []

        return await db.star.findMany({
          take: 100,
          // where: {
          //   userId: currentUser.userId,
          // },
        })
      },
    },
  }
}

export { api }
