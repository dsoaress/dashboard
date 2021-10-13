import { useRouter } from 'next/router'
import { parseCookies } from 'nookies'
import { ReactNode, useEffect, useState } from 'react'

import { Spinner } from '../../components/Spinner'
import { AuthContext } from '../../contexts/AuthContext'
import { useToast } from '../../hooks/useToast'
import { getAuthenticatedUser } from '../../services/api'
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
  const [user, setUser] = useState<User>()
  const [isAuthenticating, setIsAuthenticating] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const { accessToken } = parseCookies()

    async function authenticate() {
      try {
        const user = await getAuthenticatedUser()
        setUser(user)

        if (router.asPath.includes('/auth')) {
          await router.push('/')
        }
      } catch (error) {
        console.log(error)
      }

      setIsAuthenticating(false)
    }

    async function redirectToAuth() {
      if (!router.asPath.includes('/auth')) {
        await router.push('/auth')
      }

      setIsAuthenticating(false)
    }

    if (accessToken) {
      authenticate()
    } else {
      redirectToAuth()
    }
  }, [router])

  function signIn({ email, password }: SignInFormData) {
    signInAction({
      email,
      password,
      setUser,
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
    router.push('/auth').then(() => {
      setUser(undefined)
      destroyCookies()
    })
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
        user,
        isAuthenticating,
        signIn,
        signUp,
        signOut,
        updateProfile,
        isLoading
      }}
    >
      {isAuthenticating ? <Spinner /> : children}
    </AuthContext.Provider>
  )
}
