import React, { CSSProperties } from 'react'

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
    </div>
  )
}


export default () => {
  return <App/>
}
