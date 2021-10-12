import { GetServerSideProps, NextPage } from 'next'
import DefaultErrorPage from 'next/error'
import { useRouter } from 'next/router'

import { useProject } from '../../hooks/useQuery'
import { authenticatedUserRoute } from '../../utils/authenticatedUserRoute'

const Project: NextPage = () => {
  const { query } = useRouter()
  const projectId = query.projectId as string

  const { project, isLoading } = useProject(projectId)

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (!project) {
    return <DefaultErrorPage statusCode={404} />
  }

  return (
    <div>
      <h1>Id: {project?.id}</h1>
      <h1>title: {project?.title}</h1>
      <h1>Description: {project?.description}</h1>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = authenticatedUserRoute(
  async () => {
    return { props: {} }
  },
  { roles: ['ADMIN', 'USER'] }
)

export default Project
