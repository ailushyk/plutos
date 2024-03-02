import { cache } from 'react'
import { ExpenseSchemaForm } from '@/schemas/expenses.schema'
import { z } from 'zod'

import { db } from '@/lib/db'

class Expense {
  async lastMonth({ userId }: { userId: string }) {
    const currentDate = new Date()
    const firstDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1,
    )

    return db.expense.findMany({
      where: {
        user: {
          id: userId,
        },
        dueDate: {
          gte: firstDayOfMonth,
        },
      },
      select: {
        id: true,
        dueDate: true,
        title: true,
        amount: true,
        currency: {
          select: {
            name: true,
            symbol: true,
          },
        },
        wallet: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        dueDate: 'desc',
      },
    })
  }
  async allByDay({ userId }: { userId: string }) {
    return db.expense.groupBy({
      by: ['dueDate'],
      where: {
        user: {
          id: userId,
        },
      },
      _count: {
        id: true,
      },
      _sum: {
        amount: true,
      },
      orderBy: {
        dueDate: 'desc',
      },
    })
  }
  async all({ userId }: { userId: string }) {
    return db.expense.findMany({
      where: {
        user: {
          id: userId,
        },
      },
      select: {
        id: true,
        dueDate: true,
        title: true,
        amount: true,
        currency: {
          select: {
            name: true,
            symbol: true,
          },
        },
        wallet: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        dueDate: 'desc',
      },
    })
  }
  async createOrUpdate(
    expense: z.infer<typeof ExpenseSchemaForm>,
    userId: string,
  ) {
    const data = {
      user: {
        connect: {
          id: userId,
        },
      },
      title: expense.title,
      note: expense.note,
      wallet: {
        connect: {
          id: expense.walletId,
        },
      },
      amount: expense.amount,
      currency: {
        connect: {
          id: expense.currencyId,
        },
      },
      dueDate: expense.dueDate,
    }
    return db.expense.upsert({
      where: {
        id: expense.id || '',
      },
      create: data,
      update: data,
    })
  }
  getById = cache(async (id: string, userId: string) => {
    return db.expense.findFirst({
      where: {
        id,
        user: {
          id: userId,
        },
      },
      select: {
        id: true,
        dueDate: true,
        title: true,
        note: true,
        amount: true,
        currency: {
          select: {
            id: true,
            name: true,
            symbol: true,
          },
        },
        wallet: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })
  })

  async delete(id: string, userId: string) {
    return db.expense.delete({
      where: {
        id: id,
        user: {
          id: userId,
        },
      },
    })
  }
}

export const expense = new Expense()
