import { Stack } from '@chakra-ui/react'

import { useUsers } from '../hooks/useQuery'
import { ListSkeleton } from './ListSkeleton'
import { Pagination } from './Pagination'
import { UserCard } from './UserCard'

export function UserList() {
  const { users, isLoading, page, setPage, hasMore, isPreviousData } = useUsers()

  if (isLoading) {
    return <ListSkeleton items={10} height="58px" />
  }

  return (
    <>
      <Stack spacing={4}>
        {users?.data.map(user => (
          <UserCard user={user} key={user.id} />
        ))}
      </Stack>

      <Pagination page={page} setPage={setPage} isPreviousData={isPreviousData} hasMore={hasMore} />
    </>
  )
}
