import Tweet from 'components/Tweet';

export default function Tweets({ tweets, shadow }) {
  if (!tweets) {
    return null;
  }

  return (
    <div className={`w-full max-w-2xl p-8 bg-white${shadow ? ' shadow' : ''}`}>
      {tweets.map((tweet, i) => (
        <Tweet key={i} tweet={tweet} />
      ))}
    </div>
  );
}

