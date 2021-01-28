import { SyntheticEvent } from 'react'

export type Data = { data: any; index?: number }

export type DataEventHandler = (e: Event | SyntheticEvent, data?: Data) => void
