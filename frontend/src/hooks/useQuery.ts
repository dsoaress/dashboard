import { useQuery } from 'react-query'

import { getAllProjects, getAllUsers, getProjectById, getUserById } from '../services/api'

export function useUsers() {
  const { data: users, isLoading } = useQuery('users', getAllUsers)
  return { users, isLoading }
}

export function useUser(userId: string) {
  const { data: user, isLoading } = useQuery(['users', userId], () => getUserById(userId))
  return { user, isLoading }
}

export function useProjects() {
  const { data: projects, isLoading } = useQuery('projects', getAllProjects)
  return { projects, isLoading }
}

export function useProject(projectId: string) {
  const { data: project, isLoading } = useQuery(['users', projectId], () =>
    getProjectById(projectId)
  )
  return { project, isLoading }
}
