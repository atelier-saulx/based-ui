import React, {
  PropsWithChildren,
  FunctionComponent,
  CSSProperties,
  ReactNode,
} from 'react'
import useOverlayPosition, {
  PositionPropsFnOptional,
} from '../../hooks/overlay/useOverlayPosition'
import { useColor, Color } from '@based/theme'
import { Text } from '../Text'
import useOverlayProps from '../../hooks/overlay/useOverlayProps'

const Arrow: FunctionComponent<{
  color?: Color
  style?: CSSProperties
  x: number
}> = ({ color = { color: 'foreground' }, style, x }) => {
  return (
    <div
      style={{
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        ...style,
      }}
    >
      <svg
        style={{
          transform: `translate3d(${x}px, 0px, 0px)`,
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

export type TooltipProps = PropsWithChildren<
  PositionPropsFnOptional & {
    style?: CSSProperties
  }
>

export const Tooltip: FunctionComponent<TooltipProps> = (initialProps) => {
  let body: ReactNode = null

  const props = useOverlayProps(initialProps)

  const {
    align = 'center',
    target,
    selectTarget,
    width = () => 'auto',
    y,
    x,
    maxY = (y, elem, _align, rect) => {
      const maxH = global.innerHeight - 30
      if (
        y + elem.height > maxH ||
        (y < rect.height + rect.top + 10 && y > rect.top - 10)
      ) {
        return y + elem.height - rect.top
      }
      return y
    },
    maxX = (x, elem, align, rect, pos) => {
      const maxW = global.innerWidth - 30
      if (x + elem.width > maxW) {
        const over = x + elem.width - maxW
        return x - over / 2 + 7.5
      }
      delete pos.correctedX
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
    },
  } = props

  const [elementRef, position] = useOverlayPosition({
    y,
    x,
    align,
    target,
    selectTarget,
    width,
    maxY,
    maxX,
  })

  let arrowX = 0

  if (position) {
    const tX = position.targetRect.left + position.targetRect.width / 2
    if (position.x + position.elementRect.width > global.innerWidth - 16) {
      arrowX = (tX - position.x) / 2
    } else if (position.correctedX) {
      arrowX = position.correctedX + tX + 7.5
    }
  }

  const type = typeof props.children

  if (type === 'string' || type === 'number') {
    body = (
      <Text weight="semibold" singleLine color={{ color: 'background' }}>
        {props.children}
      </Text>
    )
  } else {
    body = props.children
  }

  const spaceOnTop = position && position.spaceOnTop

  return (
    <div
      style={{
        opacity: position ? 1 : 0,
        width: position ? position.containerWidth : 200,
        position: 'fixed',
        top: position ? position.y : 0,
        left: position ? position.x : 0,
        bottom: position ? position.bottom : null,
        display: 'flex',
        justifyContent: align,
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          display: 'flex',
          position: 'relative',
          flexDirection: 'column',
          justifyContent: spaceOnTop ? 'flex-end' : 'flex-start',
        }}
      >
        <div
          ref={elementRef}
          style={{
            pointerEvents: 'all',
            borderRadius: 2,
            width: position ? position.width : 'auto',
            background: useColor({ color: 'foreground' }),
            padding: 10,
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
            minWidth: position ? position.minWidth : 200,
            maxHeight: 'calc(100vh-30px)',
            position: 'relative',
            boxShadow: `0px 0px 20px ${useColor({
              color: 'foreground',
              tone: 4,
              opacity: 0.8,
            })}`,
            ...props.style,
          }}
        >
          {body}
          <Arrow
            x={arrowX}
            style={{
              left: 0,
              right: 0,
              top: spaceOnTop ? null : -9,
              bottom: spaceOnTop ? -9 : null,
            }}
          />
        </div>
      </div>
    </div>
  )
}
