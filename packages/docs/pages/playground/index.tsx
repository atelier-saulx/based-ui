import React from 'react'
import { Playground as Wrapper } from '../../components/playground'

import { Button } from '@based/ui-next/dist'
import { ExampleComponent } from '@based/ui-next/dist'

const Playground = () => (
  <>
    <Wrapper>
      <Button>Button</Button>
      <ExampleComponent />
    </Wrapper>
  </>
)

export default Playground
