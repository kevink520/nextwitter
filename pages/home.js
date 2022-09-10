import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Layout from 'components/Layout';
import NewTweet from 'components/NewTweet';
import Tweets from 'components/Tweets';
import prisma from 'lib/prisma';
import { getTweets } from 'lib/data';
import LoadMore from 'components/LoadMore';

export default function Home({ initialTweets }) {
  const [tweets, setTweets] = useState(initialTweets);
  const { data: session, status } = useSession();
  const loading = status === 'loading';
  const router = useRouter();

  if (loading) {
    return null;
  }

  if (session && !session.user.username) {
    router.push('/setup');
    return;
  }

  return (
    <Layout>
      <NewTweet setTweets={setTweets} />
      <Tweets tweets={tweets} setTweets={setTweets} shadow />
      <LoadMore setTweets={setTweets} tweets={tweets} />
    </Layout>
  );
}

export async function getServerSideProps() {
  let initialTweets = await getTweets(prisma, 10, null);
  initialTweets = JSON.parse(JSON.stringify(initialTweets));

  return {
    props: {
      initialTweets,
    },
  };
}
