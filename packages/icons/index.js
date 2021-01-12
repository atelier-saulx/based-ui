import React from 'react'
import ArrowDownSvg from './Components/ArrowDown'
import ArrowUpSvg from './Components/ArrowUp'
import ArrowLeftSvg from './Components/ArrowLeft'
import ArrowRightSvg from './Components/ArrowRight'
import ChevronDownSvg from './Components/ChevronDown'
import ChevronUpSvg from './Components/ChevronUp'
import ChevronLeftSvg from './Components/ChevronLeft'
import ChevronRightSvg from './Components/ChevronRight'
import CloseSvg from './Components/Close'
import ClockSvg from './Components/Clock'
import ImageSvg from './Components/Image'
import SearchSvg from './Components/Search'
import DateSvg from './Components/Date'
import EmailSvg from './Components/Email'
import EditSvg from './Components/Edit'
import CheckSvg from './Components/Check'
import PlusSvg from './Components/Plus'
import KeySvg from './Components/Key'
import PageCheckSvg from './Components/PageCheck'
import PageIntroSvg from './Components/PageIntro'
import CircleSvg from './Components/Circle'
import OptionsSvg from './Components/Options'
import DragSvg from './Components/Drag'
import ContrastSvg from './Components/Contrast'
import ChartSvg from './Components/Chart'
import ShowSvg from './Components/Show'
import SettingsSvg from './Components/Settings'
import UploadSvg from './Components/Upload'

const Icon = ({
  size = 'small',
  color = 'default',
  style,
  onClick,
  Svg,
  onDown,
  onDrag,
  onDragStart,
  onMouseEnter,
  onDragEnd,
  draggable,
  onHover,
}) => {
  return onClick || onDown || onDragStart || onDrag ? (
    <div
      draggable={draggable}
      style={{
        opacity: 1,
        transition: 'opacity 0.15s',
        cursor: (onDragStart || onDrag) && !onClick ? 'grab' : 'pointer',
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
      <Svg size={size} color={color} />
    </div>
  ) : (
    <div style={style}>
      <Svg size={size} color={color} />
    </div>
  )
}

const wrapIcon = (Svg) => {
  return (props) => {
    return <Icon {...props} Svg={Svg} />
  }
}

const ArrowDown = wrapIcon(ArrowDownSvg)
const ArrowUp = wrapIcon(ArrowUpSvg)
const ArrowLeft = wrapIcon(ArrowLeftSvg)
const ArrowRight = wrapIcon(ArrowRightSvg)

const Settings = wrapIcon(SettingsSvg)

const ChevronDown = wrapIcon(ChevronDownSvg)
const ChevronUp = wrapIcon(ChevronUpSvg)
const ChevronLeft = wrapIcon(ChevronLeftSvg)
const ChevronRight = wrapIcon(ChevronRightSvg)

const Close = wrapIcon(CloseSvg)
const Clock = wrapIcon(ClockSvg)
const Image = wrapIcon(ImageSvg)
const Search = wrapIcon(SearchSvg)
const Date = wrapIcon(DateSvg)
const Email = wrapIcon(EmailSvg)
const Edit = wrapIcon(EditSvg)
const Check = wrapIcon(CheckSvg)
const Plus = wrapIcon(PlusSvg)
const Key = wrapIcon(KeySvg)
const PageCheck = wrapIcon(PageCheckSvg)
const PageIntro = wrapIcon(PageIntroSvg)
const Circle = wrapIcon(CircleSvg)
const Options = wrapIcon(OptionsSvg)
const Drag = wrapIcon(DragSvg)
const Contrast = wrapIcon(ContrastSvg)

const Chart = wrapIcon(ChartSvg)
const Show = wrapIcon(ShowSvg)

const Upload = wrapIcon(UploadSvg)

const icons = {
  Settings,
  Drag,
  Circle,
  Search,
  Clock,
  Check,
  ArrowDown,
  ArrowUp,
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Close,
  Icon,
  Date,
  Image,
  Email,
  Plus,
  Key,
  PageCheck,
  PageIntro,
  Options,
  Contrast,
  Chart,
  Show,
  Edit,
  Upload,
}

const iconFromString = (str) => {
  if (str && typeof str === 'string') {
    str = str[0].toUpperCase() + str.slice(1)
    return icons[str]
  } else {
    return null
  }
}

export {
  iconFromString,
  Drag,
  Circle,
  Search,
  Clock,
  Check,
  ArrowDown,
  ArrowUp,
  ArrowLeft,
  ArrowRight,
  Close,
  Settings,
  Icon,
  Date,
  Image,
  Email,
  Edit,
  Plus,
  Key,
  PageCheck,
  PageIntro,
  Options,
  Contrast,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Chart,
  Show,
  Upload,
}
