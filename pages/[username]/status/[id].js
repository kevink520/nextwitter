import { useState } from 'react'
import prisma from 'lib/prisma'
import { getTweet } from '../../../../../../../../lib/data'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Layout from '../../../../../../../../components/Layout'
import Tweet from '../../../../../../../../components/Tweet'
import NewReply from 'components/NewReply'
import Tweets from 'components/Tweets'
import { getTweetReplies } from 'lib/data'

export default function SingleTweet ({ tweet, replies }) {
  const [allReplies, setAllReplies] = useState(replies)
  const router = useRouter()
  if (typeof window !== 'undefined' && tweet.parent) {
    router.push(`/${tweet.parentData.author.username}/status/${tweet.parent}`)
  }

  return (
    <Layout>
      <div className='w-full max-w-2xl p-8 bg-white dark:bg-slate-700 shadow'>
        <Tweet tweet={tweet} />
        <div className='pl-6'>
          <NewReply setAllReplies={setAllReplies} tweet={tweet} />
          <Tweets tweets={allReplies} setAllReplies={setAllReplies} />
        </div>
      </div>
    </Layout>
  )
}

export async function getServerSideProps ({ params }) {
  const { id } = params
  let tweet = await getTweet(prisma, id)
  tweet = JSON.parse(JSON.stringify(tweet))
  let replies = await getTweetReplies(prisma, id)
  replies = JSON.parse(JSON.stringify(replies))

  return {
    props: {
      tweet,
      replies
    }
  }
}
