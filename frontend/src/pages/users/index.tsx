import { NextPage } from 'next'

import { Layout } from '../../components/Layout'
import { UserList } from '../../components/UserList'

const Users: NextPage = () => {
  return (
    <Layout roles={['ADMIN']}>
      <UserList />
    </Layout>
  )
}

export default Users
