import { IconName } from '@based/icons'
import {
  DataEventHandler,
  ExportData,
  File,
  Data,
  OnValueChange,
} from '../../../types'
import { TableitemProps, OptionsComponent } from '../types'

export type FieldsViewUpdate = {
  sort?: { field: number; order: 'desc' | 'asc' }
  filter?: string
}

export type TableProps = {
  draggable?: boolean
  itemProps: TableitemProps
  large?: boolean
  items?: Object[]
  forceActive?: boolean
  exportData?: ExportData
  onOptions?: DataEventHandler // select options
  onDrop?: DataEventHandler<{ data: Data[] } | { files: File[] }>
  onClick?: DataEventHandler // on click on the item
  activeId?: string | number
  optionsIcon?: IconName
  contextualMenu?: boolean
  Options?: OptionsComponent
  actionIcon?: IconName
  filter?: boolean
  onChange: OnValueChange<FieldsViewUpdate>
  onAction?: DataEventHandler
}
