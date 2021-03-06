import React, {
  CSSProperties,
  EventHandler,
  SyntheticEvent,
  FunctionComponent,
} from 'react'

import AddSvg from './Components/Add'
import CheckedSvg from './Components/Checked'
import ChevronLeftSvg from './Components/ChevronLeft'
import ChevronRightSvg from './Components/ChevronRight'
import CloseSvg from './Components/Close'
import CollapseSvg from './Components/Collapse'
import CustomSvg from './Components/Custom'
import DashboardSvg from './Components/Dashboard'
import DateSvg from './Components/Date'
import DeleteSvg from './Components/Delete'
import DesktopSvg from './Components/Desktop'
import UpSvg from './Components/Up'
import DownSvg from './Components/Down'
import DownThickSvg from './Components/DownThick'
import DragSvg from './Components/Drag'
import DuplicateSvg from './Components/Duplicate'
import EditNameSvg from './Components/EditName'
import EditSvg from './Components/Edit'
import EmailSvg from './Components/Email'
import EmptyLineSvg from './Components/EmptyLine'
import ExpandSvg from './Components/Expand'
import GermanySvg from './Components/Germany'
import GraphSvg from './Components/Graph'
import HideSvg from './Components/Hide'
import LockSvg from './Components/Lock'
import LogicSvg from './Components/Logic'
import MobileSvg from './Components/Mobile'
import MoreSvg from './Components/More'
import MultipleChoiceSvg from './Components/MultipleChoice'
import NetherlandsSvg from './Components/Netherlands'
import NewFlowSvg from './Components/NewFlow'
import NewTabSvg from './Components/NewTab'
import NewUserSvg from './Components/NewUser'
import OpenQuestionSvg from './Components/OpenQuestion'
import OverviewSvg from './Components/Overview'
import PolandSvg from './Components/Poland'
import RegisterSvg from './Components/Register'
import ResetSvg from './Components/Reset'
import RussiaSvg from './Components/Russia'
import ScaleQuestionSvg from './Components/ScaleQuestion'
import SearchSvg from './Components/Search'
import SettingsSvg from './Components/Settings'
import ShowSvg from './Components/Show'
import ShowsSvg from './Components/Shows'
import SkipSvg from './Components/Skip'
import SmartCopySvg from './Components/SmartCopy'
import TabletSvg from './Components/Tablet'
import ThankYouSvg from './Components/ThankYou'
import TimeSvg from './Components/Time'
import ToggleOffScreenSvg from './Components/ToggleOff'
import ToggleOnSvg from './Components/ToggleOn'
import UnitedKingdomSvg from './Components/UnitedKingdom'
import UnlockSvg from './Components/Unlock'
import UploadSvg from './Components/Upload'
import VideoSvg from './Components/Video'
import WaitingScreenSvg from './Components/WaitingScreen'
import WelcomeScreenSvg from './Components/WelcomeScreen'

import { Color } from '@based/theme'

export type SvgProps = {
  color?: Color
  framed?: boolean
  frameColor?: Color
  size?: number
}

type GenericEventHandler = EventHandler<SyntheticEvent>

export type Icon = FunctionComponent<
  IconProps & { Svg: FunctionComponent<SvgProps> }
>

export type IconStyleProps = {
  color?: Color
  framed?: boolean
  frameColor?: Color
  size?: number
}

export type IconProps = IconStyleProps & {
  style?: CSSProperties
  onDown?: GenericEventHandler
  onHover?: GenericEventHandler
  onMouseEnter?: GenericEventHandler
  onClick?: GenericEventHandler
  draggable?: boolean
  onDragEnd?: GenericEventHandler
  onDrag?: GenericEventHandler
  onDragStart?: GenericEventHandler
}

const Icon: Icon = ({
  color,
  framed = false,
  frameColor = { color: 'primary' },
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
      color = { color: 'background' }
    } else {
      color = { color: 'foreground', tone: 3 }
    }
  }

  return onClick || onDown || onDragStart || onDrag ? (
    <div
      draggable={draggable}
      style={{
        cursor: (onDragStart || onDrag) && !onClick ? 'grab' : 'pointer',
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

const Up = wrapIcon(UpSvg)
const Add = wrapIcon(AddSvg)
const Checked = wrapIcon(CheckedSvg)
const ChevronLeft = wrapIcon(ChevronLeftSvg)
const ChevronRight = wrapIcon(ChevronRightSvg)
const Close = wrapIcon(CloseSvg)
const Collapse = wrapIcon(CollapseSvg)
const Custom = wrapIcon(CustomSvg)
const Dashboard = wrapIcon(DashboardSvg)
const Date = wrapIcon(DateSvg)
const Delete = wrapIcon(DeleteSvg)
const Desktop = wrapIcon(DesktopSvg)
const Down = wrapIcon(DownSvg)
const DownThick = wrapIcon(DownThickSvg)
const Drag = wrapIcon(DragSvg)
const Duplicate = wrapIcon(DuplicateSvg)
const Edit = wrapIcon(EditSvg)
const EditName = wrapIcon(EditNameSvg)
const Email = wrapIcon(EmailSvg)
const EmptyLine = wrapIcon(EmptyLineSvg)
const Expand = wrapIcon(ExpandSvg)
const Germany = wrapIcon(GermanySvg)
const Graph = wrapIcon(GraphSvg)
const Hide = wrapIcon(HideSvg)
const Lock = wrapIcon(LockSvg)
const Logic = wrapIcon(LogicSvg)
const Mobile = wrapIcon(MobileSvg)
const More = wrapIcon(MoreSvg)
const MultipleChoice = wrapIcon(MultipleChoiceSvg)
const Netherlands = wrapIcon(NetherlandsSvg)
const NewFlow = wrapIcon(NewFlowSvg)
const NewTab = wrapIcon(NewTabSvg)
const NewUser = wrapIcon(NewUserSvg)
const OpenQuestion = wrapIcon(OpenQuestionSvg)
const Overview = wrapIcon(OverviewSvg)
const Poland = wrapIcon(PolandSvg)
const Register = wrapIcon(RegisterSvg)
const Reset = wrapIcon(ResetSvg)
const Russia = wrapIcon(RussiaSvg)
const ScaleQuestion = wrapIcon(ScaleQuestionSvg)
const Search = wrapIcon(SearchSvg)
const Settings = wrapIcon(SettingsSvg)
const Show = wrapIcon(ShowSvg)
const Shows = wrapIcon(ShowsSvg)
const Skip = wrapIcon(SkipSvg)
const SmartCopy = wrapIcon(SmartCopySvg)
const Tablet = wrapIcon(TabletSvg)
const ThankYou = wrapIcon(ThankYouSvg)
const Time = wrapIcon(TimeSvg)
const ToggleOff = wrapIcon(ToggleOffScreenSvg)
const ToggleOn = wrapIcon(ToggleOnSvg)
const UnitedKingdom = wrapIcon(UnitedKingdomSvg)
const Unlock = wrapIcon(UnlockSvg)
const Upload = wrapIcon(UploadSvg)
const Video = wrapIcon(VideoSvg)
const WaitingScreen = wrapIcon(WaitingScreenSvg)
const WelcomeScreen = wrapIcon(WelcomeScreenSvg)

const icons = {
  Add,
  Checked,
  ChevronLeft,
  ChevronRight,
  Close,
  Up,
  Collapse,
  Custom,
  Dashboard,
  Date,
  Delete,
  Desktop,
  Down,
  DownThick,
  Drag,
  Duplicate,
  Edit,
  EditName,
  Email,
  EmptyLine,
  Expand,
  Germany,
  Graph,
  Hide,
  Lock,
  Logic,
  Mobile,
  More,
  MultipleChoice,
  Netherlands,
  NewFlow,
  NewTab,
  NewUser,
  OpenQuestion,
  Overview,
  Poland,
  Register,
  Reset,
  Russia,
  ScaleQuestion,
  Search,
  Settings,
  Show,
  Shows,
  Skip,
  SmartCopy,
  Tablet,
  ThankYou,
  Time,
  ToggleOff,
  ToggleOn,
  UnitedKingdom,
  Unlock,
  Upload,
  Video,
  WaitingScreen,
  WelcomeScreen,
}

export type IconName =
  | keyof typeof icons
  | 'add'
  | 'up'
  | 'checked'
  | 'chevronLeft'
  | 'chevronRight'
  | 'close'
  | 'collapse'
  | 'custom'
  | 'dashboard'
  | 'date'
  | 'delete'
  | 'desktop'
  | 'down'
  | 'downThick'
  | 'drag'
  | 'duplicate'
  | 'edit'
  | 'editName'
  | 'email'
  | 'emptyLine'
  | 'expand'
  | 'germany'
  | 'graph'
  | 'hide'
  | 'lock'
  | 'logic'
  | 'mobile'
  | 'more'
  | 'multipleChoice'
  | 'netherlands'
  | 'newFlow'
  | 'newTab'
  | 'newUser'
  | 'openQuestion'
  | 'overview'
  | 'poland'
  | 'register'
  | 'reset'
  | 'russia'
  | 'scaleQuestion'
  | 'search'
  | 'settings'
  | 'show'
  | 'shows'
  | 'skip'
  | 'smartCopy'
  | 'tablet'
  | 'thankYou'
  | 'time'
  | 'toggleOff'
  | 'toggleOn'
  | 'unitedKingdom'
  | 'unlock'
  | 'upload'
  | 'video'
  | 'waitingScreen'
  | 'welcomeScreen'

const iconFromString = (str: IconName): null | FunctionComponent<IconProps> => {
  if (str && typeof str === 'string') {
    return icons[str[0].toUpperCase() + str.slice(1)]
  } else {
    return null
  }
}

export {
  icons,
  iconFromString,
  Add,
  Up,
  Checked,
  ChevronLeft,
  ChevronRight,
  Close,
  Collapse,
  Custom,
  Dashboard,
  Date,
  Delete,
  Desktop,
  Down,
  DownThick,
  Drag,
  Duplicate,
  Edit,
  EditName,
  Email,
  EmptyLine,
  Expand,
  Germany,
  Graph,
  Hide,
  Lock,
  Logic,
  Mobile,
  More,
  MultipleChoice,
  Netherlands,
  NewFlow,
  NewTab,
  NewUser,
  OpenQuestion,
  Overview,
  Poland,
  Register,
  Reset,
  Russia,
  ScaleQuestion,
  Search,
  Settings,
  Show,
  Shows,
  Skip,
  SmartCopy,
  Tablet,
  ThankYou,
  Time,
  ToggleOff,
  ToggleOn,
  UnitedKingdom,
  Unlock,
  Upload,
  Video,
  WaitingScreen,
  WelcomeScreen,
}
