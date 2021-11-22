import React, { CSSProperties, FunctionComponent } from 'react'
import styled from 'styled-components'
import { useColor } from '../../theme'

type ButtonProps = {
  text?: string
  style?: CSSProperties
}

const StyledButton = styled.button({
  alignItems: 'flex-start',
  padding: '4px 8px',
  cursor: 'pointer',
  background: useColor({ color: 'primary' }),
})

const Button: FunctionComponent<ButtonProps> = ({ text, style, children }) => {
  return (
    <div
      style={{
        ...style,
      }}
    >
      <StyledButton>{text ?? children}</StyledButton>
    </div>
  )
}

export { Button }
