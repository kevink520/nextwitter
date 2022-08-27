export async function getTweets(prisma) {
  return await prisma.tweet.findMany({
    where: {},
    orderBy: [{ id: 'desc' }],
  });
}

