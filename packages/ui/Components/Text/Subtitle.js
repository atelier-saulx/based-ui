import React from 'react'
import { useColor } from '@based/theme'
import { getValue } from '@based/i18n'

/*
singleline

*/

export const Subtitle = ({
  size = 16,
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
        fontWeight: 600,
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

export const S1 = props => {
  return <Subtitle size={16} {...props} />
}

export const S2 = props => {
  return <Subtitle size={14} {...props} />
}
