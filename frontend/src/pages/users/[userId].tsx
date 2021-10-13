import { NextPage } from 'next'
import DefaultErrorPage from 'next/error'
import { useRouter } from 'next/router'

import { Layout } from '../../components/Layout'
import { Spinner } from '../../components/Spinner'
import { useUser } from '../../hooks/useQuery'

const User: NextPage = () => {
  const { query } = useRouter()
  const userId = query.userId as string

  const { user, isLoading } = useUser(userId)

  if (isLoading) {
    return <Spinner />
  }

  if (!user) {
    return <DefaultErrorPage statusCode={404} />
  }

  return (
    <Layout roles={['ADMIN']}>
      <h1>Id: {user?.id}</h1>
      <h1>User: {user?.name}</h1>
      <h1>Email: {user?.email}</h1>
    </Layout>
  )
}

export default User
