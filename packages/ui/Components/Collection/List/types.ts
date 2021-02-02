import { IconName, IconStyleProps } from '@based/icons'
import { DataEventHandler, Data, ExportData, File } from '../../../types'
import { TextValue } from '@based/text'
import { Img } from '../types'

export type ListDataProps = {
  icon?: IconStyleProps & { name: IconName }
  img?: Img
  info?: TextValue
  title: TextValue
  id: string | number
}

export type ListProps = {
  header?: TextValue // TODO: type will become different
  items?: Data<ListDataProps>[]
  forceActive?: boolean
  exportData?: ExportData<ListDataProps>
  onOptions?: DataEventHandler<ListDataProps> // select options
  onDrop?: DataEventHandler<ListDataProps | { files: File[] }> // i think this is an order change - if this is not there dont allow order change
  onClick?: DataEventHandler<ListDataProps> // on click on the item
  paddingRight?: number
  paddingLeft?: number
  paddingTop?: number
  paddingBottom?: number
  activeId?: string | number
  contextualMenu?: boolean
  optionsIcon?: IconName
}
