export async function getTweets(prisma, take) {
  return await prisma.tweet.findMany({
    where: {},
    orderBy: [{ id: 'desc' }],
    include: {
      author: true,
    },
    take,
  });
}

export async function getUserTweets(prisma, name) {
  return await prisma.tweet.findMany({
    where: {
      author: {
        name,
      },
    },
    orderBy: [{ id: 'desc' }],
    include: {
      author: true,
    },
  });
}

export async function getTweet(prisma, id) {
  return await prisma.tweet.findUnique({
    where: {
      id: parseInt(id),
    },
    include: {
      author: true,
    },
  });
}
