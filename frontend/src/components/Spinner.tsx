import { Box, Center, Spinner as ChakraSpinner } from '@chakra-ui/react'

export function Spinner() {
  return (
    <Box
      pos="fixed"
      display="flex"
      justifyContent="center"
      alignItems="center"
      top={0}
      left={0}
      right={0}
      bottom={0}
      bg="gray.100"
    >
      <Center p={4} bg="white" shadow="lg" borderRadius="2xl">
        <ChakraSpinner color="pink.500" size="md" />
      </Center>
    </Box>
  )
}
