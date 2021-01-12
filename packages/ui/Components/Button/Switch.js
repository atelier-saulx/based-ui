import React, { useState, useRef } from 'react'
import { useColor } from '@based/theme'

export const Switch = ({
  onChange,
  color = 'primary',
  value,
  identifier,
  style
}) => {
  const [enabled = value, setEnabled] = useState(value)
  const identifierRef = useRef(identifier)
  const initialValue = useRef(value)

  if (value !== enabled && value !== initialValue.current) {
    initialValue.current = value
    setEnabled(value)
  } else if (identifierRef.current !== identifier) {
    identifierRef.current = identifier
    initialValue.current = value
    setEnabled(value)
  } else if (!initialValue.current) {
    initialValue.current = value
    if (!enabled && value) {
      setEnabled(value)
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        width: 51,
        cursor: 'pointer',
        paddingTop: 2,
        paddingBottom: 2,
        paddingLeft: 3,
        paddingRight: 3,
        borderRadius: 28,
        backgroundColor: useColor(
          enabled ? color : 'default',
          enabled ? 1 : 0.75
        ),
        ...style
      }}
      onClick={() => {
        const value = !enabled
        setEnabled(value)
        if (onChange) {
          onChange(value)
        }
      }}
    >
      <div
        style={{
          width: 27,
          height: 27,
          borderRadius: 27,
          backgroundColor: useColor({ on: color }),
          transition: 'transform 0.2s',
          transform: `translate3d(${enabled ? 18 : 0}px,0px,0px)`
        }}
      />
    </div>
  )
}
