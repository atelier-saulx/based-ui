import React, {
  CSSProperties,
  EventHandler,
  SyntheticEvent,
  FunctionComponent,
} from 'react'

import DashboardSvg from './Components/Dashboard'
import DragSvg from './Components/Drag'
import GraphSvg from './Components/Graph'
import NewFlowSvg from './Components/NewFlow'
import ResetSvg from './Components/Reset'
import ScheduleSvg from './Components/Schedule'
import ShowsSvg from './Components/Shows'
import WelcomeScreenSvg from './Components/WelcomeScreen'
import ToggleOffScreenSvg from './Components/ToggleOff'

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

const Dashboard = wrapIcon(DashboardSvg)
const Drag = wrapIcon(DragSvg)
const Graph = wrapIcon(GraphSvg)
const NewFlow = wrapIcon(NewFlowSvg)
const Reset = wrapIcon(ResetSvg)
const Schedule = wrapIcon(ScheduleSvg)
const Shows = wrapIcon(ShowsSvg)
const WelcomeScreen = wrapIcon(WelcomeScreenSvg)
const ToggleOff = wrapIcon(ToggleOffScreenSvg)

const icons = {
  Dashboard,
  Drag,
  Graph,
  NewFlow,
  Reset,
  Schedule,
  Shows,
  WelcomeScreen,
  ToggleOff,
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
  Dashboard,
  Drag,
  Graph,
  NewFlow,
  Reset,
  Schedule,
  Shows,
  WelcomeScreen,
  ToggleOff,
}
