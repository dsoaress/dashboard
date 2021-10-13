import { Project, Projects } from '../../types/Project'
import { queryClient } from '../queryClient'
import { api } from '.'

export async function getAllProjects(page = 1) {
  try {
    const { data } = await api.get<Projects>(`projects?page=${page}`)
    return data
  } catch (error) {
    console.log(error)
  }
}

export function prefetchAllProjects() {
  queryClient.prefetchQuery(['projects', 1], () => getAllProjects(1))
}

export async function getProjectById(projectId: string) {
  try {
    const { data } = await api.get<Project>(`projects/${projectId}`)
    return data
  } catch (error) {
    console.log(error)
  }
}

export function prefetchProjectById(projectId: string) {
  queryClient.prefetchQuery(['projects', projectId], () => getProjectById(projectId))
}
