import '../styles/globals.css'
import useSWR, { SWRConfig } from 'swr'
import { GlobalStyle } from '../styles/styledComponentsGlobal'
import cogoToast from 'cogo-toast';

const cli = require('next/dist/cli/next-start');

cli.nextStart([
  '-p', process.env.PORT || 80,
]);

function MyApp({ Component, pageProps }) {
  return (
    <SWRConfig value={{
      onError: (error, key) => {
        cogoToast.error(error.response.data.message)
      },
      shouldRetryOnError: false,
    }}>
      <Component {...pageProps} />
      <GlobalStyle />
    </SWRConfig>
  )
}

export default MyApp
