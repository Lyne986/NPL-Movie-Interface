'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { LoginFormValues, SignupFormValues } from '@/shared/types/Form'
import { createClient } from '@/utils/supabase/server'

import { Routes } from '../routes'

export async function login(values: LoginFormValues) {
  const supabase = createClient()

  const data = {
    email: values.email,
    password: values.password,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    return console.error('error: ', error)
  }

  revalidatePath(Routes.HOME, 'layout')
  redirect(Routes.HOME)
}

export async function signup(values: SignupFormValues) {
  const supabase = createClient()

  const data = {
    email: values.email,
    password: values.password,
    options: {
      data: {
        first_name: values.name,
        last_name: ' ',
      },
    },
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    return console.error('error: ', error)
  }

  revalidatePath(Routes.HOME, 'layout')
  redirect(Routes.HOME)
}

export async function signOut() {
  const supabase = createClient()
  const { error } = await supabase.auth.signOut()

  if (error) {
    return console.error('error: ', error)
  }

  return redirect(Routes.LOGIN)
}
