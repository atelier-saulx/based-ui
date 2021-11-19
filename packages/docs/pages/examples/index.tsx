import Link from 'next/link'

import { Title } from '@based/ui-next'

const PlaygroundLink = (
  <Link href="/playground">
    <a style={{ color: 'orange' }}>Playground</a>
  </Link>
)

const Examples = () => (
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
      Examples
    </Title>

    <p>There are no examples yet. Check out {PlaygroundLink}.</p>
  </div>
)

export default Examples
