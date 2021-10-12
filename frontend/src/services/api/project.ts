import { Project } from '../../types/Project'
import { queryClient } from '../queryClient'
import { api } from '.'

export async function getAllProjects() {
  try {
    const { data } = await api.get<Project[]>('projects')
    return data
  } catch (error) {
    console.log(error)
  }
}

export function prefetchAllProjects() {
  queryClient.prefetchQuery('projects', getAllProjects)
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
