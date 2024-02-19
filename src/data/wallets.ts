import { auth } from '@/lib/auth/auth'
import { db } from '@/lib/db'

class Wallet {
  private async getUser() {
    const { user } = (await auth()) || {}
    if (!user?.id) throw new Error('Authentication required')
    return user
  }

  async create(
    data: { name: string; type: string; currency: string },
    userId: string,
  ) {
    return db.wallet.create({
      data: {
        name: data.name,
        user: {
          connect: {
            id: userId,
          },
        },
        type: {
          connect: {
            id: data.type,
          },
        },
        currency: {
          connect: {
            id: data.currency,
          },
        },
      },
    })
  }

  async update(
    walletId: string,
    data: {
      name: string
      currency: string
      type: string
    },
  ) {
    return db.wallet.update({
      where: {
        id: walletId,
      },
      data: {
        name: data.name,
        currency: {
          connect: {
            id: data.currency,
          },
        },
        type: {
          connect: {
            id: data.type,
          },
        },
      },
    })
  }

  async delete(walletId: string) {
    return db.wallet.delete({
      where: {
        id: walletId,
      },
    })
  }

  async all(userId: string) {
    return db.wallet.findMany({
      where: {
        userId: userId,
      },
      include: {
        currency: true,
        type: true,
      },
    })
  }
  async get(walletId: string, userId: string) {
    return db.wallet.findFirst({
      where: {
        id: walletId,
        userId: userId,
      },
      select: {
        id: true,
        name: true,
        userId: true,
        balance: true,
        currency: {
          select: {
            id: true,
            name: true,
          },
        },
        type: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })
  }
  async getByIdAndUserId(walletId: string, userId: string) {
    return db.wallet.findFirst({
      where: {
        id: walletId,
        userId: userId,
      },
      select: {
        id: true,
        name: true,
        userId: true,
        balance: true,
        currency: {
          select: {
            id: true,
            name: true,
          },
        },
        type: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })
  }

  async types() {
    return db.walletType.findMany()
  }
}
export const wallet = new Wallet()
