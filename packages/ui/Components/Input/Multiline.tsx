import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  FunctionComponent,
  CSSProperties,
} from 'react'
import { useColor, Color } from '@based/theme'
import './style.css'
import useHover from '../../hooks/events/useHover'
import { Validator } from './validators'
import { OnValueChange } from '../../types'
import { SubText } from '../Text/SubText'
import { TextValue, getTextValue } from '@based/text'
import useInputValue from '../../hooks/useInputValue'

type MultilineInputProps = {
  style?: CSSProperties
  placeholder?: TextValue
  border?: boolean
  autoFocus?: boolean
  onChange: OnValueChange<string | undefined>
  identifier?: any
  errorText?: TextValue
  helperText?: TextValue
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
  style,
  validator,
  errorText,
  helperText,
  color = { color: 'background', tone: 1 },
  border,
  identifier,
}) => {
  const ref = useRef()
  const [isFocus, setFocus] = useState(false)
  const [isWrong, setWrong] = useState(false)
  const [hover, isHover] = useHover()
  const [stateValue, setValue] = useInputValue(value, identifier, isFocus)

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
    <div
      style={{
        position: 'relative',
        ...style,
      }}
    >
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
                    color: 'divider',
                    opacity: border ? 1 : 0,
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
        placeholder={String(getTextValue(placeholder))}
        value={stateValue}
      />
      {isFocus && (errorText || helperText) ? (
        <SubText
          color={{
            color: isWrong ? 'error' : 'foreground',
            tone: isWrong ? 1 : 3,
          }}
          style={{
            marginLeft: 4,
            position: 'absolute',
            bottom: -25,
            left: 0,
          }}
        >
          {isWrong ? errorText : helperText || ''}
        </SubText>
      ) : null}
    </div>
  )
}
