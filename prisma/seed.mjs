import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database')

  //  Seed currency
  await prisma.currency.upsert({
    where: { name: 'USD' },
    update: {
      symbol: '$'
    },
    create: {
      name: 'USD',
      symbol: '$'
    }
  })
  await prisma.currency.upsert({
    where: { name: 'PLN' },
    update: {
      symbol: 'zł'
    },
    create: {
      name: 'PLN',
      symbol: 'zł'
    }
  })
  console.log('Finish Seeded currency')

  await prisma.walletType.upsert({
    where: {
      name: 'Cash'
    },
    update: {
    },
    create: {
      name: 'Cash'
    }
  })
  console.log('Finish Seeded walletType')
}

main().then(async () => {
  await prisma.$disconnect()
}).catch(async (e) => {
  console.error(e)
  await prisma.$disconnect()
  process.exit(1)
})
