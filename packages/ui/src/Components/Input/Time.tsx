import React, {
  CSSProperties,
  FunctionComponent,
  useCallback,
  useRef,
  useState,
  useEffect,
} from 'react'
import { Color, useColor } from '@based/theme'
import { OnValueChange } from '../../types'
import useHover from '../../hooks/events/useHover'
import { Time } from '@based/icons'
import Clear from './Clear'
import { matchKeyCode, Key } from '../../hooks/events/useKeyboard'
import {
  parseTimeString,
  milisecondsToTimeString,
  timeValueToMiliseconds,
  getSelectionBlockIndex,
} from './dateTimeFunctions'

type TimeInputProps = {
  border: boolean
  weight?: 'semibold' | 'medium' | 'regular'
  style?: CSSProperties
  color?: Color
  value?: string | number
  identifier?: any
  onChange: OnValueChange<number | undefined>
  useSeconds?: boolean
  noBackground?: boolean
  noHover?: boolean
}

/**
 * Time inpuut field
 * WARNING: Accepts and returns miliseconds.
 * If milliseconds are used as timestamp to a Date object it will add local timezone offset
 * when getting or viewing value.
 * UTC functions must be used when setting or getting hours/minustes/seconds:
 * setUTCHours(), getUTC*(), toUTCString()
 */
export const TimeInput: FunctionComponent<TimeInputProps> = ({
  border,
  value,
  style,
  identifier,
  onChange,
  useSeconds = false,
  noBackground,
  color = { color: 'background', tone: 1 },
  noHover,
  weight,
}) => {
  const [hover, isHover] = noHover ? [{}, false] : useHover()
  const [isFocus, setFocus] = useState(false)
  const inputRef = useRef<HTMLInputElement>()
  const timeString = useRef(
    milisecondsToTimeString(timeValueToMiliseconds(value), useSeconds) || ''
  )
  const setTimeString = (value: string): void => {
    timeString.current = value
    inputRef.current.value = timeString.current
  }
  const update = () => {
    onChange(timeValueToMiliseconds(timeString.current))
  }

  const initialValue = useRef<string | number>()
  const initialIdentifier = useRef<string | number | undefined>()
  useEffect(() => {
    if (
      value !== initialValue.current ||
      identifier !== initialIdentifier.current
    ) {
      setTimeString(
        milisecondsToTimeString(timeValueToMiliseconds(value), useSeconds)
      )
      initialValue.current = value
      initialIdentifier.current = identifier
    }
  }, [value, identifier])

  const clear = useCallback(() => {
    setTimeString('')
    onChange(null)
  }, [onChange])

  const blocks = [
    [0, 2],
    [3, 5],
  ]
  if (useSeconds) blocks.push([6, 9])

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
            <Time color={{ color: 'foreground', tone: 4 }} />
          </div>
          <div style={{ width: 28 }} />
        </>
        <input
          ref={inputRef}
          placeholder={useSeconds ? 'hh:mm:ss' : 'hh:mm'}
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
          onFocus={() => setFocus(true)}
          onBlur={(e) => {
            const { value } = e.target as HTMLInputElement
            const parsedTimeString = parseTimeString(value, useSeconds)
            if (parsedTimeString.milliseconds) {
              setTimeString(parsedTimeString.formatedString)
              update()
            }
            setFocus(false)
          }}
          onChange={useCallback((e) => {
            const { value } = e.target as HTMLInputElement
            const parsedTimeString = parseTimeString(value, useSeconds)
            setTimeString(parsedTimeString.formatedString)
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
              'Enter',
              'ArrowDown',
            ].find((k: Key) => matchKeyCode(k, e as any))
            if (key) {
              e.preventDefault()
              e.stopPropagation()

              const blockIndex = getSelectionBlockIndex(el, blocks)

              if (key === 'Enter') {
                onChange(timeValueToMiliseconds(timeString.current))
              } else if (key === 'ArrowLeft' && blockIndex > 0) {
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
                  if ((blockIndex === 0 && newValue > 23) || newValue > 59) {
                    newValue = 0
                  }
                } else {
                  newValue = parseInt(value) - 1
                  if (newValue < 0) {
                    newValue = blockIndex === 0 ? 23 : 59
                  }
                }
                const post = el.value.substring(blocks[blockIndex][1])
                setTimeString(pre + ('0' + newValue).slice(-2) + post)
                update()
              }

              el.setSelectionRange(blocks[blockIndex][0], blocks[blockIndex][1])
            }
          }}
        />
        <Clear
          style={{
            // @ts-ignore
            opacity: isHover && timeString ? 1 : 0,
          }}
          onClick={clear}
        />
      </div>
    </div>
  )
}
