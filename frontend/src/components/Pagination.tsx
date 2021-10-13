import { Button, HStack, Text } from '@chakra-ui/react'
import { Dispatch, SetStateAction } from 'react'

type PaginationProps = {
  page: number
  setPage: Dispatch<SetStateAction<number>>
  isPreviousData: boolean
  hasMore?: boolean
}

export function Pagination({ page, setPage, isPreviousData, hasMore }: PaginationProps) {
  function previousPage() {
    setPage(old => old - 1)
  }

  function nextPage() {
    if (!isPreviousData) {
      setPage(old => old + 1)
    }
  }

  return (
    <HStack spacing={4} py={8}>
      <Button colorScheme="pink" onClick={previousPage} disabled={page === 1}>
        Previous Page
      </Button>
      <Button colorScheme="pink" onClick={nextPage} disabled={isPreviousData || !hasMore}>
        Next Page
      </Button>
      <Text>Page: {page}</Text>
    </HStack>
  )
}
