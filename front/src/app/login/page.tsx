import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';

import logo from '@/assets/logo.svg';
import separator from '@/assets/separator-logo.svg';
import LoginForm from '@/components/Forms/LoginForm';
import { createClient } from '@/utils/supabase/server';

export default async function LoginPage() {
  const supabase = createClient()

  const { data } = await supabase.auth.getUser()

  if (data.user) {
    return redirect('/dashboard/library')
  }

  return (
    <div className="w-full h-full flex">
      <div className="hidden md:flex bg-login w-1/2 flex-col items-center justify-center"/>
      <div className="diagonal-gradient-login flex flex-col w-full lg:w-1/2 p-8">
        <div className="flex flex-col items-center">
          <h1 className="text-white text-2xl font-bold cursor-pointer">Movies Saver</h1>
        </div>
        <div className="h-full flex flex-col justify-center items-center lg:items-stretch gap-2 w-full md:w-[400px] md:pl-24">
          <span className="text-white text-center lg:text-start text-2xl font-semibold">Heureux de te revoir !</span>
          <span className="text-white text-center lg:text-start text-sm font-medium pb-6">Entre ton email et ton mot de passe pour te connecter</span>
          <LoginForm />
          <span className="flex gap-2 text-white text-xs text-center justify-center">
            {`Tu n'as pas de compte ?`}
            <Link className="font-semibold text-white underline hover:text-beige" href="/signup">Inscris-toi</Link>
          </span>
        </div>
      </div>
    </div>
  )
}
