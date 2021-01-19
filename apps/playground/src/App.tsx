import React, { CSSProperties } from 'react'

import { Graph , WelcomeScreen } from '@based/icons'

import { useTheme } from '@based/theme'

import { Code } from '@based/ui'

const Bla = ({ style }: { style?: CSSProperties }) => {
  return <div style={{ ...style, background: 'red' }}>gurky</div>
}

const App = () => {  
  useTheme()
  return (
    <div>
      blurx for nuno
      <Bla />
      <Code />
      <Graph />
      <Graph color="primary" />
      <Graph color="secondary" />
      <Graph framed />
      <WelcomeScreen framed />
      <WelcomeScreen color="secondary"/>
    </div>
  )
}

export default () => {
  return <App/>
}
