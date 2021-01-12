import React, { useState, useCallback, useRef } from 'react'
import { useColor } from '@based/theme'
import hexRgb from 'hex-rgb'
import rgbHex from 'rgb-hex'
import './style.css'

const isHex = value => value && /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value)

const isRgb = value => {
  value && /^rgb\((\d+),(\d+),(\d+)\)$/.test(value)
}

const toRgb = value => {
  if (value && isHex(value)) {
    const x = hexRgb(value)
    if (x) {
      return `rgb(${x.red},${x.green},${x.blue})`
    }
  }
  return value
}

const Text = ({ onChange, value, placeholder, focus, blur, right }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      onFocus={focus}
      onBlur={blur}
      placeholder={placeholder}
      style={{
        width: '100%',
        textAlign: right ? 'right' : 'left',
        appearance: 'none',
        fontSize: 16,
        background: 'none',
        fontFamily: 'Inter',
        color: useColor('default'),
        fontWeight: 'normal'
      }}
    />
  )
}

export const Color = ({ value = '', onChange, autoFocus, identifier }) => {
  const identifierRef = useRef(identifier)
  const initialValue = useRef(value)
  const [stateValue, setValue] = useState(value)
  const [isFocus, setFocus] = useState(false)

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
    e => {
      const newvalue = toRgb(e.target.value)
      setValue(newvalue)
      onChange(newvalue)
    },
    [setValue, onChange]
  )

  const blur = useCallback(() => {
    setFocus(false)
  }, [setFocus])

  const focus = useCallback(() => {
    setFocus(true)
  }, [setFocus])

  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        borderRadius: 8,
        alignItems: 'center',
        height: 28 + 25,
        paddingTop: isFocus ? 11.5 : 12.5,
        paddingBottom: isFocus ? 11.5 : 12.5,
        paddingLeft: isFocus ? 14 : 15,
        paddingRight: isFocus ? 14 : 15,
        border: isFocus
          ? '2px solid ' + useColor('primary')
          : '1px solid ' + useColor('outline')
      }}
    >
      <div
        style={{
          width: 28,
          height: 28,
          borderRadius: 2,
          position: 'relative',
          border: '1px solid ' + useColor('outline'),
          background: stateValue
        }}
      >
        <input
          type="color"
          value={
            isHex(stateValue)
              ? stateValue
              : isRgb(stateValue)
              ? rgbHex(stateValue)
              : '#ffffff'
          }
          onChange={update}
          onFocus={focus}
          onBlur={blur}
          autoFocus={autoFocus}
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            right: 0,
            height: 28,
            width: 28,
            bottom: 0,
            border: '1px solid red',
            appearance: 'none',
            background: 'none'
          }}
        />
      </div>

      <div
        style={{
          marginLeft: 15,
          display: 'flex',
          width: '100%',
          justifyContent: 'space-between'
        }}
      >
        <div
          style={{
            minWidth: '80%',
            display: 'flex'
          }}
        >
          <Text
            value={toRgb(stateValue)}
            onChange={update}
            blur={blur}
            focus={focus}
            style={{
              minWidth: '100%'
            }}
          />
        </div>
      </div>
    </div>
  )
}
