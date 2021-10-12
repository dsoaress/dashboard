import { GetServerSideProps, NextPage } from 'next'

import { Layout } from '../components/Layout'
import { authenticatedUserRoute } from '../utils/authenticatedUserRoute'

const Home: NextPage = () => {
  return (
    <Layout>
      <h1>Home</h1>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = authenticatedUserRoute(
  async () => {
    return { props: {} }
  },
  { roles: ['ADMIN', 'USER'] }
)

export default Home
