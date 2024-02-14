import { db } from '@/lib/db'

export const getUserById = async (id: string) => {
  try {
    return await db.user.findUnique({
      where: {
        id,
      },
    })
  } catch (error) {
    console.error('Error getting user by id', error)
    return null
  }
}

export const getUserByEmail = async (email: string) => {
  try {
    return await db.user.findUnique({
      where: {
        email,
      },
    })
  } catch (error) {
    console.error('Error getting user by id', error)
    return null
  }
}

export const createUser = async (data: {
  name: string
  email: string
  password: string
}) => {
  try {
    const user = await db.user.create({
      data,
    })
    return user
  } catch (error) {
    console.error('Error creating user', error)
    return null
  }
}

export const confirmUserEmail = async ({
  email,
  newEmail,
}: {
  email: string
  newEmail: string
}) => {
  try {
    return await db.user.update({
      where: { email },
      data: {
        email: newEmail,
        emailVerified: new Date().toISOString(),
      },
    })
  } catch (error) {
    console.error('Error confirming user email', error)
    return null
  }
}

export const updateUserPassword = async ({
  id,
  password,
}: {
  id: string
  password: string
}) => {
  return db.user.update({
    where: { id },
    data: {
      password,
    },
  })
}
