import { SyntheticEvent } from 'react'

// _id is used internaly
export type Data<T = {}> = T & {
  data: any
  index?: number
  internalId?: number
}

export type DataEventHandler<T = {}> = (
  e: Event | SyntheticEvent,
  data?: Data<T>
) => void

export type OnValueChange<T = any> = (value: T, index?: number) => void

export type Timestamp = number

export type ExportedData = {
  files: {
    [mime: string]: { value: string; name: string }
  }
  text?: string
}

export type ExportData<T = any> = (data: Data<T>) => Promise<ExportedData>
