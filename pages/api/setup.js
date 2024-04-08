import prisma from 'lib/prisma'
import { authOptions } from 'pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth/next'

export default async function handler (req, res) {
  const session = await getServerSession(req, res, authOptions)
  if (!session) {
    return res.status(401).end()
  }

  if (req.method === 'POST') {
    await prisma.user.update({
      where: { email: session.user.email },
      data: { username: req.body.username }
    })

    res.end()
  }
}
