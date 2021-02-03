import { IconName, IconStyleProps } from '@based/icons'
import { DataEventHandler, Data, ExportData, File } from '../../../types'
import { TextValue } from '@based/text'
import { Img } from '../types'
import { ComponentType, CSSProperties } from 'react'
import { HeaderProps } from './../Header'

// allmost the same as list props + fields

// here we actualy may need select data...

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
  framed?: boolean
  optionsIcon?: IconName
  contextualMenu?: boolean
  Options?: OptionsComponent
  actionIcon?: IconName
  onAction?: DataEventHandler<ListDataProps>
}
