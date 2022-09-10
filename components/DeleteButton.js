import { useRouter } from 'next/router';

export default function DeleteButton({ tweet, setAllReplies }) {
  const router = useRouter();
  return (
    <button
      className="border-b-2 border-blue-500 ml-14 bg-transparent text-sm text-blue-500 dark:text-slate-400 hover:opacity-75 pt-2"
      onClick={async () => {
        if (
          !confirm(
            `Are you sure you want to delete this ${
              tweet.parent ? 'reply' : 'tweet'
            }?`
          )
        ) {
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
          return;
        }

        if (res.status === 200 && !tweet.parent) {
          router.push('/home');
          return;
        }

        if (res.status === 200 && setAllReplies) {
          setAllReplies((prev) => prev.filter((r) => r.id !== tweet.id));
        }
      }}
    >
      Delete
    </button>
  );
}
