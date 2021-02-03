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
}
