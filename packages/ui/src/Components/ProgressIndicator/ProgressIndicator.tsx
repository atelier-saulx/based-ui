import React, { FunctionComponent, CSSProperties } from 'react'
import { useColor } from '@based/theme'

const calcSvg = (val) => {
  const r = 84
  const c = Math.PI * (r * 2)
  if (val < 0) {
    val = 0
  } else if (val > 100) {
    val = 100
  }

  return ((100 - val) / 100) * c
}

type ProgressIndicatorProps = {
  value: number
  size?: number
  style?: CSSProperties
}

export const ProgressIndicator: FunctionComponent<ProgressIndicatorProps> = ({
  value = 0,
  size = 25,
  style,
}) => {
  return (
    <div
      style={{
        width: size,
        height: size,
        animationDuration: '0.5s',
        animationIterationCount: value > 99 ? 'infinite' : null,
        // @ts-ignore
        '@keyframes': {
          // fade: {
          '0%': {
            opacity: 0.5,
          },
          '50%': {
            opacity: 1,
          },
          '100%': {
            opacity: 0.5,
          },
          // },
        },
        ...style,
      }}
    >
      <svg
        style={{
          transform: 'rotate(-90deg)',
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
            stroke: useColor({ color: 'foreground', opacity: 0.33 }),
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
            stroke: useColor({ color: 'primary' }),
          }}
        />
      </svg>
    </div>
  )
}
