import Tweet from 'components/Tweet';

export default function Tweets({ tweets }) {
  if (!tweets) {
    return null;
  }

  return (
    <>
      {tweets.map((tweet, i) => (
        <Tweet key={i} tweet={tweet} />
      ))}
    </>
  );
}

