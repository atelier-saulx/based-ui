import React, {
  CSSProperties,
  FunctionComponent,
  EventHandler,
  SyntheticEvent,
  useRef,
  useEffect,
  useCallback,
} from 'react'
import { useColor, Color } from '@based/theme'
import { getValue } from '@based/i18n'
import { iconFromString } from '@based/icons'
import useHover from '../../hooks/useHover'
import { Text } from '../Text/Text'
import { useKeyUp, Key } from '../../hooks/useKeyboard'

type GenericEventHandler = EventHandler<SyntheticEvent>

type ButtonProps = {
  style?: CSSProperties
  color?: Color
  foregroundColor?: Color
  actionKeys?: Key[] // adds a key event
  icon?: string
  onClick?: GenericEventHandler
  onHover?: GenericEventHandler
  onMouseEnter?: GenericEventHandler
}

export const Button: FunctionComponent<ButtonProps> = ({
  children,
  style,
  foregroundColor,
  color = { color: 'primary' },
  onHover,
  icon,
  actionKeys,
  onClick,
  onMouseEnter,
}) => {
  const [hover, isHover, isActive] = useHover(onHover || onMouseEnter)
  let ref

  if (actionKeys && onClick) {
    ref = useRef()
    useEffect(() => {
      if (ref.timeout) {
        clearTimeout(ref.timeout)
      }
    }, [])
    const onKeyUp = useCallback(
      (x: any) => {
        if (hover.onMouseDown) {
          hover.onMouseDown(x)
          ref.timeout = setTimeout(() => {
            hover.onMouseUp(x)
          }, 100)
        }
        onClick(x)
      },
      [onClick]
    )
    useKeyUp(onKeyUp, ref, actionKeys)
  }

  const c = color.color

  if (!foregroundColor) {
    if (c === 'primary' || c === 'secondary') {
      foregroundColor = { color: 'background' }
    } else if (c === 'primaryAccent') {
      foregroundColor = { color: 'primary' }
    } else if (c === 'foreground') {
      foregroundColor = { color: 'background' }
    } else if (c === 'secondaryAccent') {
      foregroundColor = { color: 'secondary' }
    }
  } else if (typeof foregroundColor !== 'object') {
    foregroundColor = { color: foregroundColor }
  }

  if (
    isHover &&
    typeof foregroundColor === 'object' &&
    foregroundColor.scale > 1
  ) {
    foregroundColor = {
      ...foregroundColor,
      scale: Math.max(
        1,
        foregroundColor.scale - (isActive ? 2 : isHover ? 1 : 0)
      ),
    }
  }

  const Icon = icon && iconFromString(icon)
  return (
    <div
      ref={ref}
      style={{
        display: 'flex',
        flexDirection: 'row',
        cursor: 'pointer',
        alignItems: 'flex-start',
        padding: children && icon ? '4px 8px 4px 4px' : '4px 8px',
        borderRadius: '4px',
        backgroundColor: useColor({
          color: color.color,
          opacity: color.opacity,
          scale: isActive ? 3 : isHover ? 2 : 1,
        }),
        ...style,
      }}
      onClick={onClick}
      {...hover}
    >
      {Icon ? (
        <Icon
          style={{ marginRight: !children ? 0 : 4 }}
          color={foregroundColor}
        />
      ) : null}
      {children ? (
        <Text noSelect singleLine weight="medium" color={foregroundColor}>
          {getValue(children)}
        </Text>
      ) : null}
    </div>
  )
}
