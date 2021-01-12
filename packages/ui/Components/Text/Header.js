import React from 'react'
import { useColor } from '@based/theme'
import { getValue } from '@based/i18n'

export const Header = ({
  size = 60,
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
        fontWeight: 'bold',
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

export const H1 = props => {
  return <Header size={60} {...props} />
}

export const H2 = props => {
  return <Header size={48} {...props} />
}

export const H3 = props => {
  return <Header size={34} {...props} />
}

export const H4 = props => {
  return <Header size={24} {...props} />
}

export const H5 = props => {
  return <Header size={20} {...props} />
}

export const H6 = props => {
  return <Header size={18} {...props} />
}
