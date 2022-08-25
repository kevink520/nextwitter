import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import styles from 'styles/Home.module.css';

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();
  if (status === 'loading') {
    return null;
  }

  if (session) {
    router.push('/home');
    return;
  }

  return (
    <a href="/api/auth/signin">login</a>
  );
}

