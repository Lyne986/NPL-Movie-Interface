'use client'

import { Form, Formik } from 'formik'
import React from 'react';
import * as Yup from 'yup';

import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { SignupFormValues } from '@/shared/types/Form';
import { signup } from '@/utils/supabase/actions'

const SignupForm: React.FC = () => {
  const [loading, setLoading] = React.useState(false)

  const initialValues = {
    name: '',
    email: '',
    password: '',
    confirmpassword: '',
  }

  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().required('Required'),
    confirmpassword: Yup.string().required('Required'),
  })

  const handleSubmit = async (values: SignupFormValues) => {
    const { password, confirmpassword } = values

    if (!password.length || !confirmpassword.length || password !== confirmpassword) {
      return alert("Les mots de passe ne correspondent pas.")
    }

    setLoading(true)
    await signup(values);
    setLoading(false)
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      validateOnChange={false}
    >
      {({ handleChange, values }) => (
        <Form className="flex flex-col gap-4 w-full">
          <Input
            label="Nom"
            id="name"
            name="name"
            onChange={handleChange}
            placeholder="Ton nom"
            required
          />
          <Input
            label="Email"
            id="email"
            name="email"
            onChange={handleChange}
            placeholder="Ton adresse email"
            type="email"
            required
          />
          <Input
            label="Mot de passe"
            id="password"
            name="password"
            onChange={handleChange}
            placeholder="Ton mot de passe"
            type="password"
            required
          />
          <Input
            label="Confirmation du mot de passe"
            id="confirmpassword"
            name="confirmpassword"
            onChange={handleChange}
            placeholder="Confirme ton mot de passe"
            type="password"
            required
          />
          {/* TODO: Pourquoi le button trigger pas le submit sans le onClick ?? */}
          <Button
            onClick={() => handleSubmit(values)}
            loading={loading}
            type="submit"
          >
            Sign up
          </Button>
        </Form>
      )}
    </Formik>
  )
}

SignupForm.displayName = 'SignupForm'

export default SignupForm
