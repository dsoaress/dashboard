import { Flex, Stack, Text } from '@chakra-ui/react'

import { useAuth } from '../hooks/useAuth'
import { Avatar } from './Avatar'

export function ProfileCard() {
  const { user } = useAuth()

  if (!user) {
    return null
  }

  return (
    <Flex align="center">
      <Avatar name={user.name} avatar={user.avatar} />
      <Stack spacing={0} ml={3}>
        <Text fontSize="sm" color="gray.600">
          {user.name}
        </Text>
        <Text fontSize="xs" color="gray.400">
          {user.email}
        </Text>
      </Stack>
    </Flex>
  )
}
