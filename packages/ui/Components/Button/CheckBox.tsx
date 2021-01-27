import React, {
  CSSProperties,
  FunctionComponent,
  useCallback,
  useReducer,
} from 'react'
import { useColor, Color } from '@based/theme'
import { Checked as CheckIcon } from '@based/icons'

export type CheckProps = {
  onChange?: (value: boolean | void) => void
  value?: boolean
  overRideValue?: boolean
  style?: CSSProperties
  color?: Color
}

export const Check: FunctionComponent<CheckProps> = ({
  onChange = () => {},
  color = { color: 'primary' },
  value = false,
  overRideValue,
  style,
}) => {
  let [enabled, update] = useReducer((x) => !x, value)
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
        backgroundColor: useColor({
          color: color.color,
          opacity: enabled ? 1 : 0.1,
        }),
        ...style,
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
        // size=""
        style={{
          opacity: enabled ? 1 : 0,
          transition: 'opacity 0.2s',
        }}
        color={{ color: 'background' }}
      />
    </div>
  )
}
