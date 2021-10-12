import { Box } from '@chakra-ui/react'
import { ReactNode } from 'react'

import { Header } from './Header'

type LayoutProps = {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <Box mx="auto" px={8} maxW="container.lg">
      <Header />
      {children}
    </Box>
  )
}
