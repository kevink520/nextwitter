import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import prisma from 'lib/prisma';
import { getTweets } from 'lib/data';
import Layout from 'components/Layout';
import Tweets from 'components/Tweets';

export default function Home({ tweets }) {
  const router = useRouter();
  const { data: session, status } = useSession();
  if (status === 'loading') {
    return null;
  }

  if (session) {
    router.push('/home/');
  }

  return (
    <Layout>
      <div className="w-full max-w-2xl mb-8">
        <Tweets tweets={tweets} shadow />
      </div>
      <div className="w-full max-w-2xl p-8 bg-white shadow text-center">
        <h2 className="mb-6 text-2xl">Join the conversation!</h2>
        <a
          className="px-8 py-2 rounded-full bg-blue-900 text-white uppercase tracking-widest hover:opacity-90 transition duration-300"
          href="/api/auth/signin/"
        >
          Login
        </a>
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const take = 3;
  let tweets = await getTweets(prisma, take);
  tweets = JSON.parse(JSON.stringify(tweets));

  return {
    props: {
      tweets,
    },
  };
}
