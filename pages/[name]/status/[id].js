import prisma from 'lib/prisma';
import { getTweet } from '/lib/data';
import Layout from '/components/Layout';
import Tweet from '/components/Tweet';

export default function SingleTweet({ tweet }) {
  return (
    <Layout>
      <div className="w-full max-w-2xl p-8 bg-white shadow">
        <Tweet tweet={tweet} />
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
