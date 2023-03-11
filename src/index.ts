import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient()

async function main() {
  // ... you will write your Prisma Client queries here
}

main()
  .then(async () => {
    for (let i = 0; i < 10; i++) {
      await prisma.user.create({
        data: {
            email: faker.internet.email(),
            username: faker.internet.userName(),
        },
      })
    }
    const users = await prisma.user.findMany()
    console.log(users);
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })