import { IconName } from '@based/icons'
import { DataEventHandler, Data, ExportData, File } from '../../../types'
import { ComponentType } from 'react'
import { CollectionitemProps, HeaderProps, FooterProps } from '../types'

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

export type ListProps = {
  header?: HeaderProps
  footer?: FooterProps
  items?: Object[]
  forceActive?: boolean
  exportData?: ExportData
  onOptions?: DataEventHandler
  onDrop?: DataEventHandler<{ data: Data[] } | { files: File[] }>
  onClick?: DataEventHandler
  paddingRight?: number
  paddingLeft?: number
  paddingTop?: number
  paddingBottom?: number
  activeId?: string | number
  framed?: boolean
  optionsIcon?: IconName
  contextualMenu?: boolean
  Options?: OptionsComponent
  actionIcon?: IconName
  onAction?: DataEventHandler
  itemProps?: CollectionitemProps
}
