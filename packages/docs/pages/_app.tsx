import '../styles/reset.css'
import '../styles/font.css'

import type { AppProps } from 'next/app'

import Head from 'next/head'
import { SideMenu } from '../components/side-menu'

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Based-UI Documentation</title>
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1.0, minimum-scale=1.0, viewport-fit=cover"
        />
        <meta
          property="og:title"
          content="Based-UI Documentation"
          key="title"
        />
      </Head>

      <div
        style={{
          display: 'flex',
          width: '100vw',
          height: '100vh',
        }}
      >
        <SideMenu />

        <div
          style={{
            position: 'relative',
            width: '100vw',
            height: '100vh',
            padding: '10px',
          }}
        >
          <Component {...pageProps} />
        </div>
      </div>
    </>
  )
}

export default App
