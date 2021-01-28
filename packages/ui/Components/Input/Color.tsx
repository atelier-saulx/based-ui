import React, {
  useState,
  useCallback,
  useRef,
  CSSProperties,
  FunctionComponent,
} from 'react'
import { useColor, Color } from '@based/theme'
import useHover from '../../hooks/events/useHover'
import hexRgb from 'hex-rgb'
import rgbHex from 'rgb-hex'
import './style.css'
import { OnValueChange } from '../../types'
import { TextValue, getTextValue } from '@based/i18n'

const isHex = (value: string): boolean =>
  value && /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value)

const isRgb = (value: string): boolean => {
  return value && /^rgb\((\d+),(\d+),(\d+)\)$/.test(value)
}

const toRgb = (value: string): string => {
  if (value && isHex(value)) {
    const x = hexRgb(value)
    if (x) {
      return `rgb(${x.red},${x.green},${x.blue})`
    }
  }
  return value
}

type ColorInputProps = {
  style?: CSSProperties
  placeholder?: TextValue
  border?: boolean
  autoFocus?: boolean
  onChange: OnValueChange
  identifier?: any
  value?: string
  color?: Color
}

const Text = ({ onChange, value, placeholder, focus, blur }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      onFocus={focus}
      onBlur={blur}
      placeholder={String(getTextValue(placeholder))}
      style={{
        width: '100%',
        textAlign: 'left',
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
  )
}

export const ColorInput: FunctionComponent<ColorInputProps> = ({
  value = '',
  onChange,
  autoFocus,
  identifier,
  border,
  style,
  placeholder,
  color = { color: 'background', tone: 1 },
}) => {
  const identifierRef = useRef(identifier)
  const initialValue = useRef(value)
  const [stateValue, setValue] = useState<string>(value)
  const [isFocus, setFocus] = useState(false)
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
      {...hover}
      style={{
        cursor: 'pointer',
        position: 'relative',
        paddingLeft: isFocus ? 11 : 12,
        paddingRight: isFocus ? 11 : 12,
        paddingTop: isFocus ? 6.5 : 7.5,
        paddingBottom: isFocus ? 6.5 : 7.5,
        justifyContent: 'space-between',
        display: 'flex',
        borderRadius: 4,
        background: useColor({
          color: color.color,
          tone: isFocus || isHover ? color.tone + 1 : 1,
        }),
        border: isFocus
          ? '2px solid ' + useColor({ color: 'primary' })
          : '1px solid ' +
            useColor({
              color: 'foreground',
              tone: 5,
              opacity: border ? 0.33 : 0,
            }),
        ...style,
      }}
    >
      <div
        style={{
          width: 24,
          height: 24,
          borderRadius: 2,
          position: 'relative',
          border:
            '1px solid ' +
            useColor({
              color: 'foreground',
              tone: 5,
              opacity: 0.33,
            }),
          background: stateValue,
        }}
      >
        <input
          type="color"
          value={
            isHex(stateValue)
              ? stateValue
              : isRgb(stateValue)
              ? '#' + rgbHex(stateValue)
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
            height: 24,
            width: 24,
            bottom: 0,
            border: '1px solid red',
            appearance: 'none',
            background: 'none',
          }}
        />
      </div>

      <div
        style={{
          marginLeft: 15,
          display: 'flex',
          width: '100%',
          justifyContent: 'space-between',
        }}
      >
        <div
          style={{
            minWidth: '80%',
            display: 'flex',
          }}
        >
          <Text
            placeholder={placeholder}
            value={toRgb(stateValue)}
            onChange={update}
            blur={blur}
            focus={focus}
          />
        </div>
      </div>
    </div>
  )
}
