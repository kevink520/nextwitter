import prisma from 'lib/prisma';
import { getSession } from 'next-auth/react';
import { getTweets } from 'lib/data';

export default async function handler(req, res) {
  if (!['POST'/*, 'DELETE'*/].includes(req.method)) {
    return res.status(501).end();
  }

  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ message: 'Not logged in' });
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!user) {
    return res.status(401).json({ message: 'User not found' });
  }
  
  if (req.method === 'POST') {
    const tweet = await prisma.tweet.create({
      data: {
        content: req.body.content,
        author: {
          connect: { id: user.id },
        },
      },
      include: {
        author: true,
      },
    });

    return res.json({ tweet });
  }
}
