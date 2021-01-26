import React, { useState, useCallback, useRef } from 'react'
import { useColor } from '@based/theme'
import Clear from './Clear'
import { Search, Date, Clock, Email, ChevronDown } from '@based/icons'
import { emailValidator } from './validators'
import { Overline } from '../Text/Overline'
import useDropdown from '../../hooks/useDropdown'
import './style.css'

export const Input = ({
  placeholder,
  value = '',
  onChange,
  autoFocus,
  Icon,
  style,
  type = 'text',
  validate,
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
      if (validate) {
        if (validate(newvalue) || !newvalue) {
          setWrong(false)
          onChange(newvalue)
        } else {
          setWrong(true)
        }
      } else {
        onChange(newvalue)
      }
    },
    [setValue, onChange, validate]
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

  if (Icon === undefined) {
    if (type === 'search') {
      Icon = Search
    } else if (type === 'date') {
      Icon = Date
    } else if (type === 'time') {
      Icon = Clock
    } else if (type === 'email') {
      Icon = Email
    }
  }

  if (type === 'email') {
    if (!validate) {
      validate = emailValidator
    }
    if (!errorText) {
      errorText = 'Please enter a valid email adress'
    }
  }

  return (
    <div
      style={{
        position: 'relative',
        paddingLeft: isFocus ? 14 : 15,
        paddingRight: isFocus ? 14 : 15,
        display: 'flex',
        alignItems: 'center',
        borderRadius: 8,
        flexGrow: 1,
        border: isFocus
          ? '2px solid ' + (isWrong ? useColor('error') : useColor('primary'))
          : '1px solid ' + (isWrong ? useColor('error') : useColor('outline')),
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
            <Icon size="small" color="medium" />
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
          paddingTop: isFocus ? 11.5 : 12.5,
          paddingBottom: isFocus ? 11.5 : 12.5,
          appearance: 'none',
          fontSize: 16,
          background: 'none',
          fontFamily: 'Inter',
          color: useColor('default'),
          fontWeight: 'normal',
        }}
      />

      {options ? (
        <ChevronDown
          onClick={useDropdown(
            options,
            stateValue,
            () => {
              return (value, index) => {
                if (index !== undefined) {
                  update(value === undefined ? '' : value)
                }
              }
            },
            [update],
            {
              align: 'flex-end',
              x: ({ x }) => x - 15,
              y: ({ y }) => y + 15,
              width: () => 'auto',
              selectTarget: (target) => {
                return target.parentNode
              },
            }
          )}
        />
      ) : (
        <Clear
          color={isWrong ? 'error' : isFocus ? 'primary' : 'disabled'}
          style={{
            opacity: stateValue || stateValue === 0 ? 1 : 0,
          }}
          onClick={clear}
        />
      )}
      {isFocus && (errorText || helperText) ? (
        <Overline
          color={isWrong ? 'error' : 'default'}
          style={{
            marginLeft: 15,
            fontWeight: 'normal',
            position: 'absolute',
            bottom: 20,
            left: 0,
          }}
        >
          {isWrong ? errorText : helperText || ''}
        </Overline>
      ) : null}
    </div>
  )
}
