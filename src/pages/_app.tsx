import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'
import { RouteGuard } from '../components/routeGuard'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <RecoilRoot>
        <RouteGuard>
          <Component {...pageProps} />
        </RouteGuard>
      </RecoilRoot>
    </ChakraProvider>
  )
}

export default MyApp
