import React from 'react'
import { useColor } from '@based/theme'
import { getValue } from '@based/i18n'

export const Body = ({
  size = 16,
  children,
  style,
  color = 'default',
  noSelect,
  singleLine
}) => {
  return (
    <div
      style={{
        fontSize: size,
        fontFamily: 'inter',
        fontWeight: 'normal',
        userSelect: noSelect ? 'none' : 'text',
        color: useColor(color),
        whiteSpace: singleLine ? 'nowrap' : null,
        overflow: singleLine ? 'hidden' : null,
        textOverflow: singleLine ? 'ellipsis' : null,
        ...style
        // letterSpacing: ''
      }}
    >
      {getValue(children)}
    </div>
  )
}

export const B1 = props => {
  return <Body size={16} {...props} />
}

export const B2 = props => {
  return <Body size={14} {...props} />
}
