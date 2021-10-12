import { Box, Text } from '@chakra-ui/react'

import { prefetchProjectById } from '../services/api'
import { Project } from '../types/Project'
import { Badge } from './Badge'
import { Card } from './Card'
import { Link } from './Link'

type ProjectCardProps = {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  const colorScheme = project.status === 'OPEN' ? 'green' : 'red'

  return (
    <Link href={`/projects/${project.id}`} onMouseEnter={() => prefetchProjectById(project.id)}>
      <Card>
        <Box ml={4}>
          <Text fontSize="sm" color="gray.600" fontWeight="semibold">
            {project.title} <Badge colorScheme={colorScheme}>{project.status}</Badge>
          </Text>

          <Text fontSize="xs" color="gray.500">
            {project.author.name}
          </Text>
        </Box>
      </Card>
    </Link>
  )
}
