'use client'

import { FormEvent } from 'react'

export default function Form() {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    await fetch(`/api/auth/login`, {
      method: 'POST',
      body: JSON.stringify({
        username: formData.get('username'),
        password: formData.get('password'),
      }),
    })
  }
  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col gap-2 mx-auto max-w-md mt-10'
    >
      <div className='flex gap-8 items-center'>
        <div className='w-50'>Username:</div>
        <input
          name='username'
          className='border border-black text-black rounded-md h-30 w-full'
        />
      </div>

      <div className='flex gap-8 items-center'>
        <div className='w-50'>Password:</div>
        <input
          name='password'
          className='border border-black  text-black rounded-md h-30 w-full'
          type='password'
        />
      </div>

      <div className='flex justify-center'>
        <button
          type='submit'
          className='bg-slate-950 rounded-md text-white h-30 mt-10 w-60'
        >
          Login
        </button>
      </div>
    </form>
  )
}
