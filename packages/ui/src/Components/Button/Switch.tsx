import React, { FunctionComponent, CSSProperties, useCallback } from 'react'
import { useColor, Color } from '@based/theme'
import { OnValueChange } from '../../types'
import useInputValue from '../../hooks/useInputValue'
import { TextValue } from '@based/text'
import { Text } from '../Text'
import '@compiled/react'

export type SwitchProps = {
  color?: Color
  onChange: OnValueChange<boolean>
  value?: boolean
  style?: CSSProperties
  identifier?: any
}

export const Switch: FunctionComponent<
  SwitchProps & { ignoreInternal?: boolean }
> = ({
  onChange,
  color = { color: 'primary' },
  ignoreInternal,
  value,
  identifier,
  style,
}) => {
  let enabled, setValue
  if (!ignoreInternal) {
    ;[enabled, setValue] = useInputValue(value, identifier, false)
  } else {
    enabled = value
  }

  return (
    <div
      style={{
        backgroundColor: useColor({
          color: enabled ? color.color : 'foreground',
          opacity: enabled ? 1 : 0.5,
        }),
        ...style,
      }}
      css={{
        display: 'flex',
        width: 31 - 3,
        cursor: 'pointer',
        paddingTop: 2,
        paddingBottom: 2,
        paddingLeft: 2.5,
        paddingRight: 2,
        borderRadius: 28,
      }}
      onClick={(e) => {
        e.stopPropagation()
        const value = !enabled
        if (setValue) {
          setValue(value)
        }
        onChange(value)
      }}
    >
      <div
        css={{
          width: 13,
          height: 13,
          borderRadius: '50%',
          transition: 'transform 0.2s',
        }}
        style={{
          transform: `translate3d(${enabled ? 7 + 5 - 3 : 0}px,0px,0px)`,
          backgroundColor: useColor({ color: 'background' }),
        }}
      />
    </div>
  )
}

export const SwitchTextButton: FunctionComponent<
  SwitchProps & {
    enabledText?: TextValue
    disabledText?: TextValue
  }
> = ({
  enabledText = 'Enabled',
  disabledText = 'Disabled',
  onChange,
  identifier,
  value,
  style,
  color,
}) => {
  const [enabled, setValue] = useInputValue(value, identifier, false)

  return (
    <div
      style={{
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        ...style,
      }}
      onClick={(e) => {
        e.stopPropagation()
        const v = !enabled
        setValue(v)
        onChange(v)
      }}
    >
      <Switch
        color={color}
        value={enabled}
        ignoreInternal
        onChange={useCallback(
          (v) => {
            setValue(v)
            onChange(v)
          },
          [onChange]
        )}
      />
      <Text
        weight="medium"
        singleLine
        noSelect
        style={{
          marginLeft: 8,
        }}
      >
        {enabled ? enabledText : disabledText}
      </Text>
    </div>
  )
}
