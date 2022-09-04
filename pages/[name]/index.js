import prisma from 'lib/prisma';
import { getUserTweets } from 'lib/data';
import Layout from 'components/Layout';
import Tweets from 'components/Tweets';

export default function UserProfile({ name, tweets }) {
  return (
    <Layout>
      <div className="w-full max-w-2xl p-8 bg-white shadow">
        <h1 className="text-2xl">Profile of {name}</h1>
        <Tweets tweets={tweets} />
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ params }) {
  const { name } = params;
  let tweets = await getUserTweets(prisma, name);
  tweets = JSON.parse(JSON.stringify(tweets));

  return {
    props: {
      name,
      tweets,
    },
  };
}
