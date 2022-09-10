import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import timeago from 'lib/timeago';
import { useSession } from 'next-auth/react';
import DeleteButton from 'components/DeleteButton';
import { FaComments, FaHeart } from 'react-icons/fa';

export default function Tweet({ setTweets, tweet, setAllReplies }) {
  const [likesCount, setLikesCount] = useState(tweet.likes?.length || 0);
  const { data: session } = useSession();
  const { asPath } = useRouter();

  useEffect(() => {
    setLikesCount(tweet.likes?.length || 0);
  }, [tweet]);

  return (
    <div className="mb-8">
      <div className="flex items-start">
        <div className="relative z-10 pb-3 bg-white dark:bg-slate-700">
          {tweet.author.image ? (
            <Image
              src={tweet.author.image}
              alt={tweet.author.username}
              width={40}
              height={40}
              className="rounded-full"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-blue-100" />
          )}
        </div>
        <div className={`flex-1 flex-col relative ml-3${!tweet.parent ? ' mb-1' : ''}`}>
          <Link href={`/${tweet.author.username}/`}>
            <a className={`-mt-1 text-xl leading-normal dark:text-slate-400${!session ? ' pointer-events-none' : ''}`}>
              {tweet.author.username}
            </a>
          </Link>
          <p className="mb-2 text-gray-500 dark:text-slate-500 text-sm">
            {timeago.format(new Date(tweet.createdAt))}
          </p>
          {(tweet.parent || !session) ? (
            <span className="dark:text-slate-400">{tweet.content}</span>
          ) : (
            <Link href={`/${tweet.author.username}/status/${tweet.id}`}>
              <a className="dark:text-slate-400">{tweet.content}</a>
            </Link>
          )}
          <div className="flex items-center mt-3">
            {tweet.repliesCount > 0 && (
              <Link href={`/${tweet.author.username}/status/${tweet.id}`}>
                <a className={`flex items-center text-gray-300 dark:text-slate-400${!session ? ' pointer-events-none' : ''}`}>
                  <FaComments size={24} />
                  <span className="ml-2 mr-5 text-gray-500 dark:text-slate-500 text-sm">
                    {tweet.repliesCount}
                  </span>
                </a>
              </Link>
            )}
            {!tweet.parent && (
              <div className="flex items-center">
                <button
                  className="flex items-center text-gray-300 dark:text-slate-400 hover:text-red-300 dark:hover:text-red-300 transition duration-300"
                  onClick={async () => {
                    if (!session) {
                      return;
                    }

                    if (
                      tweet.likes.findIndex(
                        (user) => user.id === session.user.id
                      ) > -1
                    ) {
                      alert('You already liked this tweet');
                      return;
                    }

                    const res = await fetch('/api/like', {
                      body: JSON.stringify({
                        tweetId: tweet.id,
                        userId: session.user.id,
                      }),
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      method: 'POST',
                    });

                    if (!res.ok) {
                      const { message } = await res.json();
                      alert(message);
                      return;
                    }

                    setTweets((prev) => {
                      const tweetIndex = prev.findIndex((t) => t.id === tweet.id);
                      const newTweet = {
                        ...prev[tweetIndex],
                      likes: [{ id: session.user.id }, ...tweet.likes],
                      };

                      return [
                        ...prev.slice(0, tweetIndex),
                        newTweet,
                        ...prev.slice(tweetIndex + 1),
                      ];
                    });
                  }}
                >
                  <FaHeart size={24} />
                </button>
                {likesCount > 0 && (
                  <span className="ml-3 text-gray-500 dark:text-slate-500 text-sm">
                    {likesCount}
                  </span>
                )}
              </div>
            )}
          </div>
          <div className="absolute top-1 -left-8 w-1 h-full border-l-2 border-gray-200" />
        </div>
      </div>
      {session && session.user.email === tweet.author.email && asPath === (tweet.parent ? `/${tweet.parentData.author.username}/status/${tweet.parent}` : `/${tweet.author.username}/status/${tweet.id}`) && (
        <DeleteButton tweet={tweet} setAllReplies={setAllReplies} />
      )}
    </div>
  );
}
