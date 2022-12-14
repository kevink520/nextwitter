import prisma from 'lib/prisma';
import { getSession } from 'next-auth/react';
import { getUserByUsername } from 'lib/data';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(501).end();
  }

  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ message: 'Not logged in' });
  }

  const username = req.query.username;
  if (!username) {
    return res.status(400).json({ message: 'Missing username' });
  }

  const user = await getUserByUsername(prisma, username);
  res.json({ usernameExists: !!user });
}
