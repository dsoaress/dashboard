import { Stack } from '@chakra-ui/react'

import { useUsers } from '../hooks/useQuery'
import { ListSkeleton } from './ListSkeleton'
import { UserCard } from './UserCard'

export function UserList() {
  const { users, isLoading } = useUsers()

  if (isLoading) {
    return <ListSkeleton items={20} height="58px" />
  }

  return (
    <Stack spacing={4}>
      {users?.map(user => (
        <UserCard user={user} key={user.id} />
      ))}
    </Stack>
  )
}
