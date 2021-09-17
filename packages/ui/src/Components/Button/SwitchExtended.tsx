import React, { FunctionComponent, CSSProperties, useCallback } from 'react'
import { useColor, Color } from '@based/theme'
import { OnValueChange } from '../../types'
import useInputValue from '../../hooks/useInputValue'
import { TextValue } from '@based/text'
import { Text } from '../Text'
import { SubText } from '../Text/SubText'
import { Switch } from './Switch'
import '@compiled/react'

export type SwitchExtendedProps = {
  onChange: OnValueChange<boolean>
  value?: boolean
  style?: CSSProperties
  identifier?: any
  info?: TextValue
  label?: TextValue
  color?: Color
  noBorder?: boolean
}

export const SwitchExtended: FunctionComponent<SwitchExtendedProps> = ({
  label,
  info,
  onChange,
  noBorder,
  identifier,
  value,
  color,
  style,
}) => {
  const [enabled, setValue] = useInputValue(value, identifier, false)

  return (
    <div
      css={{
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'space-between',
        paddingTop: 16,
        paddingBottom: 8,
      }}
      style={{
        marginTop: noBorder ? 0 : 8,
        borderTop: noBorder
          ? null
          : '1px solid ' + useColor({ color: 'divider' }),
        ...style,
      }}
      onClick={(e) => {
        e.stopPropagation()
        const v = !enabled
        setValue(v)
        onChange(v)
      }}
    >
      <div
        css={{
          flexGrow: 1,
        }}
      >
        <Text
          weight="semibold"
          singleLine
          noSelect
          style={{
            marginBottom: 4,
          }}
        >
          {label}
        </Text>
        <SubText noSelect>{info}</SubText>
      </div>
      <div
        css={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Switch
          color={color}
          value={enabled}
          ignoreInternal
          onChange={useCallback(
            (v) => {
              setValue(v)
              onChange(v)
            },
            [onChange]
          )}
        />
      </div>
    </div>
  )
}
