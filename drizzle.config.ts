import * as dotenv from 'dotenv'
import { Config, defineConfig } from 'drizzle-kit'

dotenv.config()

export default defineConfig({
  schema: './src/db/schema',
  driver: 'mysql2',
  dbCredentials: {
    // host: process.env['DATABASE_HOST'] as string,
    // user: process.env['DATABASE_USERNAME'] as string,
    // password: process.env['DATABASE_PASSWORD'] as string,
    // database: process.env['DATABASE_NAME'] as string,
    uri: process.env['DRIZZLE_KIT_DATABASE_URL'] as string,
  },
  verbose: true,
  strict: true,
}) satisfies Config
