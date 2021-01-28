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
import { getTextValue, TextValue } from '@based/i18n'
import { iconFromString, IconName } from '@based/icons'
import useHover from '../../hooks/events/useHover'
import { Text } from '../Text'
import { useKeyUp, Key } from '../../hooks/events/useKeyboard'

type GenericEventHandler = EventHandler<SyntheticEvent>

type ButtonProps = {
  style?: CSSProperties
  color?: Color
  foregroundColor?: Color
  actionKeys?: Key[] // adds a key event
  icon?: IconName
  children?: TextValue
  onClick?: GenericEventHandler
  onHover?: GenericEventHandler
  onMouseEnter?: GenericEventHandler
  onContextMenu?: GenericEventHandler
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
  onContextMenu,
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

  if (!color.tone) {
    color.tone = 1
  }

  if (
    isHover &&
    typeof foregroundColor === 'object' &&
    foregroundColor.tone > 1
  ) {
    foregroundColor = {
      ...foregroundColor,
      tone: Math.max(
        1,
        foregroundColor.tone - (isActive ? 2 : isHover ? 1 : 0)
      ),
    }
  }

  const Icon = icon && iconFromString(icon)
  return (
    <div style={{ display: 'flex', ...style }}>
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
            tone: isActive
              ? color.tone + 2
              : isHover
              ? color.tone + 1
              : color.tone,
          }),
        }}
        onClick={onClick}
        {...hover}
        onContextMenu={onContextMenu}
      >
        {Icon ? (
          <Icon
            style={{ marginRight: !children ? 0 : 4 }}
            color={foregroundColor}
          />
        ) : null}
        {children ? (
          <Text noSelect singleLine weight="medium" color={foregroundColor}>
            {getTextValue(children)}
          </Text>
        ) : null}
      </div>
    </div>
  )
}
