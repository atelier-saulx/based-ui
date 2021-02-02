import { IconName, IconStyleProps } from '@based/icons'
import { DataEventHandler, Data, ExportData, File } from '../../../types'
import { TextValue } from '@based/text'
import { Img } from '../types'

// TODO: is it the same as ListDataProps?
export type GridDataProps = {
  icon?: IconStyleProps & { name: IconName }
  img?: Img
  info?: TextValue
  title: TextValue
  id: string | number
}

export type GridProps = {
  header?: TextValue // TODO: type will become different
  items?: Data<GridDataProps>[]
  forceActive?: boolean
  exportData?: ExportData<GridDataProps>
  onOptions?: DataEventHandler<GridDataProps> // select options
  onDrop?: DataEventHandler<GridDataProps | { files: File[] }> // i think this is an order change - if this is not there dont allow order change
  onClick?: DataEventHandler<GridDataProps> // on click on the item
  paddingRight?: number
  paddingLeft?: number
  paddingTop?: number
  paddingBottom?: number
  activeId?: string | number
  contextualMenu?: any // TODO: type a function to pass to useMenu - make this better
  optionsIcon?: IconName
}
