import { NewExpenseSchema } from '@/schemas/expenses.schema'
import { z } from 'zod'

import { db } from '@/lib/db'

class Expense {
  async lastMonth({ userId }: { userId: string }) {
    return db.expense.findMany({
      where: {
        user: {
          id: userId,
        },
        dueDate: {
          gte: new Date(new Date().setMonth(new Date().getMonth() - 1)),
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
  async addExpense(expense: z.infer<typeof NewExpenseSchema>, userId: string) {
    return db.expense.create({
      data: {
        user: {
          connect: {
            id: userId,
          },
        },
        title: expense.title,
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
      },
    })
  }
}

export const expense = new Expense()
