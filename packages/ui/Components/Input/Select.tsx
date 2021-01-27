import React, {
  useState,
  useCallback,
  CSSProperties,
  FunctionComponent,
} from 'react'
import { useColor, Color } from '@based/theme'
import { Down, IconName, iconFromString } from '@based/icons'
import { Validator } from './validators'
import './style.css'
import { DropdownOptions, DropdownOption } from '../Overlay/Dropdown'

import useHover from '../../hooks/events/useHover'
import { Text } from '../Text'
import useDropdown from '../../hooks/overlay/useDropdown'

type SelectInputProps = {
  style?: CSSProperties
  placeholder?: string
  border?: boolean
  autoFocus?: boolean
  onChange: (value: DropdownOption, index?: number | number[]) => void
  type?: 'text' | 'email' | 'number' | 'date' | 'time' | 'search'
  validator?: Validator
  icon?: IconName
  identifier?: any
  multi?: boolean
  value?: (string | number) | (string | number)[]
  options?: DropdownOptions
  color?: Color
  progress?: number
}

export const Select: FunctionComponent<SelectInputProps> = ({
  placeholder = '',
  onChange,
  options = [],
  icon,
  color = { color: 'background', tone: 1 },
  multi,
  border,
  value = multi ? [] : '',
  style,
}) => {
  const [stateValue, setValue] = useState<
    (string | number) | (string | number)[]
  >(value)
  const [isFocus, setFocus] = useState(false)
  const [hover, isHover] = useHover()

  const Icon = icon ? iconFromString(icon) : ''

  const update = useCallback(
    (value, index) => {
      setValue(value)
      onChange(value, index)
    },
    [setValue, onChange]
  )

  const displayValue =
    Array.isArray(stateValue) && multi
      ? stateValue.length === 0
        ? placeholder
        : stateValue.join(', ')
      : stateValue === ''
      ? placeholder
      : stateValue

  return (
    <div
      {...hover}
      onClick={useDropdown(
        options,
        (value, index) => {
          if (multi) {
            if (index !== undefined) {
              update(value, index)
            }
          } else {
            if (index !== undefined) {
              update(value, index)
            }
          }
        },
        stateValue,
        {
          multi,
          align: 'flex-end',
          x: ({ left }) => left - 15,
          y: ({ top }) => top + 15,
        },
        () => {
          setFocus(true)
          return () => {
            setFocus(false)
          }
        }
      )}
      style={{
        cursor: 'pointer',
        position: 'relative',
        paddingLeft: isFocus ? 11 : 12,
        paddingRight: isFocus ? 11 : 12,
        paddingTop: isFocus ? 6.5 : 7.5,
        paddingBottom: isFocus ? 6.5 : 7.5,
        justifyContent: 'space-between',
        display: 'flex',
        borderRadius: 4,
        background: useColor({
          color: color.color,
          tone: isFocus || isHover ? color.tone + 1 : 1,
        }),
        border: isFocus
          ? '2px solid ' + useColor({ color: 'primary' })
          : '1px solid ' +
            useColor({
              color: 'foreground',
              tone: 5,
              opacity: border ? 0.33 : 0,
            }),
        ...style,
      }}
    >
      <div
        style={{
          display: 'flex',
        }}
      >
        {Icon ? (
          <>
            <div
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Icon />
            </div>
            <div style={{ width: 24 }} />
          </>
        ) : null}
        <Text singleLine style={{ userSelect: 'none' }}>
          {displayValue}
        </Text>
      </div>
      <Down />
    </div>
  )
}
