import React, {
  useCallback,
  useContext,
  PropsWithChildren,
  useEffect,
  FunctionComponent,
  SyntheticEvent,
  CSSProperties,
} from 'react'
import useOverlayPosition from '../../hooks/overlay/useOverlayPosition'
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
import { TextValue } from '@based/text'

export type NextProps = {
  label?: TextValue
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
          paddingTop: 5,
          paddingBottom: 5,
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
          weight="medium"
          singleLine
          noSelect
          style={{
            marginLeft: 4,
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
  label?: TextValue
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
        ctx.current.merge({
          content: <Next label={label}>{children}</Next>,
        })
      }
    },
    [onClick, children, ctx]
  )
  return (
    <div
      style={{
        paddingTop: border ? 7.5 : 0,
        marginTop: border ? 7.5 : 0,
        borderColor: useColor({
          color: 'foreground',
          tone: 5,
          opacity: 0.33,
        }),
        borderStyle: 'solid',
        borderWidth: 0,
        borderTopWidth: border ? 1 : null,
      }}
    >
      <div
        {...hover}
        onClick={click}
        style={{
          display: 'flex',
          paddingTop: 5,
          paddingBottom: 5,
          paddingLeft: 8,
          paddingRight: 8,
          width: '100%',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'pointer',
          backgroundColor: isHover ? useColor({ color: 'divider' }) : null,
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
              marginLeft: !IconComponent ? 8 + 24 : 8,
              marginRight: 8,
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
    </div>
  )
}

export const Menu: FunctionComponent<GenericOverlayProps> = (initialProps) => {
  const props = useOverlayProps(initialProps)

  const { align, target, selectTarget, width = 256, y, x, maxY, maxX } = props
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

  const ctx = useContext(OverlayContext)

  useEffect(() => {
    const x = () => {
      resize()
      setTimeout(() => resize, 200)
    }
    ctx.current.listeners.add(x)
    return () => {
      ctx.current.listeners.delete(x)
    }
  }, [ctx, resize])

  const content = props.content

  return (
    <Shared
      width={props.width}
      ref={elementRef}
      position={position}
      align={align}
    >
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
