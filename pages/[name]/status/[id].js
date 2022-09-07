import prisma from 'lib/prisma';
import { getTweet } from '/lib/data';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Layout from '/components/Layout';
import Tweet from '/components/Tweet';

export default function SingleTweet({ tweet }) {
  const { data: session } = useSession();
  const router = useRouter();
  return (
    <Layout>
      <div className="w-full max-w-2xl p-8 bg-white shadow">
        <Tweet tweet={tweet} />
        {session && session.user.email === tweet.author.email && (
          <button
            className="border-b-2 border-blue-500 ml-14 bg-transparent text-sm text-blue-500 hover:opacity-75 pt-2"
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
                router.push('/home/');
              }
            }}
          >
            Delete
          </button>
        )}
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ params }) {
  const { id } = params;
  let tweet = await getTweet(prisma, id);
  tweet = JSON.parse(JSON.stringify(tweet));

  return {
    props: {
      tweet,
    },
  };
}
