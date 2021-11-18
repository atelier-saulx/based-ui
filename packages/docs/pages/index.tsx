import type { NextPage } from 'next'
import Link from 'next/link'

import { Title } from '@based/ui-next/dist'

const Home: NextPage = () => {
  const ExamplesLink = (
    <Link href="/examples">
      <a style={{ color: 'blue' }}>Examples</a>
    </Link>
  )

  const PlaygroundLink = (
    <Link href="/playground">
      <a style={{ color: 'blue' }}>Playground</a>
    </Link>
  )

  return (
    <div>
      <div
        style={{
          padding: '20px',
        }}
      >
        <Title
          fontWeight="bold"
          style={{
            marginBottom: '20px',
          }}
        >
          Introduction to Based-UI
        </Title>

        <p>
          Based-UI is a component-suite to enrich your web applications, or to
          create CMS/DMS interfaces.
        </p>

        <div style={{ marginTop: '30px' }}>
          <p>To see our component suite, go to {ExamplesLink}.</p>
          <p style={{ marginTop: '10px' }}>
            To play around with the components, go to {PlaygroundLink}.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Home
