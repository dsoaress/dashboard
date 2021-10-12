import { GetServerSideProps, NextPage } from 'next'

import { Layout } from '../../components/Layout'
import { Link } from '../../components/Link'
import { useUsers } from '../../hooks/useQuery'
import { prefetchUserById } from '../../services/api'
import { authenticatedUserRoute } from '../../utils/authenticatedUserRoute'

const Users: NextPage = () => {
  const { users } = useUsers()

  return (
    <Layout>
      <h1>Users</h1>
      <ul>
        {users?.map(user => (
          <li key={user.id}>
            <Link href={`/users/${user.id}`} onMouseEnter={() => prefetchUserById(user.id)}>
              {user.name} - {user.email}
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = authenticatedUserRoute(
  async () => {
    return { props: {} }
  },
  { roles: ['ADMIN', 'USER'] }
)

export default Users
