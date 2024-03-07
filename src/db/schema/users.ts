import type { AdapterAccount } from '@auth/core/adapters'
import { sql } from 'drizzle-orm'
import {
  index,
  int,
  mysqlTable,
  text,
  timestamp,
  unique,
  varchar,
} from 'drizzle-orm/mysql-core'

export const users = mysqlTable('user', {
  id: varchar('id', { length: 255 })
    .default(sql`(uuid())`)
    .primaryKey(),
  name: varchar('name', { length: 255 }),
  email: varchar('email', { length: 255 }).notNull(),
  password: varchar('password', { length: 255 }),
  emailVerified: timestamp('emailVerified', {
    mode: 'date',
    fsp: 3,
  }),
  image: varchar('image', { length: 255 }),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow().onUpdateNow(),
})

export const accounts = mysqlTable(
  'account',
  {
    id: varchar('id', { length: 255 })
      .default(sql`(uuid())`)
      .primaryKey(),
    userId: varchar('userId', { length: 255 }).notNull(),
    type: varchar('type', { length: 255 })
      .$type<AdapterAccount['type']>()
      .notNull(),
    provider: varchar('provider', { length: 255 }).notNull(),
    providerAccountId: varchar('providerAccountId', { length: 255 }).notNull(),
    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    expires_at: int('expires_at'),
    token_type: varchar('token_type', { length: 255 }),
    scope: varchar('scope', { length: 255 }),
    id_token: text('id_token'),
    session_state: varchar('session_state', { length: 255 }),
    createdAt: timestamp('createdAt').defaultNow(),
    updatedAt: timestamp('updatedAt').defaultNow().onUpdateNow(),
  },
  (table) => ({
    userIdIdx: index('account_userId_idx').on(table.userId),
    accountProviderProviderAccountIdKey: unique(
      'account_provider_providerAccountId_key',
    ).on(table.provider, table.providerAccountId),
  }),
)

// export const sessions = mysqlTable(
//   'session',
//   {
//     id: varchar('id', { length: 255 })
//       .default(sql`(uuid())`)
//       .primaryKey(),
//     sessionToken: varchar('sessionToken', { length: 255 }).notNull(),
//     userId: varchar('userId', { length: 255 }).notNull(),
//     expires: timestamp('expires', { mode: 'date' }).notNull(),
//     createdAt: timestamp('createdAt').defaultNow(),
//     updatedAt: timestamp('updatedAt').defaultNow().onUpdateNow(),
//   },
//   (table) => ({
//     sessionTokenIdx: index('session_sessionToken_idx').on(table.sessionToken),
//     userIdIdx: index('session_userId_idx').on(table.userId),
//   }),
// )

export const verificationTokens = mysqlTable('verificationToken', {
  id: varchar('id', { length: 255 })
    .default(sql`(uuid())`)
    .primaryKey(),
  identifier: varchar('identifier', { length: 255 }).notNull(),
  token: varchar('token', { length: 255 }).notNull(),
  expires: timestamp('expires', { mode: 'date' }).notNull(),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow().onUpdateNow(),
})

export const resetPasswordToken = mysqlTable(
  'resetPasswordToken',
  {
    id: varchar('id', { length: 255 })
      .default(sql`(uuid())`)
      .primaryKey(),
    email: varchar('email', { length: 255 }).notNull(),
    token: varchar('token', { length: 255 }).notNull(),
    expires: timestamp('expires', { mode: 'date' }).notNull(),
    createdAt: timestamp('createdAt').defaultNow(),
    updatedAt: timestamp('updatedAt').defaultNow().onUpdateNow(),
  },
  (table) => {
    return {
      resetPasswordTokenEmailTokenKey: unique(
        'ResetPasswordToken_email_token_key',
      ).on(table.email, table.token),
    }
  },
)
