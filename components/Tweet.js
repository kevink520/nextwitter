import Image from 'next/image';
import Link from 'next/link';
import timeago from 'lib/timeago';

export default function Tweet({ tweet }) {
  return (
    <div className="flex items-start">
      <div className="relative z-10 pb-3 bg-white">
        {tweet.author.image ? (
          <Image
            src={tweet.author.image}
            alt={tweet.author.name}
            width={40}
            height={40}
            className="rounded-full"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-blue-100" />
        )}
      </div>
      <div className="flex-1 flex-col relative ml-3 mb-7">
        <Link href={`/${tweet.author.name}/`}>
          <a className="-mt-1 text-xl leading-normal">{tweet.author.name}</a>
        </Link>
        <p className="mb-2 text-gray-500 text-sm">
          {timeago.format(new Date(tweet.createdAt))}
        </p>
        <Link href={`/${tweet.author.name}/status/${tweet.id}/`}>
          <a className="">{tweet.content}</a>
        </Link>
        <div className="absolute top-1 -left-8 w-1 h-full border-l-2 border-gray-200" />
      </div>
    </div>
  );
}
