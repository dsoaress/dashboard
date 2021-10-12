import { Badge as ChakraBadge, BadgeProps } from '@chakra-ui/react'

export function Badge({ children, colorScheme = 'pink', ...rest }: BadgeProps) {
  return (
    <ChakraBadge colorScheme={colorScheme} fontSize="0.6rem" {...rest}>
      {children}
    </ChakraBadge>
  )
}
