import React from 'react'
import { S2 } from '../Text/Subtitle'
import { useColor } from '@based/theme'

// Subtitle
export const OrderLabel = ({
  style,
  index,
  children,
  color = 'primary',
  Icon
}) => {
  return (
    <div
      style={{
        display: 'flex',
        ...style
      }}
    >
      <div
        style={{
          backgroundColor: useColor(color),
          paddingLeft: 8,
          paddingRight: 7,
          paddingTop: 6,
          paddingBottom: 6,
          borderRadius: 4,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          position: 'relative'
        }}
      >
        <div
          style={{
            width: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'absolute',
            left: 7.5,
            top: 0,
            bottom: 0
          }}
        >
          <Icon color={{ on: color }} />
        </div>
        <div style={{ width: 23 }} />
        <S2 color={{ on: color }}>{children || index + 1}</S2>
      </div>
    </div>
  )
}
