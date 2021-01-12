import React from 'react'
import { useColor } from '@based/theme'
import { getValue } from '@based/i18n'

export const Overline = ({
  size = 12,
  children,
  style,
  color = 'default',
  singleLine
}) => {
  return (
    <div
      style={{
        fontSize: size,
        fontFamily: 'inter',
        fontWeight: '600',
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
