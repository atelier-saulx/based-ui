import React from 'react'
import { useColor } from '@based/theme'
import { getValue } from '@based/i18n'

export const Caption = ({
  size = 14,
  children,
  style,
  color = 'medium',
  singleLine
}) => {
  return (
    <div
      style={{
        fontSize: size,
        fontFamily: 'inter',
        letterSpacing: '-0.01em',
        lineHeight: '20px',
        fontWeight: 'normal',
        color: useColor(color),
        whiteSpace: singleLine ? 'nowrap' : null,
        overflow: singleLine ? 'hidden' : null,
        textOverflow: singleLine ? 'ellipsis' : null,
        ...style
      }}
    >
      {getValue(children)}
    </div>
  )
}
