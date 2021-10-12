import { Avatar as ChakraAvatar, Box } from '@chakra-ui/react'
import Image from 'next/image'

type AvatarProps = {
  name: string
  avatar?: string
}

export function Avatar({ name, avatar }: AvatarProps) {
  return (
    <Box overflow="hidden" borderRadius="full" width={10} height={10}>
      {avatar ? (
        <Image src={avatar} alt={name} width={40} height={40} objectFit="cover" />
      ) : (
        <ChakraAvatar name={name} h={10} w={10} />
      )}
    </Box>
  )
}
