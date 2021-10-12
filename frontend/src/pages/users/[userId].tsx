import { GetServerSideProps, NextPage } from 'next'
import DefaultErrorPage from 'next/error'
import { useRouter } from 'next/router'

import { useUser } from '../../hooks/useQuery'
import { authenticatedUserRoute } from '../../utils/authenticatedUserRoute'

const User: NextPage = () => {
  const { query } = useRouter()
  const userId = query.userId as string

  const { user, isLoading } = useUser(userId)

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (!user) {
    return <DefaultErrorPage statusCode={404} />
  }

  return (
    <div>
      <h1>Id: {user?.id}</h1>
      <h1>User: {user?.name}</h1>
      <h1>Email: {user?.email}</h1>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = authenticatedUserRoute(
  async () => {
    return { props: {} }
  },
  { roles: ['ADMIN', 'USER'] }
)

export default User
