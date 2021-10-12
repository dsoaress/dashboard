import { Button, Flex, Heading, HStack } from '@chakra-ui/react'

import { useAuth } from '../hooks/useAuth'
import { prefetchAllProjects, prefetchAllUsers } from '../services/api'
import { Link } from './Link'
import { ProfileCard } from './ProfileCard'

export function Header() {
  const { signOut } = useAuth()

  return (
    <Flex justify="space-between" align="center" h={32}>
      <HStack spacing={8}>
        <Heading>LOGO</Heading>
        <Link href="/">Home</Link>
        <Link href="/users" onMouseEnter={prefetchAllUsers}>
          Users
        </Link>
        <Link href="/projects" onMouseEnter={prefetchAllProjects}>
          Projects
        </Link>
      </HStack>

      <HStack spacing={8}>
        <ProfileCard />

        <Button colorScheme="pink" variant="outline" onClick={signOut}>
          Sign out
        </Button>
      </HStack>
    </Flex>
  )
}
