import React, {
  useCallback,
  useContext,
  PropsWithChildren,
  FunctionComponent,
  EventHandler,
  SyntheticEvent,
  CSSProperties,
} from 'react'
import useOverlayPosition, {
  PositionPropsFn,
} from '../../hooks/overlay/useOverlayPosition'
import useOverlayProps, {
  OverlayContext,
} from '../../hooks/overlay/useOverlayProps'
import { useColor } from '@based/theme'
import {
  ChevronRight,
  ChevronLeft,
  iconFromString,
  IconName,
  IconProps,
} from '@based/icons'
import { Text } from '../Text'
import useHover from '../../hooks/events/useHover'
import Shared from './Shared'
import { removeOverlay } from './index'
import { GenericOverlayProps } from './GenericOverlay'

export type NextProps = {
  label?: string
}

const Next: FunctionComponent<NextProps> = ({ label, children }) => {
  const [hover, isHover] = useHover()
  const ctx = useContext(OverlayContext)

  return (
    <div>
      <div
        {...hover}
        onClick={useCallback(() => {
          ctx.current.merge({ content: undefined })
        }, [])}
        style={{
          display: 'flex',
          paddingTop: 10,
          paddingBottom: 10,
          paddingLeft: 15,
          paddingRight: 15,
          width: '100%',
          alignItems: 'center',
          cursor: 'pointer',
          backgroundColor: isHover
            ? useColor({ color: 'foreground', opacity: 0.05 })
            : null,
        }}
      >
        <ChevronLeft />
        <Text
          weight="semibold"
          singleLine
          noSelect
          style={{
            marginLeft: 14,
          }}
        >
          {label}
        </Text>
      </div>
      {children}
    </div>
  )
}

export type ContextualMenuItemProps = {
  icon?: IconName
  label?: string
  onClick?: (
    e: Event | SyntheticEvent,
    selectionProps?: PropsWithChildren<any>
  ) => boolean | void
  style?: CSSProperties
  border?: boolean
}

export const ContextualMenuItem: FunctionComponent<ContextualMenuItemProps> = ({
  icon,
  label,
  children,
  onClick,
  style,
  border,
}) => {
  let IconComponent: FunctionComponent<IconProps>
  if (icon) {
    IconComponent = iconFromString(icon)
  }
  const [hover, isHover] = useHover()

  const ctx = useContext(OverlayContext)

  const click = useCallback(
    (e) => {
      if (onClick) {
        if (!onClick(e)) {
          removeOverlay()
        }
      } else {
        console.log('CONTENT')

        ctx.current.merge({
          content: <Next label={label}>{children}</Next>,
        })
      }
    },
    [onClick, children, ctx]
  )
  return (
    <div
      {...hover}
      onClick={click}
      style={{
        display: 'flex',
        paddingTop: border ? 15 : 10,
        paddingBottom: 10,
        paddingLeft: 15,
        paddingRight: 15,
        marginTop: border ? 10 : 0,
        borderColor: useColor({ color: 'foreground', tone: 5, opacity: 0.33 }),
        borderStyle: 'solid',
        borderWidth: 0,
        borderTopWidth: border ? 1 : null,
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        cursor: 'pointer',
        backgroundColor: isHover
          ? useColor({ color: 'foreground', tone: 5, opacity: 0.33 })
          : null,
        ...style,
      }}
    >
      <div
        style={{
          display: 'flex',
        }}
      >
        {IconComponent ? (
          <IconComponent color={{ color: 'foreground', tone: 2 }} />
        ) : null}
        <Text
          style={{
            marginLeft: 14,
            marginRight: 15,
          }}
          singleLine
          noSelect
        >
          {label}
        </Text>
      </div>
      {children && !onClick ? (
        <ChevronRight color={{ color: 'foreground', tone: 3 }} />
      ) : null}
    </div>
  )
}

export const Menu: FunctionComponent<GenericOverlayProps> = (initialProps) => {
  const props = useOverlayProps(initialProps)

  const {
    align,
    target,
    selectTarget,
    width = () => 300,
    y,
    x,
    maxY = (y, elem, _align, rect) => {
      if (y > global.innerHeight / 2) {
        return y - elem.height - 25 - rect.height
      }

      const maxH = global.innerHeight - 30
      if (y + elem.height > maxH) {
        const over = y + elem.height - maxH
        return y - over
      }

      return y
    },
    maxX,
  } = props
  const [elementRef, position, resize] = useOverlayPosition({
    align,
    y,
    x,
    target,
    selectTarget,
    width,
    maxY,
    maxX,
  })

  let content = props.content

  console.log('CONTENT', content)

  return (
    <Shared width={300} ref={elementRef} position={position} align={align}>
      <div
        style={{
          display: 'flex',
          transition: 'transform 0.15s',
          transform: content
            ? 'translate3d(-100%,0px,0px)'
            : `translate3d(0px,0px,0px)`,
        }}
      >
        <div
          style={{
            // opacity: content ? 0 : 1,
            // transition: 'opacity 0.4s',
            minWidth: '100%',
          }}
        >
          {React.createElement(props.Component, {
            resize,
            position,
            ...props,
          })}
        </div>
        <div
          style={{
            minWidth: '100%',
          }}
        >
          {content}
        </div>
      </div>
    </Shared>
  )
}
