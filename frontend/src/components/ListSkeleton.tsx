import { Skeleton, Stack } from '@chakra-ui/react'

type ListSkeletonProps = {
  items: number
  height: string
}

export function ListSkeleton({ items, height }: ListSkeletonProps) {
  return (
    <Stack spacing={4}>
      {[...Array(items)].map((_, i) => (
        <Skeleton height={height} borderRadius="md" key={i} />
      ))}
    </Stack>
  )
}
