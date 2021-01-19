import React, {
  CSSProperties,
  EventHandler,
  SyntheticEvent,
  FunctionComponent,
} from 'react'

import AddSvg from './Components/Add'
import ChevronLeftSvg from './Components/ChevronLeft'
import ChevronRightSvg from './Components/ChevronRight'
import CollapseSvg from './Components/Collapse'
import DashboardSvg from './Components/Dashboard'
import DeleteSvg from './Components/Delete'
import DragSvg from './Components/Drag'
import DuplicateSvg from './Components/Duplicate'
import EditNameSvg from './Components/EditName'
import EditSvg from './Components/Edit'
import EmptyLineSvg from './Components/EmptyLine'
import ExpandSvg from './Components/Expand'
import GraphSvg from './Components/Graph'
import HideSvg from './Components/Hide'
import MoreSvg from './Components/More'
import NewFlowSvg from './Components/NewFlow'
import NewTabSvg from './Components/NewTab'
import ResetSvg from './Components/Reset'
import ScheduleSvg from './Components/Schedule'
import ShowSvg from './Components/Show'
import ShowsSvg from './Components/Shows'
import SmartCopySvg from './Components/SmartCopy'
import ToggleOffScreenSvg from './Components/ToggleOff'
import ToggleOnSvg from './Components/ToggleOn'
import UnlockSvg from './Components/Unlock'
import WelcomeScreenSvg from './Components/WelcomeScreen'

import { Color } from '@based/theme'

export type SvgProps = {
  color: Color
  framed: boolean
  frameColor: Color
  size: number
}

type GenericEventHandler = EventHandler<SyntheticEvent>

export type IconProps = {
  color?: Color
  style?: CSSProperties
  framed?: boolean
  frameColor?: Color
  onDown?: GenericEventHandler
  onHover?: GenericEventHandler
  onMouseEnter?: GenericEventHandler
  onClick?: GenericEventHandler
  draggable?: boolean
  onDragEnd?: GenericEventHandler
  onDrag?: GenericEventHandler
  onDragStart?: GenericEventHandler
  size?: number
}

const Icon: FunctionComponent<
  IconProps & { Svg: FunctionComponent<SvgProps> }
> = ({
  color,
  framed = false,
  frameColor = 'primary',
  draggable = false,
  style,
  onClick,
  size = 24,
  Svg,
  onDown,
  onDrag,
  onDragStart,
  onMouseEnter,
  onDragEnd,
  onHover,
}) => {
  if (!color) {
    if (framed) {
      color = 'background'
    } else {
      color = { color: 'foreground', intensity: 3 }
    }
  }

  return onClick || onDown || onDragStart || onDrag ? (
    <div
      draggable={draggable}
      style={{
        opacity: 1,
        transition: 'opacity 0.15s',
        cursor: (onDragStart || onDrag) && !onClick ? 'grab' : 'pointer',
        // @ts-ignore
        ':hover': {
          opacity: 0.5,
        },
        ...style,
      }}
      onDrag={onDrag}
      onDragStart={onDragStart}
      onClick={onClick}
      onDragEnd={onDragEnd}
      onMouseDown={onDown}
      onMouseEnter={onMouseEnter || onHover}
    >
      <Svg color={color} frameColor={frameColor} size={size} framed={framed} />
    </div>
  ) : (
    <div style={style}>
      <Svg color={color} frameColor={frameColor} size={size} framed={framed} />
    </div>
  )
}

const wrapIcon = (
  Svg: FunctionComponent<SvgProps>
): FunctionComponent<IconProps> => {
  return (props: IconProps) => {
    return <Icon {...props} Svg={Svg} />
  }
}

const Add = wrapIcon(AddSvg)
const ChevronLeft = wrapIcon(ChevronLeftSvg)
const ChevronRight = wrapIcon(ChevronRightSvg)
const Collapse = wrapIcon(CollapseSvg)
const Dashboard = wrapIcon(DashboardSvg)
const Delete = wrapIcon(DeleteSvg)
const Drag = wrapIcon(DragSvg)
const Duplicate = wrapIcon(DuplicateSvg)
const Edit = wrapIcon(EditSvg)
const EditName = wrapIcon(EditNameSvg)
const EmptyLine = wrapIcon(EmptyLineSvg)
const Expand = wrapIcon(ExpandSvg)
const Graph = wrapIcon(GraphSvg)
const Hide = wrapIcon(HideSvg)
const More = wrapIcon(MoreSvg)
const NewFlow = wrapIcon(NewFlowSvg)
const NewTab = wrapIcon(NewTabSvg)
const Reset = wrapIcon(ResetSvg)
const Schedule = wrapIcon(ScheduleSvg)
const Show = wrapIcon(ShowSvg)
const Shows = wrapIcon(ShowsSvg)
const SmartCopy = wrapIcon(SmartCopySvg)
const ToggleOff = wrapIcon(ToggleOffScreenSvg)
const ToggleOn = wrapIcon(ToggleOnSvg)
const Unlock = wrapIcon(UnlockSvg)
const WelcomeScreen = wrapIcon(WelcomeScreenSvg)

const icons = {
  Add,
  ChevronLeft,
  ChevronRight,
  Collapse,
  Dashboard,
  Delete,
  Drag,
  Duplicate,
  Edit,
  EditName,
  EmptyLine,
  Expand,
  Graph,
  Hide,
  More,
  NewFlow,
  NewTab,
  Reset,
  Schedule,
  Show,
  Shows,
  SmartCopy,
  ToggleOff,
  ToggleOn,
  Unlock,
  WelcomeScreen,
}

const iconFromString = (str: string): null | FunctionComponent<IconProps> => {
  if (str && typeof str === 'string') {
    str = str[0].toUpperCase() + str.slice(1)
    return icons[str]
  } else {
    return null
  }
}

export {
  icons,
  iconFromString,
  Add,
  ChevronLeft,
  ChevronRight,
  Collapse,
  Dashboard,
  Delete,
  Drag,
  Duplicate,
  Edit,
  EditName,
  EmptyLine,
  Expand,
  Graph,
  Hide,
  More,
  NewFlow,
  NewTab,
  Reset,
  Schedule,
  Show,
  Shows,
  SmartCopy,
  ToggleOff,
  ToggleOn,
  Unlock,
  WelcomeScreen,
}
