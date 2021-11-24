/* eslint-disable no-console */

import React, { CSSProperties, FunctionComponent } from 'react'
import styled from 'styled-components'
import { useColor, useSize, useTheme } from '../../theme'

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
  const themePrimaryColor = useTheme('color', 'color-primary')
  const themeSecondaryColor = useTheme('color', 'color-secondary')
  const themeTertiaryColor = useTheme('color', 'color-tertiary')

  const themeSizeLarge = useTheme('size', 'size-lg')

  const primaryColor = useColor('color-primary')
  const secondaryColor = useColor('color-secondary')
  const tertiaryColor = useColor('color-tertiary')

  const sizeSmall = useSize('size-sm')
  const sizeMedium = useSize('size-md')

  console.log('>>>>>> themePrimaryColor: ', themePrimaryColor)
  console.log('>>>>>> themeSecondaryColor: ', themeSecondaryColor)
  console.log('>>>>>> themeTertiaryColor: ', themeTertiaryColor)

  console.log('>>>>>> themeSizeLarge: ', themeSizeLarge)

  console.log('>>>>>> primaryColor: ', primaryColor)
  console.log('>>>>>> secondaryColor: ', secondaryColor)
  console.log('>>>>>> tertiaryColor: ', tertiaryColor)

  console.log('>>>>>> sizeSmall: ', sizeSmall)
  console.log('>>>>>> sizeMedium: ', sizeMedium)

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
