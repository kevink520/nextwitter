import prisma from 'lib/prisma'
import { faker } from '@faker-js/faker'
import { authOptions } from 'pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth/next'

export default async function handler (req, res) {
  const session = await getServerSession(req, res, authOptions)
  if (req.method !== 'POST') {
    return res.end()
  }

  if (req.body.task === 'clean_database') {
    await prisma.tweet.deleteMany({})
    await prisma.user.deleteMany({
      where: {
        NOT: {
          email: {
            in: [session.user.email]
          }
        }
      }
    })
  }

  if (req.body.task === 'generate_users_and_tweets') {
    for (let count = 0; count < 5; count++) {
      await prisma.user.create({
        data: {
          username: faker.internet.userName().toLowerCase(),
          email: faker.internet.email().toLowerCase(),
          image: faker.internet.avatar()
        }
      })
    }

    const users = await prisma.user.findMany({})
    for (const user of users) {
      await prisma.tweet.create({
        data: {
          content: faker.hacker.phrase(),
          author: {
            connect: {
              id: user.id
            }
          }
        }
      })
    }
  }

  if (req.body.task === 'generate_one_tweet') {
    const users = await prisma.user.findMany({})
    const randomIndex = Math.floor(Math.random() * users.length)
    const user = users[randomIndex]
    await prisma.tweet.create({
      data: {
        content: faker.hacker.phrase(),
        author: {
          connect: {
            id: user.id
          }
        }
      }
    })
  }

  res.end()
}
