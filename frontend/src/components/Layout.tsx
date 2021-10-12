import { ReactNode } from 'react'

import { useAuth } from '../hooks/useAuth'
import { prefetchAllProjects, prefetchAllUsers } from '../services/api'
import { Link } from './Link'

type LayoutProps = {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  const { me, signOut } = useAuth()

  return (
    <div>
      <h1>
        Hello {me?.name} - <button onClick={signOut}>Sign out</button>
      </h1>
      <Link href="/">Home</Link> -{' '}
      <Link href="/users" onMouseEnter={prefetchAllUsers}>
        Users
      </Link>{' '}
      -{' '}
      <Link href="/projects" onMouseEnter={prefetchAllProjects}>
        Projects
      </Link>
      {children}
    </div>
  )
}
