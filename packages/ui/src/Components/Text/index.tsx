import React, { CSSProperties, FunctionComponent } from 'react'

type TextProps = {
  value?: string
  style?: CSSProperties
  fontWeight?: 'regular' | 'medium' | 'semibold'
}

export const Text: FunctionComponent<TextProps> = ({
  children,
  value = '',
  style = {},
  fontWeight = 'normal',
}) => {
  return (
    <div
      style={{
        fontSize: '15px',
        lineHeight: '24px',
        letterSpacing: '-0.015em',
        userSelect: 'text',
        fontWeight:
          fontWeight === 'semibold'
            ? 600
            : fontWeight === 'medium'
            ? 500
            : 'normal',
        ...style,
      }}
    >
      {children ?? value}
    </div>
  )
}
