import { sql } from 'drizzle-orm'
import {
  AnyMySqlColumn,
  datetime,
  decimal,
  index,
  int,
  mysqlSchema,
  mysqlTable,
  primaryKey,
  text,
  unique,
  varchar,
} from 'drizzle-orm/mysql-core'

export const account = mysqlTable(
  'Account',
  {
    id: varchar('id', { length: 191 }).notNull(),
    userId: varchar('userId', { length: 191 }).notNull(),
    type: varchar('type', { length: 191 }).notNull(),
    provider: varchar('provider', { length: 191 }).notNull(),
    providerAccountId: varchar('providerAccountId', { length: 191 }).notNull(),
    refreshToken: text('refresh_token'),
    accessToken: text('access_token'),
    expiresAt: int('expires_at'),
    tokenType: varchar('token_type', { length: 191 }),
    scope: varchar('scope', { length: 191 }),
    idToken: text('id_token'),
    sessionState: varchar('session_state', { length: 191 }),
  },
  (table) => {
    return {
      userIdIdx: index('Account_userId_idx').on(table.userId),
      accountId: primaryKey({ columns: [table.id], name: 'Account_id' }),
      accountProviderProviderAccountIdKey: unique(
        'Account_provider_providerAccountId_key',
      ).on(table.provider, table.providerAccountId),
    }
  },
)

export const resetPasswordToken = mysqlTable(
  'ResetPasswordToken',
  {
    id: varchar('id', { length: 191 }).notNull(),
    email: varchar('email', { length: 191 }).notNull(),
    token: varchar('token', { length: 191 }).notNull(),
    expires: datetime('expires', { mode: 'string', fsp: 3 }).notNull(),
    createdAt: datetime('createdAt', { mode: 'string', fsp: 3 })
      .default(sql`CURRENT_TIMESTAMP(3)`)
      .notNull(),
    updatedAt: datetime('updatedAt', { mode: 'string', fsp: 3 }).notNull(),
  },
  (table) => {
    return {
      resetPasswordTokenId: primaryKey({
        columns: [table.id],
        name: 'ResetPasswordToken_id',
      }),
      resetPasswordTokenEmailTokenKey: unique(
        'ResetPasswordToken_email_token_key',
      ).on(table.email, table.token),
    }
  },
)

export const user = mysqlTable(
  'User',
  {
    id: varchar('id', { length: 191 }).notNull(),
    createdAt: datetime('createdAt', { mode: 'string', fsp: 3 })
      .default(sql`CURRENT_TIMESTAMP(3)`)
      .notNull(),
    updatedAt: datetime('updatedAt', { mode: 'string', fsp: 3 }).notNull(),
    email: varchar('email', { length: 191 }),
    name: varchar('name', { length: 191 }),
    emailVerified: datetime('emailVerified', { mode: 'string', fsp: 3 }),
    image: varchar('image', { length: 191 }),
    password: varchar('password', { length: 191 }),
  },
  (table) => {
    return {
      userId: primaryKey({ columns: [table.id], name: 'User_id' }),
      userEmailKey: unique('User_email_key').on(table.email),
    }
  },
)

export const verificationToken = mysqlTable(
  'VerificationToken',
  {
    id: varchar('id', { length: 191 }).notNull(),
    email: varchar('email', { length: 191 }).notNull(),
    token: varchar('token', { length: 191 }).notNull(),
    expires: datetime('expires', { mode: 'string', fsp: 3 }).notNull(),
    createdAt: datetime('createdAt', { mode: 'string', fsp: 3 })
      .default(sql`CURRENT_TIMESTAMP(3)`)
      .notNull(),
    updatedAt: datetime('updatedAt', { mode: 'string', fsp: 3 }).notNull(),
  },
  (table) => {
    return {
      verificationTokenId: primaryKey({
        columns: [table.id],
        name: 'VerificationToken_id',
      }),
    }
  },
)
