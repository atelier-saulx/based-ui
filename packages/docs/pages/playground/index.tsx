import React from 'react'
import { Playground as Wrapper } from '../../components/playground'

import { Button } from '@based/ui-next/dist'
import { ExampleComponent } from '@based/ui-next/dist'

const Playground = () => (
  <div
    style={{
      padding: '20px',
    }}
  >
    <Wrapper>
      <Button>Button</Button>
      <ExampleComponent />
    </Wrapper>
  </div>
)

export default Playground
