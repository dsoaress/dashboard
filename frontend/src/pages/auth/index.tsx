import { Button, Heading, Text } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { NextPage } from 'next'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'

import { Input } from '../../components/Input'
import { Link } from '../../components/Link'
import { useAuth } from '../../hooks/useAuth'

export type SignInFormData = {
  email: string
  password: string
}

const SignInPage: NextPage = () => {
  const { signIn, isLoading } = useAuth()

  const signInFormSchema = yup.object().shape({
    email: yup.string().required().email(),
    password: yup.string().required()
  })

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInFormSchema)
  })

  const { errors } = formState

  const handleSignIn: SubmitHandler<SignInFormData> = values => {
    signIn(values)
  }

  return (
    <form onSubmit={handleSubmit(handleSignIn)}>
      <Heading>Sign in</Heading>
      <Input label="Email" type="email" error={errors.email} {...register('email')} />
      <Input label="Password" type="password" error={errors.password} {...register('password')} />
      <Button type="submit" isLoading={isLoading}>
        Sign in
      </Button>
      <Text>
        Not registered yet? <Link href="/auth/sign-up">Create and account</Link>.
      </Text>
    </form>
  )
}

export default SignInPage
