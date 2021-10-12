import { UseToastOptions } from '@chakra-ui/toast'
import { Dispatch, SetStateAction } from 'react'

import { api } from '../../services/api'
import { SignUpFormData } from '../../types/SignUpFormData'

interface Props extends SignUpFormData {
  setIsLoading: Dispatch<SetStateAction<boolean>>
  toast: (options: UseToastOptions) => void
}

export async function signUpAction({ name, email, password, setIsLoading, toast }: Props) {
  setIsLoading(true)

  try {
    await api.post('users', {
      name,
      email,
      password
    })
  } catch (error: any) {
    if (error?.response?.status === 400) {
      toast({
        description: 'A user with this email address has already been registered.',
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
