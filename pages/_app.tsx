import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client';
import client from '../helpers/appolo-client';
import Header from '../components/Header';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Header/>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}
