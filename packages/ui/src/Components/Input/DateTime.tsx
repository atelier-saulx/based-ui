import React, {
  useReducer,
  CSSProperties,
  FunctionComponent,
  useMemo,
  useRef,
  useEffect,
} from 'react'
import { Color } from '../../theme'
import { OnValueChange, Timestamp } from '../../types'
import { DateInput } from './Date'
import { TimeInput } from './Time'

type DateTimeProps = {
  style?: CSSProperties
  border?: boolean
  autoFocus?: boolean
  onChange: OnValueChange<Timestamp>
  identifier?: any
  value?: Timestamp
  color?: Color
  useSeconds?: boolean
}

const DateTimeInput: FunctionComponent<DateTimeProps> = ({
  identifier,
  value,
  color,
  onChange,
  border,
  style,
  useSeconds,
}) => {
  const parsedValue = useMemo(() => value && new Date(value), [value])

  // TODO: confusing amount of hooks

  const [s, update] = useReducer((state: Date, action) => {
    if (action.type === 'reset') {
      return action.value
    } else if (action.type === 'time') {
      if (!state) {
        state = new Date()
      }
      if (typeof action.value === 'undefined') {
        onChange(state.getTime())
        return state
      }
      const timeInputDate = new Date(action.value)
      state.setHours(
        timeInputDate.getUTCHours(),
        timeInputDate.getUTCMinutes(),
        useSeconds ? timeInputDate.getUTCSeconds() : null
      )
      onChange(state.getTime())
    } else if (action.type === 'date') {
      if (!state) {
        state = new Date()
      }
      if (!action.value) {
        onChange(state.getTime())
        return state
      }
      const dateInputDate = new Date(action.value)
      state.setDate(dateInputDate.getDate())
      state.setMonth(dateInputDate.getMonth())
      state.setFullYear(dateInputDate.getFullYear())
      onChange(state.getTime())
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
        <DateInput
          color={color}
          value={s && s.getTime()}
          style={{ marginRight: 20 }}
          identifier={identifier}
          border={border}
          onChange={(value) => {
            update({
              // @ts-ignore
              type: 'date',
              value,
            })
          }}
        />
      </div>
      <div
        style={{
          width: 135,
        }}
      >
        <TimeInput
          color={color}
          value={
            s
              ? new Date().setUTCHours(
                  s.getHours(),
                  s.getMinutes(),
                  s.getSeconds()
                )
              : null
          }
          identifier={identifier}
          border={border}
          useSeconds={useSeconds}
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
