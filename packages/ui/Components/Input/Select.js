import React, { useState, useCallback, useRef, useReducer } from 'react'
import { useColor } from '@based/theme'
import { Body } from '../Text/Body'
import { ChevronDown } from '@based/icons'
import useDropdown from '../../hooks/useDropdown'

export const Select = ({
  placeholder = '',
  onChange,
  options = [],
  Icon,
  multi,
  value = multi ? [] : '',
  style
}) => {
  const [stateValue, setValue] = useState(value)
  const [isFocus, setFocus] = useState(false)

  const update = useCallback(
    (value, index) => {
      setValue(value)
      onChange(value, index)
    },
    [setValue, onChange]
  )

  const displayValue = multi
    ? stateValue.length === 0
      ? placeholder
      : stateValue.join(', ')
    : stateValue === ''
    ? placeholder
    : stateValue

  return (
    <div
      onClick={useDropdown(
        options,
        stateValue,
        () => {
          setFocus(true)
          return (value, index) => {
            if (multi) {
              if (index !== undefined) {
                update(value, index)
              } else {
                setFocus(false)
              }
            } else {
              if (index !== undefined) {
                update(value, index)
              }
              setFocus(false)
            }
          }
        },
        [update, setFocus],
        { multi }
      )}
      style={{
        cursor: 'pointer',
        position: 'relative',
        paddingLeft: isFocus ? 14 : 15,
        paddingRight: isFocus ? 14 : 15,
        paddingTop: isFocus ? 11.5 : 12.5,
        paddingBottom: isFocus ? 11.5 : 12.5,
        justifyContent: 'space-between',
        display: 'flex',
        borderRadius: 8,
        border: isFocus
          ? '2px solid ' + useColor('primary')
          : '1px solid ' + useColor('outline'),
        ...style
      }}
    >
      <div
        style={{
          display: 'flex'
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
                justifyContent: 'center'
              }}
            >
              <Icon size="small" color="medium" />
            </div>
            <div style={{ width: 28 }} />
          </>
        ) : null}
        <Body singleLine style={{ userSelect: 'none' }}>
          {displayValue}
        </Body>
      </div>
      <ChevronDown />
    </div>
  )
}
