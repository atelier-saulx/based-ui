import React, {
  FunctionComponent,
  CSSProperties,
  useEffect,
  useState,
} from 'react'
import { useColor, ColorKey } from '@based/theme'

type LoaderProps = {
  style?: CSSProperties
  size?: number
  color?: ColorKey
  delay?: number
  fadeIn?: boolean
}

export const Loader: FunctionComponent<LoaderProps> = ({
  style,
  size = 20,
  color = 'foreground',
  delay = 0,
  fadeIn,
}) => {
  const stroke = useColor({ color })

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
      <circle
        cx="16"
        cy="16"
        fill="none"
        r="14"
        strokeWidth="4"
        style={{
          stroke,
          opacity: 0.2,
        }}
      />
      <circle
        cx="16"
        cy="16"
        fill="none"
        r="14"
        strokeWidth="4"
        style={{
          stroke,
          strokeDasharray: 80,
          strokeDashoffset: 60,
        }}
      />
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
        // TODO: Needs @keyframes to be added
        // @ts-ignore
        //'@keyframes': {
        //  rotate: {
        //    '0%': { transform: 'rotate(0deg)' },
        //    '100%': { transform: 'rotate(360deg)' },
        //  },
        //},
        ...style,
      }}
    >
      {svg}
    </div>
  )
}
