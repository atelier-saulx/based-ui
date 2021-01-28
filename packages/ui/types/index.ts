import { SyntheticEvent } from 'react'

export type Data = { data: any; index?: number }

export type DataEventHandler = (e: Event | SyntheticEvent, data?: Data) => void

export type OnValueChange<T = any> = (value: T, index?: number) => void
