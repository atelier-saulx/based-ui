import { TextValue } from '@based/text'
import { SyntheticEvent } from 'react'

export type File = {
  content: any
  mime: string
  name: string
}

export type Data<T = {}> = T & {
  data: any
  index?: number
  exportData?: ExportData
}

export type DataEventHandler<T = {}> = (
  e: Event | SyntheticEvent,
  data?: Data<T>
) => void | Promise<void>

export type AsyncEvent = (e: Event | SyntheticEvent) => void | Promise<void>

export type MultiDataEventHandler<T = {}> = (
  e: Event | SyntheticEvent,
  data?: Data<T>[]
) => void | Promise<void>

export type OnValueChange<T = any> = (value: T, index?: number) => void

export type Timestamp = number

export type ExportedData = {
  file?: {
    value: any
    name: string
    mime: string
  }
  text?: TextValue
}

export type ExportData<T = any> = (data: Data<T>) => Promise<ExportedData>
