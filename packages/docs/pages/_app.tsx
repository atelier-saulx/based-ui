import '../styles/reset.css'

import { SideMenu } from '../components/side-menu'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
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

export default MyApp
