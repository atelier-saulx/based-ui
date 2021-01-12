import React, { useCallback, useReducer } from 'react'
import { S2 } from '../Text/Subtitle'
import { Body } from '../Text/Body'
import { useColor } from '@based/theme'
import numberString from '../../util/numberString'

export const Label = ({
  amount,
  value,
  onChange,
  disabledColor = 'light',
  color = 'primary',
  children
}) => {
  const [enabled, update] = useReducer(x => !x, value)
  const stateColor = enabled ? color : disabledColor

  return (
    <div
      style={{
        display: 'flex'
      }}
    >
      <div
        style={{
          backgroundColor: useColor(stateColor),
          paddingTop: 6,
          cursor: 'pointer',
          paddingBottom: 6,
          paddingLeft: 12,
          paddingRight: 12,
          borderRadius: 4,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          position: 'relative'
        }}
        onClick={useCallback(() => {
          onChange(update())
        }, [onChange])}
      >
        <S2 color={{ on: stateColor }}>{children}</S2>
        {amount !== undefined ? (
          <Body
            color={{ on: stateColor }}
            style={{ marginLeft: 5, userSelect: 'none' }}
          >
            {numberString(amount)}
          </Body>
        ) : null}
      </div>
    </div>
  )
}
