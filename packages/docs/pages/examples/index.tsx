import React from 'react'
import Link from 'next/link'

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
    There are no examples yet. Check out {PlaygroundLink}.
  </div>
)

export default Examples
