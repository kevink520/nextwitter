import Tweet from 'components/Tweet';

export default function Tweets({ tweets, setTweets, setAllReplies, shadow }) {
  if (!tweets) {
    return null;
  }

  return (
    <div className={`w-full max-w-2xl p-8 bg-white dark:bg-slate-700${shadow ? ' shadow' : ''}`}>
      {tweets.map((tweet) => (
        <Tweet key={tweet.id} setTweets={setTweets} tweet={tweet} setAllReplies={setAllReplies} />
      ))}
    </div>
  );
}

