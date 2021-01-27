import React, {
  useReducer,
  useCallback,
  FunctionComponent,
  CSSProperties,
} from 'react'
import { Check } from '../Button/CheckBox'
import { Radio } from '../Button/Radio'
import { Text } from '../Text'

export type EnableInputProps = {
  style?: CSSProperties
  onChange: (value: boolean | void) => void
  value?: boolean
}

export const CheckBox: FunctionComponent<EnableInputProps> = ({
  style,
  children,
  onChange,
  value = false,
  ...rest
}) => {
  const [enabled, update] = useReducer((x) => !x, value)
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        ...style,
      }}
      onClick={useCallback(() => {
        if (onChange) {
          onChange(update())
        } else {
          update()
        }
      }, [onChange])}
    >
      <Check {...rest} overRideValue={enabled} />
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

export const RadioButton: FunctionComponent<EnableInputProps> = ({
  style,
  children,
  onChange,
  value = false,
  ...rest
}) => {
  const [enabled, update] = useReducer((x) => !x, value)

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        ...style,
      }}
      onClick={useCallback(() => {
        if (onChange) {
          onChange(update())
        } else {
          update()
        }
      }, [onChange])}
    >
      <Radio overRideValue={enabled} {...rest} />
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
