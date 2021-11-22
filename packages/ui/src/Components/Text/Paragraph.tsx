import React, { CSSProperties, FunctionComponent } from 'react'

type TextProps = {
  value?: string
  style?: CSSProperties
  fontWeight?: 'regular' | 'medium' | 'semibold' | 'bold'
}

const Paragraph: FunctionComponent<TextProps> = ({
  children,
  value = '',
  style = {},
  fontWeight = 'normal',
}) => {
  const targetWeight =
    fontWeight === 'bold'
      ? 700
      : fontWeight === 'semibold'
      ? 600
      : fontWeight === 'medium'
      ? 500
      : 'normal'

  return (
    <div
      style={{
        fontSize: '16px',
        fontWeight: targetWeight,
        letterSpacing: '-0.015em',
        lineHeight: '20px',
        userSelect: 'text',
        ...style,
      }}
    >
      {children ?? value}
    </div>
  )
}

export { Paragraph }
