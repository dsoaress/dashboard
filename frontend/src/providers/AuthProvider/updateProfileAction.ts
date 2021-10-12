import { UseToastOptions } from '@chakra-ui/toast'
import { Dispatch, SetStateAction } from 'react'

import { api } from '../../services/api'
import { ProfileFormData } from '../../types/ProfileFormData'

type Props = {
  profileFormData: ProfileFormData
  setIsLoading: Dispatch<SetStateAction<boolean>>
  toast: (options: UseToastOptions) => void
}

export async function updateProfileAction({ profileFormData, setIsLoading, toast }: Props) {
  setIsLoading(true)

  const { oldPassword, password } = profileFormData

  if (!password || !oldPassword) {
    delete profileFormData.oldPassword
    delete profileFormData.password
  }

  try {
    await api.patch('me', profileFormData)

    toast({
      description: 'Profile updated.',
      status: 'success'
    })
  } catch (error: any) {
    if (error.response.data.error.message === 'Email already registered') {
      toast({
        description: 'Email already registered.',
        status: 'error'
      })
    }
  }

  setIsLoading(false)
}
