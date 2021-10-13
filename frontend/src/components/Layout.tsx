import { Box } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'

import { useCan } from '../hooks/useCan'
import { Role } from '../types/User'
import { Header } from './Header'

type LayoutProps = {
  children: ReactNode
  roles?: Role[]
}

export function Layout({ children, roles }: LayoutProps) {
  const router = useRouter()
  const userCanSeeComponents = useCan({ roles })

  if (!userCanSeeComponents) {
    router.push('/')
  }

  return (
    <Box mx="auto" px={8} maxW="container.lg">
      <Header />
      {children}
    </Box>
  )
}
