import React, {
  CSSProperties,
  EventHandler,
  SyntheticEvent,
  FunctionComponent,
} from 'react'

import useHover from './useHover'

import SleepSvg from './Components/Sleep'
import KeySvg from './Components/Key'
import LightningSvg from './Components/Lightning'
import AddSvg from './Components/Add'
import NoticiationsSvg from './Components/Notifications'
import AppleSvg from './Components/Apple'
import AudioFileSvg from './Components/AudioFile'
import CheckedSvg from './Components/Checked'
import ResultsSvg from './Components/Results'
import ChevronLeftSvg from './Components/ChevronLeft'
import ChevronRightSvg from './Components/ChevronRight'
import ClapSvg from './Components/Clap'
import CloseSvg from './Components/Close'
import CollapseSvg from './Components/Collapse'
import CustomSvg from './Components/Custom'
import DashboardSvg from './Components/Dashboard'
import DateSvg from './Components/Date'
import DeleteSvg from './Components/Delete'
import DesktopSvg from './Components/Desktop'
import DownSvg from './Components/Down'
import DownThickSvg from './Components/DownThick'
import DragSvg from './Components/Drag'
import DuplicateSvg from './Components/Duplicate'
import EditNameSvg from './Components/EditName'
import EditSvg from './Components/Edit'
import EmailSvg from './Components/Email'
import EmptyLineSvg from './Components/EmptyLine'
import ExpandSvg from './Components/Expand'
import FontSvg from './Components/Font'
import GermanySvg from './Components/Germany'
import GlobeSvg from './Components/Globe'
import GoogleColorSvg from './Components/GoogleColor'
import GoogleSvg from './Components/Google'
import GraphSvg from './Components/Graph'
import GridSvg from './Components/Grid'
import HideSvg from './Components/Hide'
import ImageFileSvg from './Components/ImageFile'
import ListSvg from './Components/List'
import LockSvg from './Components/Lock'
import LogicSvg from './Components/Logic'
import MicrosoftColorSvg from './Components/MicrosoftColor'
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
import StarSvg from './Components/Star'
import TabletSvg from './Components/Tablet'
import ThankYouSvg from './Components/ThankYou'
import TimeSvg from './Components/Time'
import ToggleOffScreenSvg from './Components/ToggleOff'
import ToggleOnSvg from './Components/ToggleOn'
import UnitedKingdomSvg from './Components/UnitedKingdom'
import UnlockSvg from './Components/Unlock'
import UpSvg from './Components/Up'
import UploadSvg from './Components/Upload'
import VideoFileSvg from './Components/VideoFile'
import VideoSvg from './Components/Video'
import WaitingScreenSvg from './Components/WaitingScreen'
import WelcomeScreenSvg from './Components/WelcomeScreen'
import useMultipleEvents from './useMultipleEvents'

import { Color } from '@based/theme'
import { wrap } from 'module'

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
  hover?: boolean
  onHover?: GenericEventHandler
  onMouseEnter?: GenericEventHandler
  onClick?: GenericEventHandler
  draggable?: boolean
  onDragEnd?: GenericEventHandler
  onDrag?: GenericEventHandler
  onDragStart?: GenericEventHandler
}

const EventIcon: Icon = ({
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
  const [h, isHover] = useHover()

  if (!color) {
    if (framed) {
      color = { color: 'background', tone: 1 }
    } else {
      color = { color: 'foreground', tone: isHover ? 2 : 3 }
    }
  }

  let events: any

  if (onMouseEnter) {
    if (!events) {
      events = {}
    }
    events.onMouseEnter = onMouseEnter
  }
  if (onDown) {
    if (!events) {
      events = {}
    }
    events.onDown = onDown
  }

  return (
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
      {...(events ? useMultipleEvents(events, h) : h)}
    >
      <Svg color={color} frameColor={frameColor} size={size} framed={framed} />
    </div>
  )
}

const SimpleIcon = ({
  color,
  framed = false,
  frameColor = { color: 'primary' },
  style,
  size = 24,
  Svg,
}) => {
  if (!color) {
    if (framed) {
      color = { color: 'background', tone: 1 }
    } else {
      color = { color: 'foreground', tone: 3 }
    }
  }
  return (
    <div style={style}>
      <Svg color={color} frameColor={frameColor} size={size} framed={framed} />
    </div>
  )
}

const Icon: Icon = (props) => {
  const { onClick, onDown, onDrag, onDragStart } = props
  return onClick || onDown || onDragStart || onDrag ? (
    <EventIcon {...props} />
  ) : (
    // @ts-ignore
    <SimpleIcon {...props} />
  )
}

const wrapIcon = (
  Svg: FunctionComponent<SvgProps>
): FunctionComponent<IconProps> => {
  return (props: IconProps) => {
    return <Icon {...props} Svg={Svg} />
  }
}

const Notifications = wrapIcon(NoticiationsSvg)
const Sleep = wrapIcon(SleepSvg)
const Key = wrapIcon(KeySvg)
const Lightning = wrapIcon(LightningSvg)
const Add = wrapIcon(AddSvg)
const Apple = wrapIcon(AppleSvg)
const AudioFile = wrapIcon(AudioFileSvg)
const Checked = wrapIcon(CheckedSvg)
const Results = wrapIcon(ResultsSvg)
const ChevronLeft = wrapIcon(ChevronLeftSvg)
const ChevronRight = wrapIcon(ChevronRightSvg)
const Clap = wrapIcon(ClapSvg)
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
const Font = wrapIcon(FontSvg)
const Germany = wrapIcon(GermanySvg)
const Globe = wrapIcon(GlobeSvg)
const Google = wrapIcon(GoogleSvg)
const GoogleColor = wrapIcon(GoogleColorSvg)
const Graph = wrapIcon(GraphSvg)
const Grid = wrapIcon(GridSvg)
const Hide = wrapIcon(HideSvg)
const ImageFile = wrapIcon(ImageFileSvg)
const List = wrapIcon(ListSvg)
const Lock = wrapIcon(LockSvg)
const Logic = wrapIcon(LogicSvg)
const MicrosoftColor = wrapIcon(MicrosoftColorSvg)
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
const Star = wrapIcon(StarSvg)
const Tablet = wrapIcon(TabletSvg)
const ThankYou = wrapIcon(ThankYouSvg)
const Time = wrapIcon(TimeSvg)
const ToggleOff = wrapIcon(ToggleOffScreenSvg)
const ToggleOn = wrapIcon(ToggleOnSvg)
const UnitedKingdom = wrapIcon(UnitedKingdomSvg)
const Unlock = wrapIcon(UnlockSvg)
const Up = wrapIcon(UpSvg)
const Upload = wrapIcon(UploadSvg)
const Video = wrapIcon(VideoSvg)
const VideoFile = wrapIcon(VideoFileSvg)
const WaitingScreen = wrapIcon(WaitingScreenSvg)
const WelcomeScreen = wrapIcon(WelcomeScreenSvg)

const icons = {
  Notifications,
  Key,
  Sleep,
  Add,
  Apple,
  Lightning,
  AudioFile,
  Checked,
  Results,
  ChevronLeft,
  ChevronRight,
  Clap,
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
  Font,
  Germany,
  Globe,
  Google,
  GoogleColor,
  Graph,
  Grid,
  Hide,
  ImageFile,
  List,
  Lock,
  Logic,
  MicrosoftColor,
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
  Star,
  Tablet,
  ThankYou,
  Time,
  ToggleOff,
  ToggleOn,
  UnitedKingdom,
  Unlock,
  Up,
  Upload,
  Video,
  VideoFile,
  WaitingScreen,
  WelcomeScreen,
}

export type IconName =
  | keyof typeof icons
  | 'add'
  | 'sleep'
  | 'apple'
  | 'notifications'
  | 'key'
  | 'audioFile'
  | 'lightning'
  | 'checked'
  | 'results'
  | 'chevronLeft'
  | 'chevronRight'
  | 'clap'
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
  | 'font'
  | 'germany'
  | 'globe'
  | 'google'
  | 'googleColor'
  | 'graph'
  | 'grid'
  | 'hide'
  | 'imageFile'
  | 'list'
  | 'lock'
  | 'logic'
  | 'microsoftColor'
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
  | 'star'
  | 'tablet'
  | 'thankYou'
  | 'time'
  | 'toggleOff'
  | 'toggleOn'
  | 'unitedKingdom'
  | 'unlock'
  | 'up'
  | 'upload'
  | 'video'
  | 'videoFile'
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
  Notifications,
  Key,
  Sleep,
  Lightning,
  Add,
  Apple,
  AudioFile,
  Checked,
  Results,
  ChevronLeft,
  ChevronRight,
  Clap,
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
  Font,
  Germany,
  Globe,
  Google,
  GoogleColor,
  Graph,
  Grid,
  Hide,
  ImageFile,
  List,
  Lock,
  Logic,
  MicrosoftColor,
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
  Star,
  Tablet,
  ThankYou,
  Time,
  ToggleOff,
  ToggleOn,
  UnitedKingdom,
  Unlock,
  Up,
  Upload,
  Video,
  VideoFile,
  WaitingScreen,
  WelcomeScreen,
  iconFromString,
  icons,
}
