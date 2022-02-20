import '../styles/globals.css'
import Layout from '../components/layout/Layout'
import type { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next';
import { AlertProvider } from '../hooks/AlertContext'



function MyApp({ Component, pageProps }: AppProps) {
 
  return (
  <AlertProvider>
  <Layout>
  <Component {...pageProps} />
  </Layout>
  </AlertProvider> 
  )
}

export default appWithTranslation(MyApp)
