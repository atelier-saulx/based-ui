import React, {
  useReducer,
  CSSProperties,
  FunctionComponent,
  useMemo,
  useRef,
  useEffect,
} from 'react'
import { Color } from '@based/theme'
import { Input } from './Text'
import { OnValueChange } from '../../types'

type Timestamp = number

type DateTimeProps = {
  style?: CSSProperties
  border?: boolean
  autoFocus?: boolean
  onChange: OnValueChange<Timestamp>
  identifier?: any
  value?: Timestamp
  color?: Color
}

const addZero = (d) => {
  d = String(d)
  if (d.length === 1) {
    return '0' + d
  }
  return d
}

const DateTimeInput: FunctionComponent<DateTimeProps> = ({
  identifier,
  value,
  color,
  onChange,
  border,
  style,
}) => {
  const parsedValue = useMemo(() => value && new Date(value), [value])

  const [s, update] = useReducer((state, action) => {
    if (action.type === 'reset') {
      return action.value
    } else if (action.type === 'time') {
      if (!state) {
        state = new Date()
      }
      if (!action.value) {
        onChange(Number(state))
        return state
      }
      const t = action.value.split(':')
      state.setHours(parseInt(t[0], 10))
      state.setMinutes(parseInt(t[1], 10))
      onChange(Number(state))
    } else if (action.type === 'date') {
      if (!state) {
        state = new Date()
      }
      if (!action.value) {
        onChange(Number(state))
        return state
      }
      const x = new Date(action.value)
      state.setDate(x.getDate())
      state.setMonth(x.getMonth())
      state.setFullYear(x.getFullYear())
      onChange(Number(state))
    }
    return state
  }, parsedValue)

  const identifierRef = useRef(identifier)
  const initialValue = useRef(value)

  useEffect(() => {
    if (value !== Number(s) && value !== initialValue.current) {
      initialValue.current = value
      update({ type: 'reset', value: new Date(value) })
    } else if (identifierRef.current !== identifier) {
      identifierRef.current = identifier
      update({ type: 'reset', value: new Date(value) })
    } else if (!initialValue.current) {
      initialValue.current = value
      if (s === undefined && value) {
        update({ type: 'reset', value: new Date(value) })
      }
    }
  }, [value, identifier])

  if (identifierRef.current !== identifier) {
    identifierRef.current = identifier
    update({ type: 'reset', value: new Date(value) })
  }

  const time = s && addZero(s.getHours()) + ':' + addZero(s.getMinutes())

  const date =
    s &&
    s.getFullYear() +
      '-' +
      addZero(s.getMonth() + 1) +
      '-' +
      addZero(s.getDate())

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        ...style,
      }}
    >
      <div
        style={{
          width: 200,
        }}
      >
        <Input
          color={color}
          value={date}
          identifier={identifier}
          border={border}
          type="date"
          onChange={(value) => {
            update({
              // @ts-ignore
              type: 'date',
              value,
            })
          }}
          style={{ marginRight: 20 }}
        />
      </div>
      <div
        style={{
          width: 135,
        }}
      >
        <Input
          color={color}
          value={time}
          identifier={identifier}
          border={border}
          type="time"
          onChange={(value) => {
            update({
              // @ts-ignore
              type: 'time',
              value,
            })
          }}
        />
      </div>
    </div>
  )
}

export { DateTimeInput }
