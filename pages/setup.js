import { useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

export default function Setup() {
  const { data: session, status } = useSession();
  const loading = status === 'loading';
  const [username, setUsername] = useState('');
  const router = useRouter();

  if (loading) {
    return null;
  }

  if (!session || !session.user) {
    return null;
  }

  if (!loading && session.user.username) {
    router.push('/home');
    return;
  }

  console.log('session', session);

  return (
    <form
      className="mt-10 ml-20"
      onSubmit={async (e) => {
        e.preventDefault();
        const res = await fetch(`/api/user?username=${username}`);
        const { usernameExists } = await res.json();
        if (usernameExists) {
          alert('Username already exists');
          setUsername('');
          return;
        }

        await fetch('/api/setup', {
          body: JSON.stringify({
            username,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
        });

        session.user.username = username;
        router.push('/home');
      }}
    >
      <div className="flex-1 mb-5">
        <div className="flex-1 mb-5">Please enter a username</div>
        <input
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-1"
        />
      </div>
      <button className="border px-8 py-2 mt-0 mr-8 font-bold rounded-full color-accent-contrast bg-color-accent hover:bg-color-accent-hover">
        Save
      </button>
    </form>
  );
}
