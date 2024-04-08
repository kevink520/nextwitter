import prisma from 'lib/prisma'
import { authOptions } from 'pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth/next'

export default async function handler (req, res) {
  if (!['POST', 'DELETE'].includes(req.method)) {
    return res.status(501).end()
  }

  const session = await getServerSession(req, res, authOptions)
  if (!session) {
    return res.status(401).json({ message: 'Not logged in' })
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email
    }
  })

  if (!user) {
    return res.status(401).json({ message: 'User not found' })
  }

  if (req.method === 'POST') {
    const parent = req.body.parent || null
    const tweet = await prisma.tweet.create({
      data: {
        parent,
        content: req.body.content,
        author: {
          connect: { id: user.id }
        }
      },
      include: {
        author: true,
        likes: true
      }
    })

    if (parent) {
      tweet.parentData = await prisma.tweet.findUnique({
        where: {
          id: parent
        },
        include: {
          author: true
        }
      })
    }

    return res.json({ tweet })
  }

  if (req.method === 'DELETE') {
    const id = req.body.id
    const tweet = await prisma.tweet.findUnique({
      where: {
        id
      },
      include: {
        author: true
      }
    })

    if (tweet.author.id !== user.id) {
      return res.status(401).end()
    }

    await prisma.tweet.delete({
      where: { id }
    })

    return res.status(200).end()
  }
}
