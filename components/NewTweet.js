import { useState } from 'react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'

export default function NewTweet ({ setTweets }) {
  const [content, setContent] = useState('')
  const { data: session } = useSession()

  if (!session || !session.user) {
    return null
  }

  return (
    <form
      className='w-full max-w-2xl p-8 mb-8 bg-white dark:bg-slate-700 shadow'
      onSubmit={async (e) => {
        e.preventDefault()

        if (!content) {
          alert('No content')
          return
        }

        const res = await fetch('/api/tweet/', {
          body: JSON.stringify({ content }),
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'POST'
        })

        if (res.ok) {
          const { tweet } = await res.json()
          setContent('')
          setTweets((prev) => [tweet, ...prev])
        } else {
          alert('Error')
        }
      }}
    >
      <div className='flex'>
        {session.user.image
          ? (
            <Image
              src={session.user.image}
              alt={session.user.username}
              width={64}
              height={64}
              className='rounded-full'
            />
            )
          : (
            <div className='w-16 h-16 rounded-full bg-blue-100' />
            )}
        <div className='flex-1 ml-3 mb-3'>
          <textarea
            className='border border-gray-200 p-4 w-full text-lg font-medium bg-transparent outline-none dark:text-slate-400'
            rows={2}
            cols={50}
            placeholder="What's happening?"
            name='content'
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
      </div>

      <div className='flex'>
        <div className='flex justify-end flex-1'>
          <button className='px-8 py-2 mt-0 bg-blue-900 font-bold rounded-full text-white hover:opacity-90 transition duration-300'>
            Tweet
          </button>
        </div>
      </div>
    </form>
  )
}
