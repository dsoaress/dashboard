import { NextPage } from 'next'
import DefaultErrorPage from 'next/error'
import { useRouter } from 'next/router'

import { Layout } from '../../components/Layout'
import { Spinner } from '../../components/Spinner'
import { useProject } from '../../hooks/useQuery'

const Project: NextPage = () => {
  const { query } = useRouter()
  const projectId = query.projectId as string

  const { project, isLoading } = useProject(projectId)

  if (isLoading) {
    return <Spinner />
  }

  if (!project) {
    return <DefaultErrorPage statusCode={404} />
  }

  return (
    <Layout roles={['ADMIN', 'USER']}>
      <h1>Id: {project?.id}</h1>
      <h1>title: {project?.title}</h1>
      <h1>Description: {project?.description}</h1>
    </Layout>
  )
}

export default Project
