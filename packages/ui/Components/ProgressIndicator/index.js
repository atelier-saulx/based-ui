import React from 'react'
import { useColor } from '@based/theme'

const calcSvg = val => {
  const r = 84
  const c = Math.PI * (r * 2)
  if (val < 0) {
    val = 0
  } else if (val > 100) {
    val = 100
  }

  return ((100 - val) / 100) * c
}

export const ProgressIndicator = ({ value = 0, size = 25, style }) => {
  return (
    <div
      style={{
        width: size,
        height: size,
        '@keyframes': {
          fade: {
            '0%': {
              opacity: 0.5
            },
            '50%': {
              opacity: 1
            },
            '100%': {
              opacity: 0.5
            }
          }
        },
        animation: value > 99 ? 'fade 0.5s infinite' : '',
        ...style
      }}
    >
      <svg
        style={{
          transform: 'rotate(-90deg)'
        }}
        strokeWidth="30px"
        width={size}
        height={size}
        viewBox="0 0 200 200"
      >
        <circle
          r="84"
          cx="100"
          cy="100"
          fill="transparent"
          strokeDasharray="527.781333333"
          style={{
            stroke: useColor('default', 0.33)
          }}
        />
        <circle
          id="bar"
          r="84"
          cx="100"
          cy="100"
          fill="transparent"
          strokeDasharray="527.781333333"
          strokeDashoffset={calcSvg(value) + 'px'}
          style={{
            transition: 'stroke-dashoffset 0.5s linear',
            stroke: useColor('primary')
          }}
        />
      </svg>
    </div>
  )
}
