import React from 'react'
import { useColor } from '@based/theme'

export const Donut = ({ size }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <circle
        cx="50"
        cy="50"
        r="40"
        fill="transparent"
        strokeWidth="15"
        stroke={useColor('primary', 0.5)}
      />
      <circle
        cx="50"
        cy="50"
        r="40"
        fill="transparent"
        strokeWidth="15"
        stroke={useColor('primary', 0.5)}
        strokeDasharray="100.2"
        strokeDashoffset="50.3"
      />
      <circle
        cx="50"
        cy="50"
        r="40"
        fill="transparent"
        strokeWidth="15"
        stroke={useColor('primary')}
        strokeDasharray="151.2"
        strokeDashoffset="50.3"
      />
    </svg>
  )
}
