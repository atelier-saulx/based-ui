import type { NextPage } from 'next'

import { Example } from '../../ui-next/dist'

const Home: NextPage = () => {
  return (
    <div>
      <div
        style={{
          width: 'auto',
          maxWidth: '800px',
          height: 'auto',
          margin: '0 auto',
          marginTop: '40px',
        }}
      >
        <h1>Playground</h1>

        <div>
          <Example />
        </div>
      </div>
    </div>
  )
}

export default Home
