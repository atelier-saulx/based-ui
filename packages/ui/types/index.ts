import { SyntheticEvent } from 'react'

// _id is used internaly
export type Data<T = {}> = T & {
  data: any
  index?: number
  internalId?: number
}

export type DataEventHandler = (e: Event | SyntheticEvent, data?: Data) => void

export type OnValueChange<T = any> = (value: T, index?: number) => void

export type Timestamp = number
