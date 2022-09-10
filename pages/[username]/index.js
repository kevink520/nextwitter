import { useState } from 'react';
import prisma from 'lib/prisma';
import { getUserTweets } from 'lib/data';
import Layout from 'components/Layout';
import Tweets from 'components/Tweets';
import LoadMore from 'components/LoadMore';
import { getUserByUsername } from 'lib/data';

export default function UserProfile({ username, initialTweets }) {
  const [tweets, setTweets] = useState(initialTweets);

  return (
    <Layout>
      <div className="w-full max-w-2xl p-8 bg-white dark:bg-slate-700 shadow">
        <h1 className="text-2xl dark:text-white">Profile of {username}</h1>
        <Tweets setTweets={setTweets} tweets={tweets} />
        <LoadMore setTweets={setTweets} tweets={tweets} username={username} />
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ params }) {
  const { username } = params;
  const user = await getUserByUsername(prisma, username);
  if (!user) {
    return {
      notFound: true,
    };
  }

  let initialTweets = await getUserTweets(prisma, username, 10, null);
  initialTweets = JSON.parse(JSON.stringify(initialTweets));

  return {
    props: {
      username,
      initialTweets,
    },
  };
}
