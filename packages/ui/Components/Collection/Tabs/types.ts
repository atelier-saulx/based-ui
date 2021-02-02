import {TextValue} from "@based/text"
import {Color} from "@based/theme"
import {CSSProperties} from "react"

type TabSize = { width: number, x: number }
export type TabSizes = TabSize[]
type TabConfig = {
  title: TextValue
  onClick: any // TODO
}
export type TabProps = {
  tab: TabConfig
  onClick: any // TODO
  activeTab: number
  index: number
  tabSizes: TabSizes
  indicatorMargin?: number
}
export type TabsProps = {
  onChange: any // TODO
  active: number
  tabs: TabConfig[]
  style: CSSProperties
  noBorder: boolean
  indicatorMargin?: number
  color: Color
}
