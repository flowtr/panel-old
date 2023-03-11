import { PrismaClient } from '@prisma/client'
import autoload from "@fastify/autoload";
import { faker } from '@faker-js/faker';
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import Fastify from 'fastify';

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const fastify = Fastify({
  logger: true
})


const prisma = new PrismaClient()

async function main() {
  // ... you will write your Prisma Client queries here
}

await main()
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
  });

fastify.get('/', async (request, reply) => {
  reply.type('application/json').code(200)
  return { hello: 'world' }
})

//auto-load, based on directory 
fastify.register(autoload,{
  dir: join(__dirname, 'routers')
})


fastify.listen({ port: 6942 }, (err, address) => {
  if (err) throw err
  fastify.log.info(`server listening on ${address}`)
});