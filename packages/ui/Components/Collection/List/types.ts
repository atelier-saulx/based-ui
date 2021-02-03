import { IconName, IconStyleProps } from '@based/icons'
import {
  DataEventHandler,
  MultiDataEventHandler,
  Data,
  ExportData,
  File,
} from '../../../types'
import { TextValue } from '@based/text'
import { Img } from '../types'
import { ComponentType } from 'react'
import {HeaderProps} from './../Header'

export type ListDataProps = {
  icon?: IconStyleProps & { name: IconName }
  img?: Img
  info?: TextValue
  title: TextValue
  id: string | number
}

export type ListProps = {
  header?: HeaderProps
  footer?: FooterProps
  items?: Data<ListDataProps>[]
  forceActive?: boolean
  exportData?: ExportData<ListDataProps>
  onOptions?: DataEventHandler<ListDataProps> // select options
  onDrop?: DataEventHandler<{ data: ListDataProps[] } | { files: File[] }> // i think this is an order change - if this is not there dont allow order change
  onClick?: DataEventHandler<ListDataProps> // on click on the item
  paddingRight?: number
  paddingLeft?: number
  paddingTop?: number
  paddingBottom?: number
  activeId?: string | number
  contextualMenu?: boolean
  framed?: boolean
  optionsIcon?: IconName
  Options?: ComponentType<{
    onClick?: DataEventHandler<ListDataProps>
    isHover: boolean
    isActive: boolean
    isDragging: boolean
    isDragOver: boolean
    isSelected: boolean
    items: Data<ListDataProps>[]
    data: Data<ListDataProps>
    onOptions?: DataEventHandler<ListDataProps>
  }>
  actionIcon?: IconName
  onAction?: DataEventHandler<ListDataProps>
}

export type ActionProps<T = ListDataProps> = {
  items: Data<T>[]
}

export type FooterProps<T = ListDataProps> = {
  label?: TextValue
  floating?: boolean
  framed?: boolean
  data?: Data<T>
  paddingRight?: number
  width?: number
  icon?: IconName
  paddingLeft?: number
  items?: Data<T>[]
  onClick: MultiDataEventHandler<ListDataProps>
}
