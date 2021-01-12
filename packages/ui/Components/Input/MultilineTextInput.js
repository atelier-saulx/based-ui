import React, { useState, useCallback, useRef, useEffect } from 'react'
import { useColor } from '@based/theme'
import './style.css'

export const MultilineTextInput = ({
  placeholder = '',
  value = '',
  onChange,
  autoFocus,
  height = 75,
  validate,
  identifier
}) => {
  const identifierRef = useRef(identifier)
  const initialValue = useRef(value)
  const ref = useRef()
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

  useEffect(() => {
    if (ref.current) {
      ref.current.style.height = 'auto'
      ref.current.style.height = `${ref.current.scrollHeight}px`
    }
  }, [stateValue])

  const update = useCallback(
    e => {
      const newvalue = e.target.value
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

  const blur = useCallback(() => {
    setFocus(false)
  }, [setFocus])

  const focus = useCallback(() => {
    setFocus(true)
  }, [setFocus])

  return (
    <textarea
      onChange={update}
      onFocus={focus}
      onBlur={blur}
      ref={ref}
      autoFocus={autoFocus}
      style={{
        borderRadius: 8,
        border: isFocus
          ? '2px solid ' + (isWrong ? useColor('error') : useColor('primary'))
          : '1px solid ' + (isWrong ? useColor('error') : useColor('outline')),
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 12.5,
        paddingBottom: 12.5,
        width: '100%',
        appearance: 'none',
        fontSize: 16,
        background: 'none',
        fontFamily: 'Inter',
        color: useColor('default'),
        fontWeight: 'normal',
        height
      }}
      placeholder={placeholder}
      value={stateValue}
    />
  )
}
