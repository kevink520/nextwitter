import { useState } from 'react';
import prisma from 'lib/prisma';
import { getTweet } from '/lib/data';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Layout from '/components/Layout';
import Tweet from '/components/Tweet';
import NewReply from 'components/NewReply';
import Tweets from 'components/Tweets';
import { getTweetReplies } from 'lib/data';

export default function SingleTweet({ tweet, replies }) {
  const [allReplies, setAllReplies] = useState(replies);
  const { data: session } = useSession();
  const router = useRouter();
  if (typeof window !== 'undefined' && tweet.parent) {
    router.push(`/${tweet.parentData.author.username}/status/${tweet.parent}`);
  }

  return (
    <Layout>
      <div className="w-full max-w-2xl p-8 bg-white dark:bg-slate-700 shadow">
        <Tweet tweet={tweet} />
        {session && session.user.email === tweet.author.email && (
          <button
            className="border-b-2 border-blue-500 ml-14 bg-transparent text-sm text-blue-500 dark:text-slate-400 hover:opacity-75 pt-2"
            onClick={async () => {
              if (!confirm('Are you sure you want to delete this tweet?')) {
                return;
              }

              const res = await fetch('/api/tweet/', {
                body: JSON.stringify({
                  id: tweet.id,
                }),
                headers: {
                  'Content-Type': 'application/json',
                },
                method: 'DELETE',
              });

              if (res.status === 401) {
                alert('Unauthorized');
              }

              if (res.status === 200) {
                router.push('/home');
              }
            }}
          >
            Delete
          </button>
        )}
        <div className="pl-6">
          <NewReply setAllReplies={setAllReplies} tweet={tweet} />
          <Tweets tweets={allReplies} />
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ params }) {
  const { id } = params;
  let tweet = await getTweet(prisma, id);
  tweet = JSON.parse(JSON.stringify(tweet));
  let replies = await getTweetReplies(prisma, id);
  replies = JSON.parse(JSON.stringify(replies));

  return {
    props: {
      tweet,
      replies,
    },
  };
}
