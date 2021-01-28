import React, {
  useState,
  useCallback,
  FunctionComponent,
  CSSProperties,
} from 'react'
import { Check } from '../Button/CheckBox'
import { Radio } from '../Button/Radio'
import { Text } from '../Text'
import { TextValue } from '@based/i18n'
import { OnValueChange } from '../../types'

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
  value = false,
  ...rest
}) => {
  const [enabled, update] = useState(value)
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        ...style,
      }}
      onClick={useCallback(() => {
        let v = !enabled
        if (onChange) {
          onChange(v)
        }
        update(v)
      }, [onChange, enabled])}
    >
      <Check {...rest} overrideValue={enabled} />
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
  value = false,
  ...rest
}) => {
  const [enabled, update] = useState(value)
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        ...style,
      }}
      onClick={useCallback(() => {
        let v = !enabled
        if (onChange) {
          onChange(v)
        }
        update(v)
      }, [onChange, enabled])}
    >
      <Radio overrideValue={enabled} {...rest} />
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
