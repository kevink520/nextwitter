import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Navbar from 'components/Navbar';
import ScrollToTop from 'components/ScrollToTop';

export default function Layout({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  if (status === 'loading') {
    return null;
  }

  if (router.pathname !== '/' && !session) {
    router.push('/');
  }

  return (
    <div className="w-full h-full min-h-screen flex flex-col items-center px-4 pt-32 pb-16 bg-blue-50 dark:bg-slate-900">
      <Navbar />
      {children}
      <ScrollToTop />
    </div>
  );
}
