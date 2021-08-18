import React, {
  FunctionComponent,
  EventHandler,
  SyntheticEvent,
  CSSProperties,
} from 'react'
import { Text } from '../Text'
import { Color, useColor } from '@based/theme'
import useHover from '../../hooks/events/useHover'
import { TextValue } from '@based/text'
import { Check } from './CheckBox'

type GenericEventHandler = EventHandler<SyntheticEvent>

export const CardOption: FunctionComponent<{
  onChange?: (value: boolean | void) => void
  label?: TextValue
  onHover?: GenericEventHandler
  value?: boolean
  style?: CSSProperties
  frameColor?: Color
}> = ({ children, onChange, value, label = '', onHover, style }) => {
  const [hover, isHover] = useHover(onHover)
  return (
    <div
      {...hover}
      onClick={() => {
        onChange(!value)
      }}
      style={{
        padding: value || isHover ? 11 : 12,
        display: 'flex',
        border:
          value || isHover
            ? '2px solid ' + useColor({ color: 'primary' })
            : '1px solid ' + useColor({ color: 'divider' }),
        alignItems: 'center',
        cursor: 'pointer',
        borderRadius: 4,
        transition: 'hover 0.15s, background-color 0.15s',
        ...style,
      }}
    >
      <Check
        overrideValue={value}
        value={value}
        disabledColor={{ color: isHover ? 'primary' : 'divider' }}
      />

      <Text
        noSelect
        singleLine
        style={{
          marginLeft: 12,
          marginRight: 16,
        }}
      >
        {label}
      </Text>

      {children || null}
    </div>
  )
}
