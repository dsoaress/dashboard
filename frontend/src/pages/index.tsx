import { GetServerSideProps, NextPage } from 'next'

import { authenticatedUserRoute } from '../utils/authenticatedUserRoute'

const Home: NextPage = () => {
  return (
    <div>
      <h1>Home</h1>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = authenticatedUserRoute(
  async () => {
    return { props: {} }
  },
  { roles: ['ADMIN', 'USER'] }
)

export default Home
