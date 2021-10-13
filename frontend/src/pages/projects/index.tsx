import { NextPage } from 'next'

import { Layout } from '../../components/Layout'
import { ProjectList } from '../../components/ProjectList'

const Users: NextPage = () => {
  return (
    <Layout>
      <ProjectList />
    </Layout>
  )
}

export default Users
