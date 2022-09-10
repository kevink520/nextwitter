import { useState } from 'react';

export default function LoadMore({ setTweets, tweets, username }) {
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const take = 10;
  const cursor = tweets[tweets.length - 1]?.id;

  const loadMore = async () => {
    setLoading(true);
    let url = `/api/tweets?take=${take}`;
    if (cursor) {
      url += `&cursor=${cursor}`;
    }

    if (username) {
      url += `&username=${username}`;
    }

    const res = await fetch(url);
    if (!res.ok) {
      const { message } = await res.json();
      setLoading(false);
      alert(message || 'There was an error loading more tweets.');
      return;
    }

    const { tweets: newTweets } = await res.json();
    setTweets([...tweets, ...newTweets]);
    setHasMore(newTweets.length === take);
    setLoading(false);
  };

  if (!hasMore) {
    return null;
  }

  return (
    <div className="flex justify-center p-8">
      <button
        className="px-8 py-2 mt-0 bg-blue-900 font-bold rounded-full text-white hover:opacity-90 transition duration-300"
        onClick={loadMore}
      >
        {loading ? 'Loading...' : 'Load More'}
      </button>
    </div>
  );
}
