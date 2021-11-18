import React, { CSSProperties, FunctionComponent } from 'react'

type TextProps = {
  value?: string
  style?: CSSProperties
}

export const Text: FunctionComponent<TextProps> = ({
  children,
  value = '',
  style = {},
}) => {
  return (
    <div
      style={{
        fontSize: '15px',
        lineHeight: '24px',
        letterSpacing: '-0.015em',
        fontWeight: 'normal',
        userSelect: 'text',
        ...style,
      }}
    >
      {children ?? value}
    </div>
  )
}
