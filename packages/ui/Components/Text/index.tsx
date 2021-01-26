import React, { CSSProperties, FunctionComponent } from 'react'
import { useColor, Color } from '@based/theme'
import { getValue } from '@based/i18n'

type BodyProps = {
  style?: CSSProperties
  color?: Color
  noSelect?: boolean
  singleLine?: boolean
  overflow?: boolean
  weight?: 'regular' | 'medium' | 'semibold'
}

export const Text: FunctionComponent<BodyProps> = ({
  children,
  style,
  color = { color: 'foreground' },
  noSelect,
  singleLine,
  weight = 'regular'
}) => {
  return (
    <div
      style={{
        fontSize: '15px',
        lineHeight: '24px',
        fontWeight:
          weight === 'semibold' ? 600 : weight === 'medium' ? 500 : 'normal',
        userSelect: noSelect ? 'none' : 'text',
        color: useColor(color),
        letterSpacing: '-0.015em',
        whiteSpace: singleLine ? 'nowrap' : null,
        overflow: singleLine ? 'hidden' : null,
        textOverflow: singleLine ? 'ellipsis' : null,
        ...style,
      }}
    >
      {getValue(children)}
    </div>
  )
}
