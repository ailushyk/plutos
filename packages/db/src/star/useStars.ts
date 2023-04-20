import { prisma } from '../prisma'
import type { Star } from '@prisma/client'

export const useStars = async (): Promise<Star[]> => {
  const stars = await prisma.star.findMany()

  console.log(stars)
  return stars
}
