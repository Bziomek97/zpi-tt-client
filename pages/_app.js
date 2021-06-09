import '../styles/globals.scss'
import { ThemeProvider } from '@fluentui/react'

const style = { background: "url('/image.png')", height: '100vh' }

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider style={style}>
      <Component {...pageProps} />
    </ThemeProvider>
    )
}

export default MyApp
