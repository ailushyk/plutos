import { prisma } from './prisma'
export * as DBTypes from '@prisma/client'

const db = prisma

export { db, prisma }
