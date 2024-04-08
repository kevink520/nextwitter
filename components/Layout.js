import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Navbar from 'components/Navbar'
import ScrollToTop from 'components/ScrollToTop'

export default function Layout ({ children }) {
  const { data: session, status } = useSession()
  const router = useRouter()
  useEffect(() => {
    if (!['/', '/auth/signin', '/auth/verify-request'].includes(router.pathname) && !session) {
      router.push('/')
    }
  }, [router, session])

  if (status === 'loading') {
    return null
  }

  return (
    <div className='w-full h-full min-h-screen flex flex-col items-center px-4 pt-32 pb-16 bg-blue-50 dark:bg-slate-900'>
      <Navbar />
      {children}
      <ScrollToTop />
    </div>
  )
}
