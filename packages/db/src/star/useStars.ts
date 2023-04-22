import { prisma } from '../prisma'
import type { Star } from '@prisma/client'

export const useStars = async (): Promise<Star[]> => {
  return await prisma.star.findMany()
}
