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
  overrideValue?: boolean
  style?: CSSProperties
  color?: Color
  disabledColor?: Color
}

export const Check: FunctionComponent<CheckProps> = ({
  onChange = () => {},
  color = { color: 'primary' },
  value = false,
  disabledColor = { color: 'divider' },
  overrideValue,
  style,
}) => {
  let [enabled, update] = useReducer((x) => !x, value)
  if (overrideValue !== undefined) {
    enabled = overrideValue
  }
  const parsedColor = useColor(!enabled ? disabledColor || color : color)

  return (
    <div
      style={{
        display: 'flex',
        cursor: 'pointer',
        width: 20,
        height: 20,
        transition: 'background-color 0.2s',
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid ' + parsedColor,
        boxShadow: `0 0 1px 0 ${parsedColor} inset, 0 0 1px 0 ` + parsedColor,
        backgroundColor: useColor({
          color: (!enabled ? disabledColor || color : color).color,
          opacity: enabled ? 1 : 0.1,
        }),
        ...style,
      }}
      onClick={useCallback(() => {
        if (overrideValue !== undefined) {
          onChange(!overrideValue)
        } else {
          onChange(update())
        }
      }, [onChange])}
    >
      <CheckIcon
        size={18}
        style={{
          opacity: enabled ? 1 : 0,
        }}
        color={{ color: 'background' }}
      />
    </div>
  )
}
