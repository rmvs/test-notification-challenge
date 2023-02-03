import { store } from '@/store'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { Layout } from '@/components/layout'

export default function App({ Component, pageProps }: AppProps) {

  const items = [
    {
        key: 'submission',
        label: 'Submission',
    },
    {
        key: 'log',
        label: 'Log History'
    }
  ];
  
  return (<Provider store={store}>
            <Layout items={items}>
              <Component {...pageProps} />
            </Layout>
          </Provider>
    )
}
