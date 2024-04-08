import prisma from 'lib/prisma'
import { authOptions } from 'pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth/next'

export default async function handler (req, res) {
  if (req.method !== 'GET') {
    return res.status(501).end()
  }

  const session = await getServerSession(req, res, authOptions)
  if (!session || !session.user) {
    return res.status(401).json({ message: 'Not logged in' })
  }

  const cursor = parseInt(req.query.cursor)
  const username = req.query.username
  const options = {
    where: {
      parent: null
    },
    orderBy: [{ id: 'desc' }],
    include: {
      author: true,
      likes: true
    },
    take: parseInt(req.query.take) || 10
  }

  if (cursor) {
    options.cursor = { id: cursor }
    options.skip = 1
  }

  if (username) {
    options.where.author = {
      username
    }
  }

  const tweets = await prisma.tweet.findMany(options)
  const tweetsWithReplies = []
  for (const tweet of tweets) {
    tweet.repliesCount = await prisma.tweet.count({
      where: { parent: tweet.id }
    })

    tweetsWithReplies.push(tweet)
  }

  return res.json({ tweets: tweetsWithReplies })
}
