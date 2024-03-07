import { Client } from '@planetscale/database'
import { drizzle } from 'drizzle-orm/planetscale-serverless'

import * as transactions from '@/db/schema/transactions'
import {
  accounts,
  resetPasswordToken,
  users,
  verificationTokens,
} from '@/db/schema/users'

const client = new Client({
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
})

export const db = drizzle(client, {
  schema: {
    accounts,
    users,
    verificationTokens,
    resetPasswordToken,
    ...transactions,
  },
})
