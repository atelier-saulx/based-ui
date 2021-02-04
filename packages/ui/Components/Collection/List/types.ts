import { IconName } from '@based/icons'
import { DataEventHandler, Data, ExportData, File } from '../../../types'
import {
  CollectionitemProps,
  HeaderProps,
  FooterProps,
  OptionsComponent,
} from '../types'

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
