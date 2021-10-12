import { Box, Text } from '@chakra-ui/react'

import { prefetchUserById } from '../services/api'
import { User } from '../types/User'
import { simplePlural } from '../utils/simplePlural'
import { Avatar } from './Avatar'
import { Badge } from './Badge'
import { Card } from './Card'
import { Link } from './Link'

type UserCardProps = {
  user: User
}

export function UserCard({ user }: UserCardProps) {
  const projectsLength = user.projects.length
  const projectsLabel = simplePlural('project', projectsLength)

  return (
    <Link href={`/users/${user.id}`} onMouseEnter={() => prefetchUserById(user.id)}>
      <Card>
        <Avatar name={user.name} avatar={user.avatar} />
        <Box ml={4}>
          <Text fontSize="sm" color="gray.600" fontWeight="semibold">
            {user.name}{' '}
            <Badge>
              {projectsLength} {projectsLabel}
            </Badge>
          </Text>
          <Text fontSize="xs" color="gray.500">
            {user.email}
          </Text>
        </Box>
      </Card>
    </Link>
  )
}
