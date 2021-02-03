import { IconName } from '@based/icons'
import { DataEventHandler, Data, ExportData, File } from '../../../types'
import { TextValue } from '@based/text'
import { ComponentType } from 'react'
import { HeaderProps } from '../Header'

import { ListDataProps, FooterProps } from '../List/types'

// seqence and flow
export type StepDataProps = ListDataProps

export type Sequence = {
  items: Data<StepDataProps>[]
  title: TextValue
  id: string | number
  icon?: IconName
  newSequence?: boolean
}

export type FlowProps = {
  onDrop?: DataEventHandler<{ data: ListDataProps[] } | { files: File[] }> // i think this is an order change - if this is not there dont allow order change
  onDropSequence?: DataEventHandler<{ data: Sequence[] } | { files: File[] }> // i think this is an order change - if this is not there dont allow order change
  paddingRight?: number
  paddingLeft?: number
  paddingTop?: number
  paddingBottom?: number
  items: Sequence[]
  onClick?: DataEventHandler<StepDataProps>
  actionIcon?: IconName
  onAction?: DataEventHandler<StepDataProps>
  footer: FooterProps
  stepFooter: FooterProps
  exportData?: ExportData<ListDataProps>
  exportDataSequence?: ExportData<ListDataProps>
  onOptions?: DataEventHandler<ListDataProps> // select options
  optionsIcon?: IconName
  contextualMenu?: boolean
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
  header?: HeaderProps
}
