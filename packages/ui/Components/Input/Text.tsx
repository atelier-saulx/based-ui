import React, {
  useState,
  useCallback,
  CSSProperties,
  FunctionComponent,
} from 'react'
import { useColor, Color } from '@based/theme'
import Clear from './Clear'
import {
  Search,
  Date,
  Time,
  Email,
  Down,
  IconProps,
  iconFromString,
  IconName,
} from '@based/icons'
import { emailValidator, Validator } from './validators'
import { SubText } from '../Text/SubText'
import useDropdown from '../../hooks/overlay/useDropdown'
import { DropdownOption } from '../Overlay/Dropdown'
import useHover from '../../hooks/events/useHover'
import { ProgressIndicator } from '../ProgressIndicator/ProgressIndicator'
import { TextValue, getTextValue } from '@based/text'
import { OnValueChange } from '../../types'
import useInputValue from '../../hooks/useInputValue'
import './style.css'

type InputProps = {
  style?: CSSProperties
  icon?: IconName
  placeholder?: TextValue
  errorText?: TextValue
  helperText?: TextValue
  noBorder?: boolean
  border?: boolean
  autoFocus?: boolean
  onChange: OnValueChange<string | number | undefined>
  type?: 'text' | 'email' | 'number' | 'date' | 'time' | 'search'
  validator?: Validator
  identifier?: any
  value?: string | number
  dropdown?: DropdownOption[]
  color?: Color
  progress?: number
}

export const Input: FunctionComponent<InputProps> = ({
  placeholder,
  value = '',
  onChange,
  autoFocus,
  noBorder,
  border,
  icon,
  color = { color: 'background', tone: 1 },
  style,
  type = 'text',
  validator,
  dropdown,
  errorText,
  helperText,
  identifier,
  progress,
}) => {
  const [isFocus, setFocus] = useState(false)
  const [isWrong, setWrong] = useState(false)
  const [hover, isHover] = useHover()
  const [stateValue, setValue] = useInputValue(value, identifier, isFocus)

  const update = useCallback(
    (e) => {
      let newvalue = e.target ? e.target.value : e
      if (newvalue && type === 'number') {
        newvalue = Number(newvalue)
      }
      setValue(newvalue)
      if (validator) {
        if (validator(newvalue) || !newvalue) {
          setWrong(false)
          onChange(newvalue)
        } else {
          setWrong(true)
        }
      } else {
        onChange(newvalue)
      }
    },
    [setValue, onChange, validator]
  )

  const clear = useCallback(() => {
    setValue('')
    onChange('')
  }, [setValue, onChange])

  const blur = useCallback(() => {
    setFocus(false)
  }, [setFocus])

  const focus = useCallback(() => {
    setFocus(true)
  }, [setFocus])

  let Icon: FunctionComponent<IconProps>

  if (Icon === undefined) {
    if (icon) {
      Icon = iconFromString(icon)
    } else if (type === 'search') {
      Icon = Search
    } else if (type === 'date') {
      Icon = Date
    } else if (type === 'time') {
      Icon = Time
    } else if (type === 'email') {
      Icon = Email
    }
  }

  if (type === 'email') {
    if (!validator) {
      validator = emailValidator
    }
    if (!errorText) {
      errorText = { en: 'Please enter a valid email adress' }
    }
  }

  return (
    <div
      {...hover}
      style={{
        position: 'relative',

        paddingLeft: !noBorder && isFocus ? 11 : 12,
        paddingRight: !noBorder && isFocus ? 11 : 12,
        display: 'flex',
        alignItems: 'center',
        borderRadius: '4px',
        flexGrow: 1,
        background: useColor({
          color: color.color,
          tone: isFocus || isHover ? color.tone + 1 : 1,
        }),
        border: noBorder
          ? null
          : isFocus
          ? '2px solid ' +
            (isWrong
              ? useColor({ color: 'error' })
              : useColor({ color: 'primary' }))
          : '1px solid ' +
            (isWrong
              ? useColor({ color: 'error' })
              : useColor({
                  color: 'divider',
                  opacity: border ? 1 : 0,
                })),
        ...style,
      }}
    >
      {progress !== null && progress !== undefined ? (
        <div style={{ marginRight: 9 }}>
          <ProgressIndicator value={progress} />
        </div>
      ) : Icon ? (
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
            <Icon color={{ color: 'foreground', tone: 4 }} />
          </div>
          <div style={{ width: 28 }} />
        </>
      ) : null}

      <input
        type={type}
        value={stateValue}
        onChange={update}
        onFocus={focus}
        onBlur={blur}
        autoFocus={autoFocus}
        placeholder={String(getTextValue(placeholder))}
        style={{
          width: '100%',
          paddingLeft: Icon ? 6.5 : 0,
          paddingTop: isFocus && !noBorder ? 6.5 : 7.5,
          paddingBottom: isFocus && !noBorder ? 6.5 : 7.5,
          appearance: 'none',
          fontSize: '15px',
          lineHeight: '24px',
          letterSpacing: '-0.015em',
          background: 'none',
          fontFamily: 'Font',
          color: useColor({ color: 'foreground' }),
          fontWeight: 'normal',
        }}
      />

      {dropdown ? (
        <Down
          onClick={useDropdown(
            dropdown,
            (value) => {
              if (!Array.isArray(value)) {
                update(value.value === undefined ? '' : value.value)
              }
            },
            { value: stateValue },
            {
              align: 'flex-end',
              x: ({ left }) => left - 15,
              y: ({ top }) => top + 15,
              selectTarget: (target) => {
                return target.parentNode.parentNode
              },
            }
          )}
        />
      ) : (
        <Clear
          color={
            isWrong
              ? { color: 'error' }
              : isFocus
              ? { color: 'primary' }
              : { color: 'foreground', tone: 4 }
          }
          style={{
            // @ts-ignore
            opacity: stateValue || stateValue === 0 ? 1 : 0,
          }}
          onClick={clear}
        />
      )}
      {isFocus && (errorText || helperText) ? (
        <SubText
          color={{
            color: isWrong ? 'error' : 'foreground',
            tone: isWrong ? 1 : 3,
          }}
          style={{
            marginLeft: 4,
            position: 'absolute',
            bottom: -25,
            left: 0,
          }}
        >
          {isWrong ? errorText : helperText || ''}
        </SubText>
      ) : null}
    </div>
  )
}
