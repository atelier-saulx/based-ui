import { IconStyleProps, IconName } from '@based/icons'
import { TextFormat, TextValue } from '@based/text'
import { DataEventHandler, MultiDataEventHandler, Data } from '../../types'
import { CSSProperties, ComponentType } from 'react'

export type DataPath = (string | number)[]

export type ImgDataMap = {
  path: DataPath
}

export type IconDataMap = IconStyleProps & {
  path: DataPath
}

export type TextDataMap = {
  format?: TextFormat
  path: DataPath
}

export type DataMap =
  | (TextDataMap & { type: 'text' })
  | (ImgDataMap & { type: 'img' })
  | (IconDataMap & { type: 'icon' })

export type TableDataMap = {
  fields: DataMap[]
  id?: DataPath
}

export type CollectionDataMap = {
  title?: TextDataMap
  info?: TextDataMap
  img?: ImgDataMap
  icon?: IconDataMap
  id?: DataPath
}

export type SequenceDataMap = {
  title?: TextDataMap
  id?: DataPath
  img?: ImgDataMap
  icon?: IconDataMap
  items?: {
    path: DataPath
    data?: DataMap
  }
}

export type FooterProps<T = any> = {
  label?: TextValue
  floating?: boolean
  framed?: boolean
  data?: Data<T>
  paddingRight?: number
  style?: CSSProperties
  width?: number
  icon?: IconName
  paddingLeft?: number
  items?: Data<T>[]
  onClick: MultiDataEventHandler<Data<T>> | DataEventHandler<Data<T>>
}

export type ActionProps = {
  items: Object[]
}

export type HeaderProps = {
  label?: TextValue
  Actions?: ComponentType<ActionProps>
  framed?: boolean
  paddingRight?: number
  width?: number
  icon?: IconName
  paddingLeft?: number
  items?: Object[]
}
