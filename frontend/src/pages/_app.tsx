import { ChakraProvider } from '@chakra-ui/react'
import { AppProps } from 'next/app'
import { QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

import { Layout } from '../components/Layout'
import { AuthProvider } from '../providers/AuthProvider'
import { queryClient } from '../services/queryClient'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <AuthProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AuthProvider>
      </ChakraProvider>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  )
}
