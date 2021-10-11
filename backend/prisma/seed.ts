import { PrismaClient } from '@prisma/client'
import { hashSync } from 'bcryptjs'
import { date, internet, lorem, name as fakerName, random } from 'faker'
import { v4 as uuid } from 'uuid'

const prisma = new PrismaClient()

const ADMIN_NAME = 'Daniel Soares'
const ADMIN_EMAIL = 'daniel.soares@me.com'
const ADMIN_PASSWORD = '12345678'
const ADMIN_AVATAR = 'https://github.com/dsoaress.png'

const USERS_QUANTITY = 20
const USERS_PASSWORD = '12345678'

async function main() {
  console.log('Start seeding...')

  const hasAdminUser = await prisma.user.findUnique({
    where: {
      email: ADMIN_EMAIL
    }
  })

  if (!hasAdminUser) {
    await prisma.user.create({
      data: {
        name: ADMIN_NAME,
        email: ADMIN_EMAIL,
        password: hashSync(ADMIN_PASSWORD, 8),
        avatar: {
          create: {
            filename: ADMIN_AVATAR,
            filenameUrl: ADMIN_AVATAR,
            size: 2 * 1024 * 1024, // fake size 2MB
            type: 'jpeg' // fake type
          }
        },
        role: 'ADMIN'
      }
    })

    console.log('Admin created')
  }

  for (let i = 2; i <= USERS_QUANTITY; i++) {
    const data = []
    const firstName = fakerName.firstName()
    const lastName = fakerName.lastName()
    const name = `${firstName} ${lastName}`
    const email = internet.email(firstName, lastName).toLowerCase()
    const password = hashSync(USERS_PASSWORD, 8)
    const avatar = internet.avatar()
    const projects = random.arrayElement([1, 3, 5, 10])
    const createdAt = date.past()

    const emailExists = await prisma.user.findUnique({
      where: { email }
    })

    if (!emailExists) {
      for (let i = 1; i <= projects; i++) {
        const title = lorem.sentence()
        const description = lorem.sentences(8)
        const statusOptions = ['OPEN', 'CLOSED']
        const status = random.arrayElement(statusOptions)
        const createdAt = date.past()

        const project = {
          title,
          description,
          status,
          createdAt
        }

        data.push(project)
      }

      await prisma.user.create({
        data: {
          name,
          email,
          password,
          avatar: {
            create: {
              filename: uuid() + avatar,
              filenameUrl: avatar,
              size: 2 * 1024 * 1024, // fake size 2MB
              type: 'jpeg' // fake type
            }
          },
          projects: {
            createMany: { data }
          },
          createdAt
        }
      })

      console.log(`User created: ${i} of ${USERS_QUANTITY}`)
    }
  }
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
