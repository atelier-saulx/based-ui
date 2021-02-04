import { IconStyleProps, IconName } from '@based/icons'
import { TextFormat, TextValue } from '@based/text'
import { DataEventHandler, MultiDataEventHandler, Data } from '../../types'
import { CSSProperties, ComponentType } from 'react'

export type DataPath = (string | number)[]

export type ImgItemProps = {
  path: DataPath
}

export type IconItemProps = IconStyleProps & {
  path: DataPath
}

export type TextItemProps = {
  format?: TextFormat
  path: DataPath
}

export type ItemProps =
  | (TextItemProps & { type: 'text' })
  | (ImgItemProps & { type: 'img' })
  | (IconItemProps & { type: 'icon' })

export type TableitemProps = {
  fields: ItemProps[]
  id?: DataPath
}

export type CollectionitemProps = {
  title?: TextItemProps
  info?: TextItemProps
  img?: ImgItemProps
  icon?: IconItemProps
  id?: DataPath
  text?: TextItemProps
}

export type SequenceitemProps = {
  title?: TextItemProps
  id?: DataPath
  img?: ImgItemProps
  icon?: IconItemProps
  items?: {
    path: DataPath
    props?: CollectionitemProps
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
  items?: Object[]
  onClick: MultiDataEventHandler<Object> | DataEventHandler<Data<T>>
}

export type ActionProps = {
  items: Object[]
}

export type HeaderProps = {
  style?: CSSProperties
  label?: TextValue
  Actions?: ComponentType<ActionProps>
  framed?: boolean
  paddingRight?: number
  width?: number
  icon?: IconName
  paddingLeft?: number
  items?: Object[]
}

export type OptionsComponent = ComponentType<{
  onClick?: DataEventHandler
  isHover: boolean
  isActive: boolean
  isDragging: boolean
  isDragOver: boolean
  isSelected: boolean
  items: Object[]
  data: Data
  onOptions?: DataEventHandler
}>
