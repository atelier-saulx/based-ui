import React, {
  useState,
  useCallback,
  useRef,
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
import './style.css'
import { DropdownOptions } from '../Overlay/Dropdown'
import useHover from '../../hooks/events/useHover'

type InputProps = {
  style?: CSSProperties
  icon?: IconName
  placeholder?: string
  border?: boolean
  autoFocus?: boolean
  onChange: (value: string | number | undefined) => void
  type?: 'text' | 'email' | 'number' | 'date' | 'time' | 'search'
  validator?: Validator
  identifier?: any
  errorText?: string
  helperText?: string
  value?: string | number
  options?: DropdownOptions
  color?: Color
}

export const Input: FunctionComponent<InputProps> = ({
  placeholder,
  value = '',
  onChange,
  autoFocus,
  border,
  icon,
  color = { color: 'background', tone: 1 },
  style,
  type = 'text',
  validator,
  options,
  errorText,
  helperText,
  identifier,
}) => {
  const identifierRef = useRef(identifier)
  const initialValue = useRef(value)
  const [stateValue, setValue] = useState(value)
  const [isFocus, setFocus] = useState(false)
  const [isWrong, setWrong] = useState(false)
  const [hover, isHover] = useHover()

  if (value !== stateValue && value !== initialValue.current && !isFocus) {
    initialValue.current = value
    setValue(value)
  } else if (identifierRef.current !== identifier) {
    identifierRef.current = identifier
    initialValue.current = value
    setValue(value)
  } else if (!initialValue.current) {
    initialValue.current = value
    if (!stateValue && value) {
      setValue(value)
    }
  }

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
      errorText = 'Please enter a valid email adress'
    }
  }

  return (
    <div
      {...hover}
      style={{
        position: 'relative',
        paddingLeft: isFocus ? 11 : 12,
        paddingRight: isFocus ? 11 : 12,
        display: 'flex',
        alignItems: 'center',
        borderRadius: '4px',
        flexGrow: 1,
        background: useColor({
          color: color.color,
          tone: isFocus || isHover ? color.tone + 1 : 1,
        }),
        border: isFocus
          ? '2px solid ' +
            (isWrong
              ? useColor({ color: 'secondary' })
              : useColor({ color: 'primary' }))
          : '1px solid ' +
            (isWrong
              ? useColor({ color: 'secondary' })
              : useColor({
                  color: 'foreground',
                  tone: 5,
                  opacity: border ? 0.15 : 0,
                })),
        ...style,
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
        placeholder={placeholder}
        style={{
          width: '100%',
          paddingLeft: Icon ? 6.5 : 0,
          paddingTop: isFocus ? 6.5 : 7.5,
          paddingBottom: isFocus ? 6.5 : 7.5,
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

      {options ? (
        <Down
          onClick={useDropdown(
            options,
            (value, index) => {
              if (index !== undefined) {
                update(value === undefined ? '' : value)
              }
            },
            stateValue,
            {
              align: 'end',
              x: ({ left }) => left - 15,
              y: ({ top }) => top + 15,
              width: () => 'auto',
              selectTarget: (target: Element) => {
                return target.parentNode
              },
            }
          )}
        />
      ) : (
        <Clear
          color={
            isWrong
              ? { color: 'secondary' }
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
            color: isWrong ? 'secondary' : 'foreground',
            tone: isWrong ? 1 : 3,
          }}
          style={{
            marginLeft: 16,
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
