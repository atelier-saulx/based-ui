import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  FunctionComponent,
  CSSProperties,
} from 'react'
import { useColor, Color } from '@based/theme'
import './style.css'
import useHover from '../../hooks/events/useHover'
import { Validator } from './validators'

type MultilineInputProps = {
  style?: CSSProperties
  placeholder?: string
  border?: boolean
  autoFocus?: boolean
  onChange: (value: string | number | undefined) => void
  type?: 'text' | 'email' | 'number' | 'date' | 'time' | 'search'
  identifier?: any
  errorText?: string
  helperText?: string
  value?: string | number
  color?: Color
  validator?: Validator
  progress?: number
}

export const MultilineTextInput: FunctionComponent<MultilineInputProps> = ({
  placeholder = '',
  value = '',
  onChange,
  autoFocus,
  validator,
  color = { color: 'background', tone: 1 },
  border,
  identifier,
}) => {
  const identifierRef = useRef(identifier)
  const initialValue = useRef(value)
  const ref = useRef()
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

  useEffect(() => {
    if (ref.current) {
      // @ts-ignore
      ref.current.style.height = 'auto'
      // @ts-ignore
      ref.current.style.height = `${ref.current.scrollHeight + 5}px`
    }
  }, [stateValue])

  const update = useCallback(
    (e) => {
      const newvalue = e.target.value
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

  const blur = useCallback(() => {
    setFocus(false)
  }, [setFocus])

  const focus = useCallback(() => {
    setFocus(true)
  }, [setFocus])

  return (
    <textarea
      {...hover}
      onChange={update}
      onFocus={focus}
      onBlur={blur}
      ref={ref}
      autoFocus={autoFocus}
      style={{
        borderRadius: 4,
        background: useColor({
          color: color.color,
          tone: isFocus || isHover ? color.tone + 1 : 1,
        }),
        border: isFocus
          ? '2px solid ' +
            (isWrong
              ? useColor({ color: 'error' })
              : useColor({ color: 'primary' }))
          : '1px solid ' +
            (isWrong
              ? useColor({ color: 'error' })
              : useColor({
                  color: 'foreground',
                  tone: 5,
                  opacity: border ? 0.33 : 0,
                })),
        paddingLeft: isFocus ? 11 : 12,
        paddingRight: isFocus ? 11 : 12,
        paddingTop: isFocus ? 6.5 : 7.5,
        paddingBottom: isFocus ? 6.5 : 7.5,
        resize: 'none',
        height: 'auto',
        width: '100%',
        appearance: 'none',
        fontFamily: 'Font',
        color: useColor({ color: 'foreground' }),
        fontWeight: 'normal',
        fontSize: '15px',
        lineHeight: '24px',
        letterSpacing: '-0.015em',
      }}
      placeholder={placeholder}
      value={stateValue}
    />
  )
}
