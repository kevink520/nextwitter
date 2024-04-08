export default function VerifyRequestMessage () {
  return (
    <div
      className='w-full max-w-lg m-auto bg-white dark:bg-slate-700 shadow p-8'
    >
      <h1 className='block mb-6 text-4xl dark:text-slate-400'>
        Check your email
      </h1>
      <p className='block mb-6 text-lg dark:text-slate-400'>
        A sign in link has been sent to your email address.
      </p>
      <p className='block text-lg dark:text-slate-400'>
        {typeof window !== 'undefined' ? window.location.host : ''}
      </p>
    </div>
  )
}
