import { Flex } from '@chakra-ui/react'
import { ReactNode } from 'react'

type CardProps = {
  children: ReactNode
}

export function Card({ children }: CardProps) {
  return (
    <Flex
      p={2}
      align="center"
      border="1px"
      borderColor="gray.200"
      borderRadius="md"
      cursor="pointer"
      transition="ease-in"
      transitionDuration="200ms"
      _hover={{ bg: 'gray.100' }}
    >
      {children}
    </Flex>
  )
}
