import { useToast as chakraToast } from '@chakra-ui/react'

export function useToast() {
  return chakraToast({
    position: 'top-right',
    variant: 'subtle',
    duration: 4000
  })
}
