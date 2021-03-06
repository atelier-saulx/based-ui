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
import { DropdownOption } from '../Overlay/Dropdown'
import { getTextValue, TextValue } from '@based/text'
import useHover from '../../hooks/events/useHover'
import { Text } from '../Text'
import useDropdown, { OnSelect } from '../../hooks/overlay/useDropdown'
import useInputValue from '../../hooks/useInputValue'

type SelectInputProps = {
  style?: CSSProperties
  placeholder?: TextValue
  border?: boolean
  autoFocus?: boolean
  onChange: OnSelect
  filter?: boolean
  validator?: Validator
  icon?: IconName
  identifier?: any
  multi?: boolean
  value?: DropdownOption | DropdownOption[]
  items?: DropdownOption[]
  color?: Color
}

export const Select: FunctionComponent<SelectInputProps> = ({
  placeholder = '',
  onChange,
  items = [],
  icon,
  filter,
  color = { color: 'background', tone: 1 },
  multi,
  border,
  identifier,
  value = multi ? [] : undefined,
  style,
}) => {
  const [isFocus, setFocus] = useState(false)
  const [stateValue, setValue] = useInputValue<
    DropdownOption | DropdownOption[]
  >(value, identifier, isFocus)
  const [hover, isHover] = useHover()
  const Icon = icon ? iconFromString(icon) : ''
  const update = useCallback(
    (value, index) => {
      setValue(value)
      onChange(value, index)
    },
    [setValue, onChange]
  )

  const displayValue = Array.isArray(stateValue)
    ? stateValue.filter((v) => v.value !== undefined).length === 0
      ? placeholder
      : stateValue.map((v) => getTextValue(v.value)).join(', ')
    : !stateValue || stateValue.value === undefined
    ? placeholder
    : getTextValue(stateValue.value)

  return (
    <div
      {...hover}
      onClick={useDropdown(
        items,
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
          filter,
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
              color: 'divider',
              opacity: border ? 1 : 0,
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
        <Text
          singleLine
          style={{
            userSelect: 'none',
            opacity: displayValue === placeholder ? 0.6 : 1,
          }}
        >
          {displayValue}
        </Text>
      </div>
      <Down />
    </div>
  )
}
