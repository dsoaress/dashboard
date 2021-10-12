import { GetServerSideProps, NextPage } from 'next'

import { Layout } from '../../components/Layout'
import { ProjectList } from '../../components/ProjectList'
import { authenticatedUserRoute } from '../../utils/authenticatedUserRoute'

const Users: NextPage = () => {
  return (
    <Layout>
      <ProjectList />
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
