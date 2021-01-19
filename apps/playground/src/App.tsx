import React, { CSSProperties } from 'react'

import { Graph , WelcomeScreen } from '@based/icons'

import { useTheme } from '@based/theme'

import { Text, SubText, Title } from '@based/ui'

const Bla = ({ style }: { style?: CSSProperties }) => {
  return <div style={{ ...style, background: 'red' }}>gurky</div>
}

const App = () => {  
  useTheme()
  return (
    <div>
      <Graph />
      <Graph color="primary" />
      <Graph color="secondaryAccent" />
      <Graph framed />
      <WelcomeScreen framed />
      <WelcomeScreen color="primaryAccent" />
      <Text variant="regular">
        Nuno is very nice man
      </Text>
      <Text variant="medium">
        Nuno is very nice man
      </Text>
      <Text variant="semibold">
        Nuno is very nice man
      </Text>
      <Title variant="regular">
        Nuno is very nice man
      </Title>
      <Title variant="small">
        Nuno is very nice man
      </Title>
      <SubText>
        Nuno is very nice man
      </SubText>
    </div>
  )
}

// <WelcomeScreen color="secondary"/>

export default () => {
  return <App/>
}
