import React, { 
    useState,
    useCallback, 
    useRef,
    CSSProperties,
    FunctionComponent
} from 'react'
import { useColor, Color } from '@based/theme'
import Clear from './Clear'
import { Search, Date, Clock, Email, ChevronDown, IconProps, iconFromString } from '@based/icons'
import { emailValidator } from './validators'
import { SubText } from '../Text/SubText'
import useDropdown from '../../hooks/useDropdown'
import './style.css'


export type Validator = (str) => boolean

type InputProps = {
  style?: CSSProperties
  icon?: string
  placeholder?: string
  autoFocus?: boolean
  onChange?: (value: string | number | undefined) => void,
  type?: string,
  validator?: Validator,
  identifier?: any
  errorText?: string,
  helperText?: string,
  value?: string | number,
  options?: any // TODO make this from dropdown!
}


export const Input: FunctionComponent<InputProps> = ({
  placeholder,
  value = '',
  onChange,
  autoFocus,
  icon,
  style,
  type = 'text',
  validator,
  options,
  errorText,
  helperText,
  identifier
}) => {
  const identifierRef = useRef(identifier)
  const initialValue = useRef(value)
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

  const update = useCallback(
    e => {
      let newvalue = e.target ? e.target.value : e
      if (newvalue && type === 'number') {
        newvalue = Number(newvalue)
      }
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

  const clear = useCallback(() => {
    setValue('')
    onChange('')
  }, [setValue, onChange])

  const blur = useCallback(() => {
    setFocus(false)
  }, [setFocus])

  const focus = useCallback(() => {
    setFocus(true)
  }, [setFocus])

  let Icon: FunctionComponent<IconProps>

  if (Icon === undefined) {
    if (icon) {
      Icon = iconFromString(icon)
    } else if (type === 'search') {
      Icon = Search
    } else if (type === 'date') {
      Icon = Date
    } else if (type === 'time') {
      Icon = Clock
    } else if (type === 'email') {
      Icon = Email
    }
  }

  if (type === 'email') {
    if (!validator) {
      validator = emailValidator
    }
    // languages...
    if (!errorText) {
      errorText = 'Please enter a valid email adress'
    }
  }

  return (
    <div
      style={{
        position: 'relative',
        paddingLeft: isFocus ? 14 : 15,
        paddingRight: isFocus ? 14 : 15,
        display: 'flex',
        alignItems: 'center',
        borderRadius: 8,
        flexGrow: 1,
        border: isFocus
          ? '2px solid ' + (isWrong ? useColor('secondary') : useColor('primary'))
          : '1px solid ' + (isWrong ? useColor('secondary') : useColor({ color: 'foreground', intensity: 5})),
        ...style
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
            <Icon color={{ color: 'foreground', intensity: 4 }} />
          </div>
          <div style={{ width: 28 }} />
        </>
      ) : null}

      <input
        type={type}
        value={stateValue}
        onChange={update}
        onFocus={focus}
        onBlur={blur}
        autoFocus={autoFocus}
        placeholder={placeholder}
        style={{
          width: '100%',
          paddingTop: isFocus ? 11.5 : 12.5,
          paddingBottom: isFocus ? 11.5 : 12.5,
          appearance: 'none',
          fontSize: 16,
          background: 'none',
          fontFamily: 'Inter',
          color: useColor('foreground'),
          fontWeight: 'normal'
        }}
      />

      {options ? (
        <ChevronDown
          onClick={useDropdown(
            options,
            stateValue,
            () => {
              return (value, index) => {
                if (index !== undefined) {
                  update(value === undefined ? '' : value)
                }
              }
            },
            [update],
            {
              align: 'flex-end',
              x: ({ x }) => x - 15,
              y: ({ y }) => y + 15,
              width: () => 'auto',
              selectTarget: target => {
                return target.parentNode
              }
            }
          )}
        />
      ) : (
        <Clear
          color={isWrong ? 'secondary' : isFocus ? 'primary' :  { color: 'foreground', intensity: 4 }}
          style={{
            // @ts-ignore
            opacity: stateValue || stateValue === 0 ? 1 : 0
          }}
          onClick={clear}
        />
      )}
      {isFocus && (errorText || helperText) ? (
        <SubText
          color={isWrong ? 'secondary' : 'foreground'}
          style={{
            marginLeft: 15,
            fontWeight: 'normal',
            position: 'absolute',
            bottom: -20,
            left: 0
          }}
        >
          {isWrong ? errorText : helperText || ''}
        </SubText>
      ) : null}
    </div>
  )
}
