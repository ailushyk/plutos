import { sql } from 'drizzle-orm'
import {
  datetime,
  decimal,
  index,
  int,
  mysqlTable,
  primaryKey,
  unique,
  varchar,
} from 'drizzle-orm/mysql-core'

export const currency = mysqlTable(
  'Currency',
  {
    id: varchar('id', { length: 255 }).notNull(),
    name: varchar('name', { length: 255 }).notNull(),
    symbol: varchar('symbol', { length: 255 }).notNull(),
    createdAt: datetime('createdAt', { mode: 'string', fsp: 3 })
      .default(sql`CURRENT_TIMESTAMP(3)`)
      .notNull(),
    updatedAt: datetime('updatedAt', { mode: 'string', fsp: 3 }).notNull(),
  },
  (table) => {
    return {
      nameIdx: index('Currency_name_idx').on(table.name),
      currencyId: primaryKey({ columns: [table.id], name: 'Currency_id' }),
      currencyNameKey: unique('Currency_name_key').on(table.name),
    }
  },
)

export const walletType = mysqlTable(
  'WalletType',
  {
    id: varchar('id', { length: 255 }).notNull(),
    name: varchar('name', { length: 255 }).notNull(),
    createdAt: datetime('createdAt', { mode: 'string', fsp: 3 })
      .default(sql`CURRENT_TIMESTAMP(3)`)
      .notNull(),
    updatedAt: datetime('updatedAt', { mode: 'string', fsp: 3 })
      .default(sql`CURRENT_TIMESTAMP(3)`)
      .notNull(),
  },
  (table) => {
    return {
      walletTypeId: primaryKey({ columns: [table.id], name: 'WalletType_id' }),
      walletTypeNameKey: unique('WalletType_name_key').on(table.name),
    }
  },
)

export const wallet = mysqlTable(
  'Wallet',
  {
    id: varchar('id', { length: 255 })
      .default(sql`(uuid())`)
      .notNull(),
    userId: varchar('userId', { length: 255 }).notNull(),
    name: varchar('name', { length: 255 }).notNull(),
    typeId: varchar('typeId', { length: 255 }).notNull(),
    balance: int('balance').default(0).notNull(),
    createdAt: datetime('createdAt', { mode: 'string', fsp: 3 })
      .default(sql`CURRENT_TIMESTAMP(3)`)
      .notNull(),
    updatedAt: datetime('updatedAt', { mode: 'string', fsp: 3 })
      .default(sql`CURRENT_TIMESTAMP(3)`)
      .notNull(),
    currencyId: varchar('currencyId', { length: 255 }).notNull(),
  },
  (table) => {
    return {
      typeIdIdx: index('Wallet_typeId_idx').on(table.typeId),
      userIdIdx: index('Wallet_userId_idx').on(table.userId),
      currencyIdIdx: index('Wallet_currencyId_idx').on(table.currencyId),
      walletId: primaryKey({ columns: [table.id], name: 'Wallet_id' }),
    }
  },
)

export const expense = mysqlTable(
  'Expense',
  {
    id: varchar('id', { length: 255 }).notNull(),
    userId: varchar('userId', { length: 255 }).notNull(),
    title: varchar('title', { length: 255 }).notNull(),
    note: varchar('note', { length: 255 }),
    amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
    createdAt: datetime('createdAt', { mode: 'string', fsp: 3 })
      .default(sql`CURRENT_TIMESTAMP(3)`)
      .notNull(),
    updatedAt: datetime('updatedAt', { mode: 'string', fsp: 3 }).notNull(),
    currencyId: varchar('currencyId', { length: 255 }).notNull(),
    walletId: varchar('walletId', { length: 255 }).notNull(),
    dueDate: datetime('dueDate', { mode: 'string' }).notNull(),
    category: varchar('category', { length: 255 }),
  },
  (table) => {
    return {
      userIdIdx: index('Expense_userId_idx').on(table.userId),
      walletIdIdx: index('Expense_walletId_idx').on(table.walletId),
      currencyIdIdx: index('Expense_currencyId_idx').on(table.currencyId),
      expenseId: primaryKey({ columns: [table.id], name: 'Expense_id' }),
    }
  },
)
