import React, { useCallback, useReducer } from 'react'
import { useColor } from '@based/theme'
import { Check as CheckIcon } from '@based/icons'

export const Check = ({
  onChange = () => {},
  color = 'primary',
  value = false,
  overRideValue,
  style
}) => {
  let [enabled, update] = useReducer(x => !x, value)
  if (overRideValue !== undefined) {
    enabled = overRideValue
  }
  return (
    <div
      style={{
        display: 'flex',
        cursor: 'pointer',
        width: 24,
        height: 24,
        transition: 'background-color 0.2s',
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid ' + useColor(color),
        boxShadow:
          `0 0 1px 0 ${useColor(color)} inset, 0 0 1px 0 ` + useColor(color),
        backgroundColor: useColor(color, enabled ? 1 : 0.1),
        ...style
      }}
      onClick={useCallback(() => {
        if (overRideValue !== undefined) {
          onChange(!overRideValue)
        } else {
          onChange(update())
        }
      }, [onChange])}
    >
      <CheckIcon
        size="small"
        style={{
          opacity: enabled ? 1 : 0,
          transition: 'opacity 0.2s'
        }}
        color={{ on: 'primary' }}
      />
    </div>
  )
}
