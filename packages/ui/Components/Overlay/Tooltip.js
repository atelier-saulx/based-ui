import React, { forwardRef } from 'react'
import useOverlay from '../../hooks/useOverlayPosition'
import { useColor } from '@based/theme'
import { Subtitle } from '../Text/Subtitle'

// maybe make this with a context for inverse

const Arrow = ({ color = 'default', style, x }) => {
  return (
    <div
      style={{
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        ...style
      }}
    >
      <svg
        style={{
          transform: `translate3d(${x}px, 0px, 0px)`
        }}
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
      >
        <rect
          y="9.0293"
          width="12.083"
          height="12.083"
          rx="2"
          transform="rotate(-45 0 9.0293)"
          fill={useColor(color)}
        />
      </svg>
    </div>
  )
}

export const Tooltip = forwardRef((props, ref) => {
  let body

  const {
    align = 'center',
    children,
    target,
    selectTarget,
    width = () => 'auto',
    y,
    x,
    maxY = (y, elem, _align, rect) => {
      const maxH = global.innerHeight - 30
      if (
        y + elem.height > maxH ||
        (y < rect.height + rect.y + 10 && y > rect.y - 10)
      ) {
        return y + elem.height - rect.y
      }
      return y
    },
    maxX = (x, elem, align, rect, pos) => {
      const maxW = global.innerWidth - 30
      if (x + elem.width > maxW) {
        const over = x + elem.width - maxW
        return x - over / 2 + 7.5
      }
      pos.correctedX = false
      if (align === 'center') {
        const diff = pos.containerWidth - elem.width
        if (x + diff < 15) {
          pos.correctedX = diff
          return (-1 * diff) / 2 + 15
        }
      }

      if (x < 15) {
        return 15
      }
      return x
    }
  } = props

  const [elementRef, position, childrenState] = useOverlay(
    {
      y,
      x,
      align,
      children,
      target,
      selectTarget,
      width,
      maxY,
      maxX
    },
    ref
  )

  let arrowX = 0

  // how to do it
  if (position) {
    const tX = position.targetRect.x + position.targetRect.width / 2

    if (
      // position.x < 16 ||
      position.x + position.elementRect.width >
      global.innerWidth - 16
    ) {
      arrowX = (tX - position.x) / 2
    } else if (position.correctedX) {
      // width

      arrowX = position.correctedX + tX + 7.5
    }
  }

  const type = typeof childrenState

  if (type === 'string' || type === 'number') {
    body = <Subtitle color={{ on: 'default' }}>{childrenState}</Subtitle>
  } else {
    body = childrenState
  }

  const spaceOnTop = position && position.spaceOnTop

  return (
    <div
      style={{
        opacity: position ? 1 : 0,
        width: position ? position.containerWidth : 150,
        position: 'fixed',
        top: position ? position.y : 0,
        left: position ? position.x : 0,
        bottom: position ? position.bottom : null,
        display: 'flex',
        justifyContent: align,
        pointerEvents: 'none'
      }}
    >
      <div
        style={{
          display: 'flex',
          position: 'relative',
          flexDirection: 'column',
          justifyContent: spaceOnTop ? 'flex-end' : 'flex-start'
        }}
      >
        <div
          ref={elementRef}
          style={{
            pointerEvents: 'all',
            borderRadius: 6,
            width: position ? position.width : 'auto',
            background: useColor('default'),
            padding: 15,
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
            minWidth: props.minWidth || 175,
            maxHeight: 'calc(100vh-30px)',
            position: 'relative',
            boxShadow: `0px 0px 20px ${useColor('shadow', 0.1)}`
          }}
        >
          {body}
          <Arrow
            x={arrowX}
            style={{
              left: 0,
              right: 0,
              top: spaceOnTop ? null : -9,
              bottom: spaceOnTop ? -9 : null
            }}
          />
        </div>
      </div>
    </div>
  )
})
