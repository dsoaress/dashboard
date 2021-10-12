import { Flex, Stack, Text } from '@chakra-ui/react'

import { useAuth } from '../hooks/useAuth'
import { Avatar } from './Avatar'

export function ProfileCard() {
  const { me } = useAuth()

  if (!me) {
    return null
  }

  return (
    <Flex align="center">
      <Avatar name={me.name} avatar={me.avatar} />
      <Stack spacing={0} ml={3}>
        <Text fontSize="sm" color="gray.600">
          {me.name}
        </Text>
        <Text fontSize="xs" color="gray.400">
          {me.email}
        </Text>
      </Stack>
    </Flex>
  )
}
