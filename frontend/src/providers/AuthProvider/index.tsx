import { useRouter } from 'next/router'
import { parseCookies } from 'nookies'
import { ReactNode, useEffect, useState } from 'react'

import { AuthContext } from '../../contexts/AuthContext'
import { useToast } from '../../hooks/useToast'
import { getMe } from '../../services/api'
import { ProfileFormData } from '../../types/ProfileFormData'
import { User } from '../../types/User'
import { destroyCookies } from '../../utils/destroyCookies'
import { signInAction } from './signInAction'
import { signUpAction } from './signUpAction'
import { updateProfileAction } from './updateProfileAction'

type SignInFormData = {
  email: string
  password: string
}

type SignUpFormData = {
  name: string
  email: string
  password: string
}

type AuthProviderProps = {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter()
  const toast = useToast()
  const [me, setMe] = useState<User>()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const { accessToken } = parseCookies()

    if (accessToken) {
      getMe()
        .then(me => setMe(me))
        .catch(error => console.log(error))
    }
  }, [])

  function signIn({ email, password }: SignInFormData) {
    signInAction({
      email,
      password,
      setMe,
      setIsLoading,
      router,
      toast
    })
  }

  function signUp({ name, email, password }: SignUpFormData) {
    signUpAction({
      name,
      email,
      password,
      setIsLoading,
      toast
    })
  }

  function signOut() {
    setMe(undefined)
    destroyCookies()
    router.push('/auth')
  }

  function updateProfile(profileFormData: ProfileFormData) {
    updateProfileAction({
      profileFormData,
      setIsLoading,
      toast
    })
  }

  return (
    <AuthContext.Provider
      value={{
        me,
        signIn,
        signUp,
        signOut,
        updateProfile,
        isLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
