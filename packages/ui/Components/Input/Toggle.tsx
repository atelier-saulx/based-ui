import React, { useCallback, FunctionComponent, CSSProperties } from 'react'
import { Check } from '../Button/CheckBox'
import { Radio } from '../Button/Radio'
import { Text } from '../Text'
import { TextValue } from '@based/text'
import { OnValueChange } from '../../types'
import useInputValue from '../../hooks/useInputValue'

export type ToggleInputProps = {
  style?: CSSProperties
  onChange: OnValueChange<boolean>
  value?: boolean
  identifier?: any
  children?: TextValue
}

export const CheckBox: FunctionComponent<ToggleInputProps> = ({
  style,
  children,
  onChange,
  identifier,
  value = false,
  ...rest
}) => {
  const [stateValue, setValue] = useInputValue<boolean>(
    value,
    identifier,
    false
  )

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
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
  )
}

export const RadioButton: FunctionComponent<ToggleInputProps> = ({
  style,
  children,
  onChange,
  identifier,
  value = false,
  ...rest
}) => {
  const [stateValue, setValue] = useInputValue<boolean>(
    value,
    identifier,
    false
  )

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
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
  )
}
