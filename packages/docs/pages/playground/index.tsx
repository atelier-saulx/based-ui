import React from 'react'
import { Playground as Wrapper } from '../../components/playground'

import { Title, Button, ExampleComponent } from '@based/ui-next/dist'

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
      <ExampleComponent />
    </Wrapper>
  </div>
)

export default Playground
