import { getSession } from 'next-auth/react';
import prisma from 'lib/prisma';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(501).end();
  }

  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ message: 'Not logged in' });
  }

  const { tweetId, userId } = req.body;
  if (!tweetId || !userId) {
    return res.status(400).json({ message: 'Missing tweetId or userId' });
  }

  try {
    const tweet = await prisma.tweet.findUnique({
      where: {
        id: tweetId,
      },
      include: {
        likes: true,
      },
    });

    const likes = tweet?.likes?.map((user) => ({ id: user.id })) || [];

    await prisma.tweet.update({
      where: {
        id: tweetId,
      },
      data: {
        likes: {
          set: [{ id: userId }, ...likes],
        },
      },
    });

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        likedTweets: true,
      },
    });

    const likedTweets = user?.likedTweets?.map((tweet) => ({ id: tweet.id })) || [];

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        likedTweets: {
          set: [{ id: tweetId }, ...likedTweets],
        },
      },
    });

    res.status(200).end();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
