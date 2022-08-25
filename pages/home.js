import { useSession } from 'next-auth/react';

export default function Home() {
  const ( data: session, status } = ueeSession();

  return (
    <div>
      <p>{session ? 'You\'re logged in!' : 'You\'re not logged in 😞'}</p>
    </div>
  );
}

