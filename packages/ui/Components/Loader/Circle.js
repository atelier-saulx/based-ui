import React, { useEffect, useState } from 'react'
import { useColor } from '@based/theme'

const createSvgCircle = style => (
  <circle cx="16" cy="16" fill="none" r="14" strokeWidth="4" style={style} />
)

export default ({ style, size = 20, color = 'default', delay = 0, fadeIn }) => {
  const stroke = useColor(color)

  const [ready, setReady] = useState(!fadeIn && !delay)
  useEffect(() => {
    const timer = setTimeout(() => {
      setReady(true)
    }, delay)
    return () => {
      clearTimeout(timer)
    }
  }, [])

  const svg = (
    <svg viewBox="0 0 32 32" width={size} height={size}>
      {createSvgCircle({
        stroke,
        opacity: 0.2
      })}
      {createSvgCircle({
        stroke,
        strokeDasharray: 80,
        strokeDashoffset: 60
      })}
    </svg>
  )
  return (
    <div
      style={{
        opacity: ready ? 1 : 0,
        transition: 'opacity 0.5s',
        maxWidth: size,
        minWidth: size,
        width: size,
        height: size,
        animationDuration: '1s',
        animationTimingFunction: 'linear',
        animationIterationCount: 'infinite',
        animationName: 'rotate',
        '@keyframes': {
          rotate: {
            '0%': { transform: 'rotate(0deg)' },
            '100%': { transform: 'rotate(360deg)' }
          }
        },
        ...style
      }}
    >
      {svg}
    </div>
  )
}
