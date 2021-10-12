import { GetServerSideProps, NextPage } from 'next'

import { Layout } from '../../components/Layout'
import { UserList } from '../../components/UserList'
import { authenticatedUserRoute } from '../../utils/authenticatedUserRoute'

const Users: NextPage = () => {
  return (
    <Layout>
      <UserList />
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
