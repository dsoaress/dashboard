import { UseToastOptions } from '@chakra-ui/toast'
import { AxiosError } from 'axios'
import { NextRouter } from 'next/router'
import { Dispatch, SetStateAction } from 'react'

import { SignInFormData } from '../../pages/auth'
import { api, getMe } from '../../services/api'
import { User } from '../../types/User'
import { setCookies } from '../../utils/setCookies'

interface Props extends SignInFormData {
  setMe: Dispatch<SetStateAction<User | undefined>>
  setIsLoading: Dispatch<SetStateAction<boolean>>
  router: NextRouter
  toast: (options: UseToastOptions) => void
}

export async function signInAction({ email, password, setMe, setIsLoading, router, toast }: Props) {
  setIsLoading(true)

  try {
    const { data } = await api.post<{ accessToken: string; refreshToken: string }>('session', {
      email,
      password
    })

    setCookies({
      accessToken: data.accessToken,
      refreshToken: data.refreshToken
    })

    getMe()
      .then(data => setMe(data))
      .catch(error => console.log(error))

    router.push('/')
  } catch (error) {
    const { response } = error as AxiosError

    if (response?.status === 400) {
      toast({
        description: 'Invalid email or password',
        status: 'error'
      })
    } else {
      toast({
        description: 'Hmm... Something wrong happened in our side. Please try again.',
        status: 'error'
      })
    }
  }

  setIsLoading(false)
}
