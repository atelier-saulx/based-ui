import { SyntheticEvent } from 'react'

// _id is used internaly
export type Data = { data: any; index?: number; _id?: number }

export type DataEventHandler = (e: Event | SyntheticEvent, data?: Data) => void

export type OnValueChange<T = any> = (value: T, index?: number) => void

export type Timestamp = number
