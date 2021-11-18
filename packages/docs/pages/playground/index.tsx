import React from 'react'
import { Playground as Wrapper } from '../../components/playground'

import { Title, Button, Text } from '@based/ui-next/dist'

const Playground = () => (
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
      Playground
    </Title>

    <Wrapper>
      <Button>Button</Button>
      <Title>Title</Title>
      <Text>Text</Text>
    </Wrapper>
  </div>
)

export default Playground
