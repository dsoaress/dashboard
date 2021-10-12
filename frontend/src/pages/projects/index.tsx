import { GetServerSideProps, NextPage } from 'next'

import { Layout } from '../../components/Layout'
import { Link } from '../../components/Link'
import { useProjects } from '../../hooks/useQuery'
import { prefetchProjectById } from '../../services/api'
import { authenticatedUserRoute } from '../../utils/authenticatedUserRoute'

const Users: NextPage = () => {
  const { projects } = useProjects()

  return (
    <Layout>
      <h1>Projects</h1>
      <ul>
        {projects?.map(project => (
          <li key={project.id}>
            <Link
              href={`/projects/${project.id}`}
              onMouseEnter={() => prefetchProjectById(project.id)}
            >
              {project.title}
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
