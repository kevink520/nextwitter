import { useState } from 'react';
import { signIn } from 'next-auth/react';

export default function SignInForm() {
  const [email, setEmail] = useState('');
  return (
    <form
      className="w-full max-w-md m-auto bg-white dark:bg-slate-700 shadow p-8"
      onSubmit={async (e) => {
        e.preventDefault();
        signIn('email', {
          email: e.currentTarget.email.value,
          callbackUrl: '/',
        });
      }}
    >
      <label className="block mb-2 dark:text-slate-400" htmlFor="email">
        Email
      </label>
      <input
        className="block border border-gray-200 px-4 py-2 mb-3 w-full text-lg font-medium bg-transparent outline-none dark:text-slate-400"
        type="email"
        name="email"
        id="email"
        required
        placeholder="email@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button className="px-8 py-2 mt-0 bg-blue-900 font-bold rounded-full text-white hover:opacity-90 transition duration-300">
        Sign in with Email
      </button>
    </form>
  );
}
