import '../styles/globals.scss'
import Head from 'next/head'
import { ThemeProvider } from '@fluentui/react'

const style = { background: "url('/image.png')", height: '100vh' }

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider style={style}>
      <Head>
        <title>Analityco</title>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <Component {...pageProps} />
    </ThemeProvider>
    )
}

export default MyApp
