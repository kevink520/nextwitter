import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Layout from 'components/Layout';
import NewTweet from 'components/NewTweet';
import Tweets from 'components/Tweets';
import prisma from 'lib/prisma';
import { getTweets } from 'lib/data';

export default function Home({ tweets }) {
  const [allTweets, setAllTweets] = useState(tweets);
  const { data: session, status } = useSession();
  const loading = status === 'loading';
  const router = useRouter();

  if (loading) {
    return null;
  }

  if (session && !session.user.name) {
    return router.push('/setup/');
  }

  return (
    <Layout>
      <NewTweet setAllTweets={setAllTweets} />
      <Tweets tweets={allTweets} shadow />
    </Layout>
  );
}

export async function getServerSideProps() {
  let tweets = await getTweets(prisma);
  tweets = JSON.parse(JSON.stringify(tweets));

  return {
    props: {
      tweets,
    },
  };
}
