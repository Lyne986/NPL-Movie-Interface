'use client'

import { Form, Formik } from 'formik'
import React from 'react';
import * as Yup from 'yup';

import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { LoginFormValues } from '@/shared/types/Form'
import { login } from '@/utils/supabase/actions';

const LoginForm: React.FC = () => {
  const [loading, setLoading] = React.useState(false)

  const initialValues = {
    email: '',
    password: '',
  }

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().required('Required'),
  })

  const handleSubmit = async (values: LoginFormValues) => {
    setLoading(true)
    await login(values)
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
          {/* TODO: Pourquoi le button trigger pas le submit sans le onClick ?? */}
          <Button
            onClick={() => handleSubmit(values)}
            loading={loading}
            type="submit"
          >
            Se connecter
          </Button>
        </Form>
      )}
    </Formik>
  )
}

LoginForm.displayName = 'LoginForm'

export default LoginForm
