import prisma from 'lib/prisma';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).end();
  }

  if (req.method === 'POST') {
    console.log('email', session.user.email, 'username', req.body.username);
    await prisma.user.update({
      where: { email: session.user.email },
      data: { username: req.body.username },
    });

    res.end();
  }
}
