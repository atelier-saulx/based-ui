import { IconName } from '@based/icons'
import { DataEventHandler, Data, ExportData, File } from '../../../types'
import { ComponentType } from 'react'
import { HeaderProps, FooterProps, SequenceitemProps } from '../types'

export type FlowProps = {
  onDrop?: DataEventHandler<
    | { data: Data[]; targetIndex: number; targetData: Data }
    | { files: File[]; targetIndex: number; targetData: Data }
  > // i think this is an order change - if this is not there dont allow order change
  onDropSequence?: DataEventHandler<
    | { data: Data[]; targetIndex: number }
    | { files: File[]; targetIndex: number }
  > // i think this is an order change - if this is not there dont allow order change
  paddingRight?: number
  paddingLeft?: number
  paddingTop?: number
  paddingBottom?: number
  items: Object[]
  itemProps?: SequenceitemProps
  onClick?: DataEventHandler
  actionIcon?: IconName
  onAction?: DataEventHandler
  footer: FooterProps
  stepFooter: FooterProps
  exportData?: ExportData
  exportDataSequence?: ExportData
  onOptions?: DataEventHandler // select options
  optionsIcon?: IconName
  contextualMenu?: boolean
  Options?: ComponentType<{
    onClick?: DataEventHandler
    isHover: boolean
    isActive: boolean
    isDragging: boolean
    isDragOver: boolean
    isSelected: boolean
    items: Data[]
    data: Data
    onOptions?: DataEventHandler
  }>
  header?: HeaderProps
}
