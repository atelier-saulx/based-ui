import React, { useCallback, FunctionComponent, CSSProperties } from 'react'
import { Check } from '../Button/CheckBox'
import { Radio } from '../Button/Radio'
import { Text } from '../Text'
import { TextValue } from '@based/text'
import { OnValueChange } from '../../types'
import { IconName, iconFromString } from '@based/icons'
import useInputValue from '../../hooks/useInputValue'
import { useColor } from '@based/theme'

export type ToggleInputProps = {
  style?: CSSProperties
  onChange: OnValueChange<boolean>
  value?: boolean
  icon?: IconName
  border?: boolean
  identifier?: any
  children?: TextValue
}

export const CheckBox: FunctionComponent<ToggleInputProps> = ({
  style,
  children,
  onChange,
  identifier,
  border,
  icon,
  value = false,
  ...rest
}) => {
  const [stateValue, setValue] = useInputValue<boolean>(
    value,
    identifier,
    false
  )

  const Icon = icon ? iconFromString(icon) : null

  return (
    <div
      style={{
        border: border ? '1px solid ' + useColor({ color: 'divider' }) : null,
        borderRadius: 4,
        paddingLeft: 12,
        paddingRight: 12,
        paddingTop: 7.5,
        paddingBottom: 7.5,
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        justifyContent: 'space-between',
        ...style,
      }}
      onClick={useCallback(() => {
        const v = !stateValue
        if (onChange) {
          onChange(v)
        }
        setValue(v)
      }, [onChange, stateValue])}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Check {...rest} overrideValue={stateValue} />
        <Text
          noSelect
          style={{
            marginLeft: 15,
          }}
        >
          {children}
        </Text>
      </div>
      {Icon ? <Icon /> : null}
    </div>
  )
}

export const RadioButton: FunctionComponent<ToggleInputProps> = ({
  style,
  children,
  onChange,
  icon,
  border,
  identifier,
  value = false,
  ...rest
}) => {
  const [stateValue, setValue] = useInputValue<boolean>(
    value,
    identifier,
    false
  )

  const Icon = icon ? iconFromString(icon) : null

  return (
    <div
      style={{
        display: 'flex',
        border: border ? '1px solid ' + useColor({ color: 'divider' }) : null,
        alignItems: 'center',
        cursor: 'pointer',
        paddingLeft: 12,
        paddingRight: 12,
        paddingTop: 7.5,
        paddingBottom: 7.5,
        justifyContent: 'space-between',
        ...style,
      }}
      onClick={useCallback(() => {
        const v = !stateValue
        if (onChange) {
          onChange(v)
        }
        setValue(v)
      }, [onChange, stateValue])}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Radio overrideValue={stateValue} {...rest} />
        <Text
          noSelect
          style={{
            marginLeft: 15,
          }}
        >
          {children}
        </Text>
      </div>
      {Icon ? <Icon /> : null}
    </div>
  )
}
