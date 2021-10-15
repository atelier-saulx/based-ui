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
import { SvgProps } from '@based/icons'
import Clear from './Clear'
import {
  Section,
  getSectionAtCursor,
  handleSectionChange,
  selectNextSection,
  selectPreviousSection,
  preprocessAllSections,
  increaseCurrentSectionValue,
  decreaseCurrentSectionValue,
  selectSection,
  validAllSections,
} from './MultiSectionInputFunctions'

export type MultiSectionInputProps = {
  border: boolean
  weight?: 'semibold' | 'medium' | 'regular'
  style?: CSSProperties
  color?: Color
  value?: string
  identifier?: any
  onChange: OnValueChange<string>
  onChangeStrategy?: 'onChangeAndValid' | 'onValid'
  noBackground?: boolean
  noHover?: boolean
  icon?: FunctionComponent<SvgProps>
  placeholder?: string
  hasFocus?: boolean
  onFocus?: React.FocusEventHandler<HTMLInputElement>
  sections: Section[]
}

// section example for HH:MM:SS
//
// {
//   validation: /^(\d|[0-1]\d|2[0-3])$/,
//   maxSize: 2,
//   preprocess: (v) => ('00' + v).substr(-2),
//   separator: ':',
//   default: '00',
// },
// {
//   validation: /^(\d|[0-5]\d|2\d)$/,
//   maxSize: 2,
//   preprocess: (v) => ('00' + v).substr(-2),
//   separator: ':',
//   default: '00',
// },
// {
//   validation: /^(\d|[0-5]\d|2\d)$/,
//   maxSize: 2,
//   preprocess: (v) => ('00' + v).substr(-2),
//   default: '00',
// },

/**
 * Time inpuut field
 * WARNING: Accepts and returns miliseconds.
 * If milliseconds are used as timestamp to a Date object it will add local timezone offset
 * when getting or viewing value.
 * UTC functions must be used when setting or getting hours/minustes/seconds:
 * setUTCHours(), getUTC*(), toUTCString()
 */
export const MultiSectionInput: FunctionComponent<MultiSectionInputProps> = ({
  border,
  value,
  style,
  onChange,
  onChangeStrategy = 'onValid',
  noBackground,
  color = { color: 'background', tone: 1 },
  noHover,
  weight,
  icon: InputIcon,
  placeholder,
  hasFocus,
  onFocus,
  sections,
}) => {
  const [valid, setValid] = useState(true)
  const inputEl = useRef<HTMLInputElement>()

  const clear = useCallback(() => {
    inputEl.current.value = ''
    onChange(null)
  }, [onChange])

  const [hover, isHover] = noHover ? [{}, false] : useHover()
  const [isFocus, setFocus] = useState(hasFocus)

  useEffect(() => {
    inputEl.current.value = value
  }, [value])

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
          border: !valid
            ? '2px solid ' + useColor({ color: 'error' })
            : border
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
            {InputIcon ? (
              <InputIcon color={{ color: 'foreground', tone: 4 }} />
            ) : null}
          </div>
          <div style={{ width: 28 }} />
        </>
        <input
          ref={inputEl}
          placeholder={placeholder}
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
          onFocus={(e) => {
            setFocus(true)
            if (onFocus) onFocus(e)
          }}
          onBlur={(e) => {
            const currentSectionIndex = getSectionAtCursor(e.target, sections)
            preprocessAllSections(e.target, sections)
            handleSectionChange(
              e.target,
              currentSectionIndex,
              sections,
              setValid
            )
            if (onChangeStrategy === 'onValid' && valid) {
              onChange(e.target.value)
            }
            setFocus(false)
          }}
          onChange={(e) => {
            const currentSectionIndex = getSectionAtCursor(e.target, sections)
            handleSectionChange(
              e.target,
              currentSectionIndex,
              sections,
              setValid
            )
            if (
              onChangeStrategy === 'onChangeAndValid' &&
              validAllSections(e.target, sections)
            )
              console.log('changing', e.target.value)
            onChange(e.target.value)
          }}
          onKeyDown={(e: React.KeyboardEvent) => {
            const el = e.target as HTMLInputElement
            const currentSectionIndex = getSectionAtCursor(el, sections)
            if (e.key === sections[currentSectionIndex]?.separator) {
              e.preventDefault()
              e.stopPropagation()
              preprocessAllSections(el, sections)
              handleSectionChange(el, currentSectionIndex, sections, setValid)
              selectNextSection(el, currentSectionIndex, sections)
            } else if (e.key === 'Tab') {
              if (e.shiftKey && currentSectionIndex > 0) {
                e.preventDefault()
                e.stopPropagation()
                selectPreviousSection(el, currentSectionIndex, sections)
              } else if (
                !e.shiftKey &&
                currentSectionIndex < sections.length - 1
              ) {
                e.preventDefault()
                e.stopPropagation()
                selectNextSection(el, currentSectionIndex, sections)
              }
            } else if (e.key === 'ArrowUp') {
              e.preventDefault()
              e.stopPropagation()
              increaseCurrentSectionValue(el, sections)
              selectSection(el, currentSectionIndex, sections)
            } else if (e.key === 'ArrowDown') {
              e.preventDefault()
              e.stopPropagation()
              decreaseCurrentSectionValue(el, sections)
              selectSection(el, currentSectionIndex, sections)
            }
          }}
        />
        <Clear
          style={{
            // @ts-ignore
            opacity: isHover && value ? 1 : 0,
          }}
          onClick={clear}
        />
      </div>
    </div>
  )
}
