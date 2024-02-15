import { db } from '@/lib/db'

class User {
  create(data: { name: string; email: string; password: string }) {
    return db.user.create({
      data,
    })
  }
  getById(id: string) {
    return db.user.findUnique({
      where: {
        id,
      },
    })
  }
  getByEmail(email: string) {
    return db.user.findUnique({
      where: {
        email,
      },
    })
  }
  confirmEmail(email: string, newEmail: string) {
    return db.user.update({
      where: { email },
      data: {
        email: newEmail,
        emailVerified: new Date().toISOString(),
      },
    })
  }
  updatePassword(id: string, password: string) {
    return db.user.update({
      where: { id },
      data: {
        password,
      },
    })
  }
}

export const user = new User()

/**
 * @deprecated
 */
export const getUserByEmail = (email: string) => {
  try {
    return user.getByEmail(email)
  } catch (error) {
    console.error('Error getting user by id', error)
    return null
  }
}

/**
 * @deprecated
 */
export const createUser = async (data: {
  name: string
  email: string
  password: string
}) => {
  try {
    return user.create(data)
  } catch (error) {
    console.error('Error creating user', error)
    return null
  }
}

/**
 * @deprecated
 */
export const confirmUserEmail = async ({
  email,
  newEmail,
}: {
  email: string
  newEmail: string
}) => {
  try {
    return user.confirmEmail(email, newEmail)
  } catch (error) {
    console.error('Error confirming user email', error)
    return null
  }
}

/**
 * @deprecated
 */
export const updateUserPassword = async ({
  id,
  password,
}: {
  id: string
  password: string
}) => {
  return user.updatePassword(id, password)
}
