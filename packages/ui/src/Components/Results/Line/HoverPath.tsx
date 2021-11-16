import React, { useContext } from 'react'
import { useColor } from '../../../theme'
import { GraphContext } from '.'
import useThrottledCallback from '../../../hooks/useThrottledCallback'

const HoverPath = ({ amount, i, code, d, legend, points }) => {
  const context = useContext(GraphContext)
  const s = i % 3

  return (
    <>
      <path
        // @ts-ignore
        onMouseEnter={useThrottledCallback(() => {
          // @ts-ignore
          context.v = code
          global.requestAnimationFrame(
            () => context.hover && context.hover(code)
          )
        }, [context])}
        // @ts-ignore
        onMouseLeave={useThrottledCallback(() => {
          // @ts-ignore
          context.v = ''
          global.requestAnimationFrame(() => context.hover && context.hover(''))
        }, [context])}
        d={d}
        style={{
          opacity: s === 1 ? 0.3 : s === 2 ? 0.4 : 0.1,
          // @ts-ignore
          ':hover': {
            opacity: '1 !important',
          },
        }}
        fill={useColor({
          color: 'primary',
          tone: 2,
        })}
      />
    </>
  )
}

export default HoverPath
