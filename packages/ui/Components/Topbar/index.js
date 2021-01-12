import React from 'react'
import { useColor } from '@based/theme'

export default ({ children, style }) => {
  return (
    <div
      style={{
        paddingTop: 12.5,
        paddingBottom: 12.5,
        paddingLeft: 15,
        paddingRight: 15,
        height: 60,
        minHeight: 60,
        maxHeight: 60,
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'space-between',
        borderBottom: '1px solid ' + useColor('outline'),
        ...style
      }}
    >
      {children}
    </div>
  )
}
