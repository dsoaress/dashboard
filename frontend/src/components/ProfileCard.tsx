import { Flex, Stack, Text } from '@chakra-ui/react'

import { Avatar } from './Avatar'

type ProfileCardProps = {
  name: string
  email: string
  avatar?: string
}

export function ProfileCard({ name, email, avatar }: ProfileCardProps) {
  return (
    <Flex align="center">
      <Avatar name={name} avatar={avatar} />
      <Stack spacing={0} ml={3}>
        <Text fontSize="sm" color="gray.600">
          {name}
        </Text>
        <Text fontSize="xs" color="gray.400">
          {email}
        </Text>
      </Stack>
    </Flex>
  )
}
