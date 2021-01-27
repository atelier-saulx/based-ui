import React, { useState, CSSProperties, FunctionComponent } from 'react'
import { Color } from '@based/theme'
import { Input } from './Text'

type Timestamp = number

type DateTimeProps = {
  style?: CSSProperties
  border?: boolean
  autoFocus?: boolean
  onChange: (value: Timestamp) => void
  identifier?: any
  value?: string | number
  color?: Color
}

const DateTimeInput: FunctionComponent<DateTimeProps> = ({
  identifier,
  value: Timestamp,
  color,
  onChange,
  border,
  style,
}) => {
  const [s, set] = useState<number | string>()

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        ...style,
      }}
    >
      <Input
        color={color}
        identifier={identifier}
        border={border}
        type="date"
        onChange={set}
        style={{ marginRight: 20 }}
      />
      <Input
        color={color}
        identifier={identifier}
        border={border}
        type="time"
        onChange={set}
      />
    </div>
  )
}

export { DateTimeInput }
