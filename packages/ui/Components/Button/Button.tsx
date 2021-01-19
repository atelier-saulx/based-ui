import React, {
  CSSProperties,
  FunctionComponent,
  EventHandler,
  SyntheticEvent,
} from 'react'
import { useColor, Color } from '@based/theme'
import { getValue } from '@based/i18n'
import { iconFromString } from '@based/icons'
import useHover from '../../hooks/useHover'
import { Text } from '../Text/Text'

type GenericEventHandler = EventHandler<SyntheticEvent>

type ButtonProps = {
  style?: CSSProperties
  color?: Color
  foregroundColor?: Color
  submitKey?: boolean // adds a key event
  icon?: string
  onClick?: GenericEventHandler
  onHover?: GenericEventHandler
  onMouseEnter?: GenericEventHandler
}

export const Button: FunctionComponent<ButtonProps> = ({
  children,
  style,
  foregroundColor,
  color = 'primary',
  onHover,
  icon,
  onClick,
  onMouseEnter,
}) => {
  const [hover, isHover, isActive] = useHover(onHover || onMouseEnter)
  if (typeof color !== 'object') {
    color = { color }
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
    foregroundColor.intensity > 1
  ) {
    foregroundColor = {
      ...foregroundColor,
    }
    foregroundColor.intensity = Math.max(
      1,
      foregroundColor.intensity - (isActive ? 2 : 1)
    )
  }

  const Icon = icon && iconFromString(icon)
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        cursor: 'pointer',
        alignItems: 'flex-start',
        padding: children && icon ? '4px 8px 4px 4px' : '4px 8px',
        borderRadius: '4px',
        backgroundColor: useColor({
          color: c,
          alpha: color.alpha,
          intensity: isActive ? 3 : isHover ? 2 : 1,
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
        <Text noSelect singleLine variant="medium" color={foregroundColor}>
          {getValue(children)}
        </Text>
      ) : null}
    </div>
  )
}
