import { useState } from 'react'
import { useQuery } from 'react-query'

import { getAllProjects, getAllUsers, getProjectById, getUserById } from '../services/api'

export function useUsers() {
  const [page, setPage] = useState(1)

  const {
    data: users,
    isLoading,
    isFetching,
    isPreviousData
  } = useQuery(['users', page], () => getAllUsers(page), {
    keepPreviousData: true
  })
  return {
    users,
    isLoading,
    isFetching,
    isPreviousData,
    page,
    setPage,
    hasMore: users?.hasMore
  }
}

export function useUser(userId: string) {
  const { data: user, isLoading } = useQuery(['users', userId], () => getUserById(userId))
  return { user, isLoading }
}

export function useProjects() {
  const [page, setPage] = useState(1)

  const {
    data: projects,
    isLoading,
    isFetching,
    isPreviousData
  } = useQuery(['projects', page], () => getAllProjects(page), {
    keepPreviousData: true
  })

  return {
    projects,
    isLoading,
    isFetching,
    isPreviousData,
    page,
    setPage,
    hasMore: projects?.hasMore
  }
}

export function useProject(projectId: string) {
  const { data: project, isLoading } = useQuery(['users', projectId], () =>
    getProjectById(projectId)
  )
  return { project, isLoading }
}
