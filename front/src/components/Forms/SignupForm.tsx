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
      return alert("Passwords don't match.")
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
            label="Name"
            id="name"
            name="name"
            onChange={handleChange}
            placeholder="Your name"
            required
          />
          <Input
            label="Email"
            id="email"
            name="email"
            onChange={handleChange}
            placeholder="Your email"
            type="email"
            required
          />
          <Input
            label="Password"
            id="password"
            name="password"
            onChange={handleChange}
            placeholder="Your password"
            type="password"
            required
          />
          <Input
            label="Confirm password"
            id="confirmpassword"
            name="confirmpassword"
            onChange={handleChange}
            placeholder="Confirm password"
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
