import React, { CSSProperties, FunctionComponent } from 'react'
import styled from 'styled-components'
import { useColor } from '../../theme'

type ButtonProps = {
  text?: string
  style?: CSSProperties
}

const Button: FunctionComponent<ButtonProps> = ({ text, style, children }) => {
  const Button = styled.button({
    alignItems: 'flex-start',
    padding: '4px 8px',
    cursor: 'pointer',
    background: useColor({ color: 'primary' }),
  })

  return (
    <div
      style={{
        ...style,
      }}
    >
      <Button>{text ?? children}</Button>
    </div>
  )
}

export { Button }
