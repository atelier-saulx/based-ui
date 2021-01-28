import { SyntheticEvent } from 'react'

export type Data = { [key: string]: any }

export type DataEventHandler = (e: Event | SyntheticEvent, data?: Data) => void
