import '../styles/globals.css'
import useSWR, { SWRConfig } from 'swr'
import { GlobalStyle } from '../styles/styledComponentsGlobal'

function MyApp({ Component, pageProps }) {
  return (
    <SWRConfig>
      <Component {...pageProps} />
      <GlobalStyle />
    </SWRConfig>
  )
}

export default MyApp
