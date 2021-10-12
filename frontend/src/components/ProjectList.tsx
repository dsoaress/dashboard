import { Stack } from '@chakra-ui/react'

import { useProjects } from '../hooks/useQuery'
import { ListSkeleton } from './ListSkeleton'
import { ProjectCard } from './ProjectCard'

export function ProjectList() {
  const { projects, isLoading } = useProjects()

  if (isLoading) {
    return <ListSkeleton items={20} height="58px" />
  }

  return (
    <Stack spacing={4}>
      {projects?.map(project => (
        <ProjectCard project={project} key={project.id} />
      ))}
    </Stack>
  )
}
