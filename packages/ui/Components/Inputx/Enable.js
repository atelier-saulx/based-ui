import React, { useReducer, useCallback } from 'react'
import { Check } from '../Button/Checkbox'
import { Radio } from '../Button/Radio'
import { Body } from '../Text/Body'

export const CheckBox = ({
  style,
  children,
  onChange,
  value = false,
  ...rest
}) => {
  const [enabled, update] = useReducer(x => !x, value)
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        ...style
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
      <Body
        noSelect
        style={{
          marginLeft: 15
        }}
      >
        {children}
      </Body>
    </div>
  )
}

export const RadioButton = ({
  style,
  children,
  onChange,
  value = false,
  ...rest
}) => {
  const [enabled, update] = useReducer(x => !x, value)

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        ...style
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
      <Body
        noSelect
        style={{
          marginLeft: 15
        }}
      >
        {children}
      </Body>
    </div>
  )
}
