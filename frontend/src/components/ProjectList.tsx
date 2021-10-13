import { Button, Stack } from '@chakra-ui/react'
import { useState } from 'react'

import { useProjects } from '../hooks/useQuery'
import { ListSkeleton } from './ListSkeleton'
import { Pagination } from './Pagination'
import { ProjectCard } from './ProjectCard'

export function ProjectList() {
  const { projects, isLoading, page, setPage, hasMore, isPreviousData } = useProjects()

  if (isLoading) {
    return <ListSkeleton items={10} height="58px" />
  }

  return (
    <>
      <Stack spacing={4}>
        {projects?.data.map(project => (
          <ProjectCard project={project} key={project.id} />
        ))}
      </Stack>

      <Pagination page={page} setPage={setPage} isPreviousData={isPreviousData} hasMore={hasMore} />
    </>
  )
}
