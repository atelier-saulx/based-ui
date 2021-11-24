import React, { CSSProperties, FunctionComponent } from 'react'
import styled from 'styled-components'
import { useTheme } from '../../theme'

const StyledButton = styled.button({
  alignItems: 'flex-start',
  background: 'red', // useColor({ token: 'secondary' }),
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '15px',
  fontWeight: '500',
  letterSpacing: '-0.015em',
  lineHeight: '24px',
  margin: '6px',
  padding: '4px 8px',
})

export type ButtonProps = {
  text?: string
  style?: CSSProperties
}

export const Button: FunctionComponent<ButtonProps> = ({
  text,
  style,
  children,
}) => {
  const primaryColor = useTheme('color', 'color-primary')
  const secondaryColor = useTheme('color', 'color-secondary')

  console.log('>>>>>> primaryColor: ', primaryColor)
  console.log('>>>>>> secondaryColor: ', secondaryColor)

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
