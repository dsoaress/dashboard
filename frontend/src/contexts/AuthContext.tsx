import { createContext } from 'react'

import { ProfileFormData } from '../types/ProfileFormData'
import { User } from '../types/User'

type SignInFormData = {
  email: string
  password: string
}

type SignUpFormData = {
  name: string
  email: string
  password: string
}

type AuthContextData = {
  user?: User
  isAuthenticating: boolean
  signIn: (data: SignInFormData) => void
  signUp: (data: SignUpFormData) => void
  signOut: () => void
  updateProfile: (data: ProfileFormData) => void
  isLoading: boolean
}

export const AuthContext = createContext({} as AuthContextData)
