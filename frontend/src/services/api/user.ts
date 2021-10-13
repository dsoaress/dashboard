import { User } from '../../types/User'
import { queryClient } from '../queryClient'
import { api } from '.'

export async function getAuthenticatedUser() {
  try {
    const { data } = await api.get<User>('me')
    return data
  } catch (error) {
    console.log(error)
  }
}

export async function getAllUsers() {
  try {
    const { data } = await api.get<User[]>('users')
    return data
  } catch (error) {
    console.log(error)
  }
}

export function prefetchAllUsers() {
  queryClient.prefetchQuery('users', getAllUsers)
}

export async function getUserById(userId: string) {
  try {
    const { data } = await api.get<User>(`users/${userId}`)
    return data
  } catch (error) {
    console.log(error)
  }
}

export function prefetchUserById(userId: string) {
  queryClient.prefetchQuery(['users', userId], () => getUserById(userId))
}
