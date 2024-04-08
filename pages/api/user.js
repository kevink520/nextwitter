import prisma from 'lib/prisma'
import { authOptions } from 'pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth/next'
import { getUserByUsername } from 'lib/data'

export default async function handler (req, res) {
  if (req.method !== 'GET') {
    return res.status(501).end()
  }

  const session = await getServerSession(req, res, authOptions)
  if (!session) {
    return res.status(401).json({ message: 'Not logged in' })
  }

  const username = req.query.username
  if (!username) {
    return res.status(400).json({ message: 'Missing username' })
  }

  const user = await getUserByUsername(prisma, username)
  res.json({ usernameExists: !!user })
}
