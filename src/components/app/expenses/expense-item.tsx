import React from 'react'
import { Decimal } from '@prisma/client/runtime/binary'

import { formatCurrencyFromDecimal } from '@/lib/formatter/currency'
import { formatDate } from '@/lib/formatter/dates'
import { getAvatarFallbackTitle } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export function ExpenseItem({
  expense,
}: {
  expense: {
    id: string
    title: string
    amount: Decimal
    dueDate: Date
    currency: {
      name: string
      symbol: string
    }
    wallet: {
      name: string
    }
  }
}) {
  return (
    <div className="flex items-center">
      <Avatar className="h-9 w-9">
        <AvatarImage src="" alt="Wallet image" />
        <AvatarFallback>{getAvatarFallbackTitle(expense.title)}</AvatarFallback>
      </Avatar>
      <div className="ml-4 space-y-1">
        <div className="font-medium leading-none">{expense.title}</div>
        <div className="text-sm text-muted-foreground">
          {formatDate(expense.dueDate)}
        </div>
      </div>
      <div className="ml-auto flex flex-col items-end font-medium">
        <div>
          -{formatCurrencyFromDecimal(expense.amount, expense.currency.name)}{' '}
          {expense.currency.symbol}
        </div>
      </div>
    </div>
  )
}
