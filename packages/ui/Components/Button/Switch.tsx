import React, { FunctionComponent, CSSProperties } from 'react'
import { useColor, Color } from '@based/theme'
import { OnValueChange } from '../../types'
import useInputValue from '../../hooks/useInputValue'

export type SwitchProps = {
  color?: Color
  onChange: OnValueChange<boolean>
  value?: boolean
  style?: CSSProperties
  identifier?: any
}

export const Switch: FunctionComponent<SwitchProps> = ({
  onChange,
  color = { color: 'primary' },
  value,
  identifier,
  style,
}) => {
  const [enabled, setValue] = useInputValue(value, identifier, false)

  return (
    <div
      style={{
        display: 'flex',
        // width: 51,
        width: 31 - 3,
        cursor: 'pointer',
        paddingTop: 2,
        paddingBottom: 2,
        paddingLeft: 2.5,
        paddingRight: 2,
        borderRadius: 28,
        backgroundColor: useColor({
          color: enabled ? color.color : 'foreground',
          opacity: enabled ? 1 : 0.75,
        }),
        ...style,
      }}
      onClick={() => {
        const value = !enabled
        setValue(value)
        if (onChange) {
          onChange(value)
        }
      }}
    >
      <div
        style={{
          width: 13,
          height: 13,
          borderRadius: '50%',
          //   borderRadius: 13.5,
          backgroundColor: useColor({ color: 'background' }),
          transition: 'transform 0.2s',
          transform: `translate3d(${enabled ? 7 + 5 - 3 : 0}px,0px,0px)`,
        }}
      />
    </div>
  )
}
