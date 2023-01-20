import { Html, Head, Main, NextScript } from 'next/document'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
