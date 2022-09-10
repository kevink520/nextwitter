export async function getTweets(prisma, take = 10, cursor = null) {
  const options = {
    where: { parent: null },
    orderBy: [{ id: 'desc' }],
    include: {
      author: true,
      likes: true,
    },
    take: take || 10,
  };

  if (cursor) {
    options.cursor = { id: cursor };
    options.skip = 1;
  }

  const tweets = await prisma.tweet.findMany(options);
  const tweetsWithReplies = [];
  for (const tweet of tweets) {
    tweet.repliesCount = await prisma.tweet.count({
      where: { parent: tweet.id },
    });

    tweetsWithReplies.push(tweet);
  }

  console.log(tweetsWithReplies);

  return tweetsWithReplies;
}

export async function getUserTweets(
  prisma,
  username,
  take = 10,
  cursor = null
) {
  const options = {
    where: {
      parent: null,
      author: {
        username,
      },
    },
    orderBy: [{ id: 'desc' }],
    include: {
      author: true,
      likes: true,
    },
    take,
  };

  if (cursor) {
    options.cursor = { id: cursor };
    options.skip = 1;
  }

  const userTweets = await prisma.tweet.findMany(options);
  const userTweetsWithReplies = [];
  for (const tweet of userTweets) {
    tweet.repliesCount = await prisma.tweet.count({
      where: { parent: tweet.id },
    });

    userTweetsWithReplies.push(tweet);
  }

  return userTweetsWithReplies;
}

export async function getTweet(prisma, id) {
  const tweet = await prisma.tweet.findUnique({
    where: {
      id: parseInt(id),
    },
    include: {
      author: true,
      likes: true,
    },
  });

  if (tweet.parent)
    [
      (tweet.parentData = await prisma.tweet.findUnique({
        where: {
          id: tweet.parent,
        },
        include: {
          author: true,
        },
      })),
    ];

  return tweet;
}

export async function getTweetReplies(prisma, parent) {
  return await prisma.tweet.findMany({
    where: {
      parent: parseInt(parent),
    },
    orderBy: [{ id: 'desc' }],
    include: {
      author: true,
    },
  });
}

export async function getUserByUsername(prisma, username) {
  return await prisma.user.findUnique({
    where: {
      username,
    },
  });
}
