import { useState } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

export default function SetupForm () {
  const { data: session, status } = useSession()
  const loading = status === 'loading'
  const [username, setUsername] = useState('')
  const router = useRouter()

  if (loading) {
    return null
  }

  if (!session || !session.user) {
    return null
  }

  if (!loading && session.user.username) {
    router.push('/home')
    return
  }

  return (
    <form
      className='w-full max-w-md m-auto bg-white dark:bg-slate-700 shadow p-8'
      onSubmit={async (e) => {
        e.preventDefault()
        const res = await fetch(`/api/user?username=${username}`)
        const { usernameExists } = await res.json()
        if (usernameExists) {
          alert('Username already exists')
          setUsername('')
          return
        }

        const res2 = await fetch('/api/setup', {
          body: JSON.stringify({
            username
          }),
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'POST'
        })

        if (!res2.ok) {
          console.log(res2.statusText)
          alert('Something went wrong')
          return
        }

        session.user.username = username
        router.push('/home')
      }}
    >
      <div className='flex-1 mb-5'>
        <div className='block mb-5 dark:text-slate-400'>
          Please enter a username
        </div>
        <input
          type='text'
          name='username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className='block border border-gray-200 px-4 py-2 mb-3 w-full text-lg font-medium bg-transparent outline-none dark:text-slate-400'
        />
      </div>
      <button className='px-8 py-2 mt-0 bg-blue-900 font-bold rounded-full text-white hover:opacity-90 transition duration-300'>
        Save
      </button>
    </form>
  )
}
