import React, { useReducer, CSSProperties, FunctionComponent } from 'react'
import { Color } from '@based/theme'
import { Input } from './Text'

type Timestamp = number

type DateTimeProps = {
  style?: CSSProperties
  border?: boolean
  autoFocus?: boolean
  onChange: (value: Timestamp) => void
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
  const [s, update] = useReducer((state: Date, action) => {
    if (action.type === 'time') {
      if (!state) {
        state = new Date()
      }
      const t = action.value.split(':')
      state.setHours(parseInt(t[0], 10))
      state.setMinutes(parseInt(t[1], 10))

      onChange(Number(state))
    } else if (action.type === 'date') {
      if (!state) {
        state = new Date()
      }
      const x = new Date(action.value)
      state.setDate(x.getDate())
      state.setMonth(x.getMonth())
      state.setFullYear(x.getFullYear())

      onChange(Number(state))
    }
    return state
  }, value && new Date(value))

  const time = s && s.getHours() + ':' + s.getMinutes()
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
