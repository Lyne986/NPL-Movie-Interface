import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';

import logo from '@/assets/logo.svg';
import separator from '@/assets/separator-logo.svg';
import SignupForm from '@/components/Forms/SignupForm';
import { createClient } from '@/utils/supabase/server';

export default async function SignupPage() {
  const supabase = createClient()

  const { data } = await supabase.auth.getUser()

  if (data.user) {
    return redirect('/dashboard/library')
  }

  return (
    <div className="w-full h-full flex">
      <div className="hidden md:flex bg-signup w-1/2 flex-col items-center justify-center"/>
      <div className="diagonal-gradient-login flex flex-col w-full lg:w-1/2 p-8">
        <div className="flex flex-col items-center">
          <h1 className="text-white text-2xl font-bold cursor-pointer">Movies Lister</h1>
        </div>
        <div className="h-full flex flex-col justify-center items-center lg:items-stretch gap-2 w-full md:w-[400px] md:pl-24">
          <span className="text-white text-center lg:text-start text-2xl font-semibold">Welcome !</span>
          <span className="text-white text-center lg:text-start text-sm font-medium pb-6">Create you account now !</span>
          <SignupForm />
          <span className="flex gap-2 text-white text-xs text-center justify-center">
            {`You already have an account ?`}
            <Link className="font-semibold text-white underline hover:text-beige" href="/login">Login</Link>
          </span>
        </div>
      </div>
    </div>
  )
}
