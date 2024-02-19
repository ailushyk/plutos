import { NewExpenseSchema } from '@/schemas/expenses.schema'
import { z } from 'zod'

import { getUser } from '@/lib/auth/user.server'
import { db } from '@/lib/db'

class Expense {
  async all() {
    const user = await getUser()
    return db.expense.findMany({
      where: {
        user: {
          id: user.id,
        },
      },
      orderBy: {
        dueDate: 'desc',
      },
    })
  }
  async addExpense(expense: z.infer<typeof NewExpenseSchema>) {
    const user = await getUser()
    return db.expense.create({
      data: {
        user: {
          connect: {
            id: user.id,
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
