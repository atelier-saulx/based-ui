import React, {
  CSSProperties,
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { Color, useColor } from '@based/theme'
import { OnValueChange } from '../../types'
import useHover from '../../hooks/events/useHover'
import { Date as DateIcon } from '@based/icons'
import Clear from './Clear'
import { matchKeyCode, Key } from '../../hooks/events/useKeyboard'
import {
  dateValueToTimestamp,
  getSelectionBlockIndex,
  parseDateString,
  timestampToDateString,
} from './dateTimeFunctions'
import { DatePickerOverlay } from './DatePickerOverlay'
import useOverlay from '../../hooks/overlay/useOverlay'

type DateInputProps = {
  border?: boolean
  weight?: 'semibold' | 'medium' | 'regular'
  style?: CSSProperties
  value?: string | number
  identifier?: any
  color?: Color
  onChange: OnValueChange<number | undefined>
  noBackground?: boolean
  noHover?: boolean
}

// TODO: handle tab when popup is open
export const DateInput: FunctionComponent<DateInputProps> = ({
  border = false,
  style,
  value,
  identifier,
  color = { color: 'background', tone: 1 },
  onChange,
  noBackground,
  noHover,
  weight,
}) => {
  const [hover, isHover] = noHover ? [{}, false] : useHover()
  const [isFocus, setFocus] = useState(false)
  const inputRef = useRef<HTMLInputElement>()
  const dateString = useRef(timestampToDateString(dateValueToTimestamp(value)))
  const setDateString = (value: string): void => {
    dateString.current = value
    inputRef.current.value = dateString.current
  }
  const [datePickerDate, setDatePickerDate] = useState(
    value ? new Date(value) : new Date()
  )
  const update = (): void => {
    onChange(dateValueToTimestamp(dateString.current))
    setDatePickerDate(new Date(dateValueToTimestamp(dateString.current)))
  }

  const initialValue = useRef<string | number>()
  const initialIdentifier = useRef<string | number | undefined>()
  useEffect(() => {
    if (
      value !== initialValue.current ||
      identifier !== initialIdentifier.current
    ) {
      setDateString(timestampToDateString(dateValueToTimestamp(value)))
      initialValue.current = value
      initialIdentifier.current = identifier
    }
  }, [value, identifier])

  const clear = useCallback(() => {
    setDateString('')
    onChange(null)
  }, [onChange])

  const blocks = [
    [0, 2],
    [3, 5],
    [6, 11],
  ]

  return (
    <div
      style={{
        width: 200,
      }}
    >
      <div
        {...hover}
        style={{
          position: 'relative',

          paddingLeft: border && isFocus ? 11 : 12,
          paddingRight: border && isFocus ? 11 : 12,
          display: 'flex',
          alignItems: 'center',
          borderRadius: '4px',
          flexGrow: 1,
          background: noBackground
            ? 'transparent'
            : useColor({
                color: color.color,
                tone: isFocus || isHover ? color.tone + 1 : 1,
              }),
          border: border
            ? isFocus
              ? '2px solid ' + useColor({ color: 'primary' })
              : '1px solid ' +
                useColor({
                  color: 'divider',
                  opacity: border ? 1 : 0,
                })
            : null,
          ...style,
        }}
      >
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
            <DateIcon color={{ color: 'foreground', tone: 4 }} />
          </div>
          <div style={{ width: 28 }} />
        </>
        <input
          ref={inputRef}
          placeholder="dd/mm/yyyy"
          style={{
            width: '100%',
            paddingLeft: 6.5,
            paddingTop: isFocus && border ? 6.5 : 7.5,
            paddingBottom: isFocus && border ? 6.5 : 7.5,
            appearance: 'none',
            fontSize: '15px',
            lineHeight: '24px',
            letterSpacing: '-0.015em',
            background: 'none',
            fontFamily: 'Font',
            color: useColor({ color: 'foreground' }),
            userSelect: 'all',
            fontWeight:
              weight === 'semibold'
                ? 600
                : weight === 'medium'
                ? 500
                : 'normal',
          }}
          onFocus={useOverlay(
            DatePickerOverlay,
            {
              date: datePickerDate,
              align: 'flex-end',
              width: 260,
              onChange: (newDate) => {
                setDateString(timestampToDateString(newDate.getTime()))
                update()
              },
            },
            () => {
              setFocus(true)
              return () => {
                setFocus(false)
              }
            }
          )}
          onBlur={(e) => {
            const { value } = e.target as HTMLInputElement
            setFocus(false)
            const parsedDateString = parseDateString(value)
            if (parsedDateString.valid) {
              setDateString(timestampToDateString(parsedDateString.timestamp))
            }
          }}
          onChange={useCallback((e) => {
            const { value } = e.target as HTMLInputElement
            const parsedDateString = parseDateString(value)
            setDateString(parsedDateString.formatedString)
          }, [])}
          onClick={(e) => {
            const el = e.target as HTMLInputElement
            const blockIndex = getSelectionBlockIndex(el, blocks)
            el.setSelectionRange(blocks[blockIndex][0], blocks[blockIndex][1])
          }}
          onKeyDown={(e) => {
            const el = e.target as HTMLInputElement

            const key = [
              'ArrowLeft',
              'ArrowRight',
              'ArrowUp',
              'ArrowDown',
            ].find((k: Key) => matchKeyCode(k, e as any))
            if (key) {
              e.preventDefault()
              e.stopPropagation()

              const blockIndex = getSelectionBlockIndex(el, blocks)

              if (key === 'ArrowLeft' && blockIndex > 0) {
                el.setSelectionRange(
                  blocks[blockIndex - 1][0],
                  blocks[blockIndex - 1][1]
                )
                return
              } else if (
                key === 'ArrowRight' &&
                blockIndex < blocks.length - 1
              ) {
                el.setSelectionRange(
                  blocks[blockIndex + 1][0],
                  blocks[blockIndex + 1][1]
                )
                return
              } else if (key === 'ArrowUp' || key === 'ArrowDown') {
                const pre = el.value.substring(0, blocks[blockIndex][0])
                const value = el.value.substring(
                  blocks[blockIndex][0],
                  blocks[blockIndex][1]
                )
                let newValue
                if (key === 'ArrowUp') {
                  newValue = parseInt(value) + 1
                  if (
                    (blockIndex === 0 && newValue > 31) ||
                    (blockIndex === 1 && newValue > 12)
                  ) {
                    newValue = 1
                  }
                } else {
                  newValue = parseInt(value) - 1
                  if (newValue < 1) {
                    newValue = blockIndex === 0 ? 31 : blockIndex === 1 ? 12 : 1
                  }
                }
                const post = el.value.substring(blocks[blockIndex][1])
                setDateString(
                  pre +
                    ('0' + newValue).slice(blockIndex === 2 ? -4 : -2) +
                    post
                )
                update()
              }

              el.setSelectionRange(blocks[blockIndex][0], blocks[blockIndex][1])
            }
          }}
        />
        <Clear
          style={{
            // @ts-ignore
            opacity: isHover && dateString ? 1 : 0,
          }}
          onClick={clear}
        />
      </div>
    </div>
  )
}
