import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';
import { FaBars } from 'react-icons/fa';

export default function Navbar() {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const { data: session, status } = useSession();
  const loading = status === 'loading';

  return (
    <nav className="w-full fixed left-0 top-0 z-50 flex flex-wrap items-center justify-between px-2 bg-blue-900 mb-3">
      <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
        <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
          <h1>
            <Link href={session?.user ? '/home/' : '/'}>
              <a className="inline-block mr-4 py-2 whitespace-nowrap text-3xl text-white tracking-wide">
                nextwitter
              </a>
            </Link>
          </h1>
          <button
            className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
            type="button"
            onClick={() => setNavbarOpen(!navbarOpen)}
          >
            <FaBars />
          </button>
        </div>
        <div
          className={
            'lg:flex flex-grow items-center' +
            (navbarOpen ? ' flex' : ' hidden')
          }
        >
          <ul className="group relative flex flex-col lg:flex-row list-none lg:ml-auto">
            <li className="nav-item">
              {loading ? null : session?.user ? (
                <Link href={`/${session.user.name}/`}>
                  <a className="px-3 py-5 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75 transition duration-300">
                    {session.user.image ? (
                      <Image
                        src={session.user.image}
                        alt={session.user.name}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-blue-100" />
                    )}
                  </a>
                </Link>
              ) : (
                <Link href="/api/auth/signin/">
                  <a className="px-3 py-5 flex items-center text-xs text-white uppercase tracking-widest hover:opacity-75 transition duration-300">
                    Login
                  </a>
                </Link>
              )}
            </li>
            {session?.user && (
              <li className="absolute left-0 top-full invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-300">
                <button
                  className="px-3 py-2 border-none flex items-center bg-white hover:opacity-75 transition duration-300"
                  onClick={() => signOut()}
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
