"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScaleQuestion = exports.Russia = exports.Reset = exports.Register = exports.Poland = exports.Overview = exports.OpenQuestion = exports.NewUser = exports.NewTab = exports.NewFlow = exports.Netherlands = exports.MultipleChoice = exports.More = exports.Mobile = exports.MicrosoftColor = exports.Logic = exports.Lock = exports.List = exports.ImageFile = exports.Hide = exports.Grid = exports.Graph = exports.GoogleColor = exports.Google = exports.Globe = exports.Germany = exports.Font = exports.Expand = exports.EmptyLine = exports.Email = exports.EditName = exports.Edit = exports.Duplicate = exports.Drag = exports.DownThick = exports.Down = exports.Desktop = exports.Delete = exports.Date = exports.Dashboard = exports.Custom = exports.Collapse = exports.Close = exports.Clap = exports.ChevronRight = exports.ChevronLeft = exports.Checked = exports.AudioFile = exports.Apple = exports.Add = void 0;
exports.icons = exports.iconFromString = exports.WelcomeScreen = exports.WaitingScreen = exports.VideoFile = exports.Video = exports.Upload = exports.Up = exports.Unlock = exports.UnitedKingdom = exports.ToggleOn = exports.ToggleOff = exports.Time = exports.ThankYou = exports.Tablet = exports.Star = exports.SmartCopy = exports.Skip = exports.Shows = exports.Show = exports.Settings = exports.Search = void 0;
const react_1 = __importDefault(require("react"));
const useHover_1 = __importDefault(require("./useHover"));
const Add_1 = __importDefault(require("./Components/Add"));
const Apple_1 = __importDefault(require("./Components/Apple"));
const AudioFile_1 = __importDefault(require("./Components/AudioFile"));
const Checked_1 = __importDefault(require("./Components/Checked"));
const ChevronLeft_1 = __importDefault(require("./Components/ChevronLeft"));
const ChevronRight_1 = __importDefault(require("./Components/ChevronRight"));
const Clap_1 = __importDefault(require("./Components/Clap"));
const Close_1 = __importDefault(require("./Components/Close"));
const Collapse_1 = __importDefault(require("./Components/Collapse"));
const Custom_1 = __importDefault(require("./Components/Custom"));
const Dashboard_1 = __importDefault(require("./Components/Dashboard"));
const Date_1 = __importDefault(require("./Components/Date"));
const Delete_1 = __importDefault(require("./Components/Delete"));
const Desktop_1 = __importDefault(require("./Components/Desktop"));
const Down_1 = __importDefault(require("./Components/Down"));
const DownThick_1 = __importDefault(require("./Components/DownThick"));
const Drag_1 = __importDefault(require("./Components/Drag"));
const Duplicate_1 = __importDefault(require("./Components/Duplicate"));
const EditName_1 = __importDefault(require("./Components/EditName"));
const Edit_1 = __importDefault(require("./Components/Edit"));
const Email_1 = __importDefault(require("./Components/Email"));
const EmptyLine_1 = __importDefault(require("./Components/EmptyLine"));
const Expand_1 = __importDefault(require("./Components/Expand"));
const Font_1 = __importDefault(require("./Components/Font"));
const Germany_1 = __importDefault(require("./Components/Germany"));
const Globe_1 = __importDefault(require("./Components/Globe"));
const GoogleColor_1 = __importDefault(require("./Components/GoogleColor"));
const Google_1 = __importDefault(require("./Components/Google"));
const Graph_1 = __importDefault(require("./Components/Graph"));
const Grid_1 = __importDefault(require("./Components/Grid"));
const Hide_1 = __importDefault(require("./Components/Hide"));
const ImageFile_1 = __importDefault(require("./Components/ImageFile"));
const List_1 = __importDefault(require("./Components/List"));
const Lock_1 = __importDefault(require("./Components/Lock"));
const Logic_1 = __importDefault(require("./Components/Logic"));
const MicrosoftColor_1 = __importDefault(require("./Components/MicrosoftColor"));
const Mobile_1 = __importDefault(require("./Components/Mobile"));
const More_1 = __importDefault(require("./Components/More"));
const MultipleChoice_1 = __importDefault(require("./Components/MultipleChoice"));
const Netherlands_1 = __importDefault(require("./Components/Netherlands"));
const NewFlow_1 = __importDefault(require("./Components/NewFlow"));
const NewTab_1 = __importDefault(require("./Components/NewTab"));
const NewUser_1 = __importDefault(require("./Components/NewUser"));
const OpenQuestion_1 = __importDefault(require("./Components/OpenQuestion"));
const Overview_1 = __importDefault(require("./Components/Overview"));
const Poland_1 = __importDefault(require("./Components/Poland"));
const Register_1 = __importDefault(require("./Components/Register"));
const Reset_1 = __importDefault(require("./Components/Reset"));
const Russia_1 = __importDefault(require("./Components/Russia"));
const ScaleQuestion_1 = __importDefault(require("./Components/ScaleQuestion"));
const Search_1 = __importDefault(require("./Components/Search"));
const Settings_1 = __importDefault(require("./Components/Settings"));
const Show_1 = __importDefault(require("./Components/Show"));
const Shows_1 = __importDefault(require("./Components/Shows"));
const Skip_1 = __importDefault(require("./Components/Skip"));
const SmartCopy_1 = __importDefault(require("./Components/SmartCopy"));
const Star_1 = __importDefault(require("./Components/Star"));
const Tablet_1 = __importDefault(require("./Components/Tablet"));
const ThankYou_1 = __importDefault(require("./Components/ThankYou"));
const Time_1 = __importDefault(require("./Components/Time"));
const ToggleOff_1 = __importDefault(require("./Components/ToggleOff"));
const ToggleOn_1 = __importDefault(require("./Components/ToggleOn"));
const UnitedKingdom_1 = __importDefault(require("./Components/UnitedKingdom"));
const Unlock_1 = __importDefault(require("./Components/Unlock"));
const Up_1 = __importDefault(require("./Components/Up"));
const Upload_1 = __importDefault(require("./Components/Upload"));
const VideoFile_1 = __importDefault(require("./Components/VideoFile"));
const Video_1 = __importDefault(require("./Components/Video"));
const WaitingScreen_1 = __importDefault(require("./Components/WaitingScreen"));
const WelcomeScreen_1 = __importDefault(require("./Components/WelcomeScreen"));
const useMultipleEvents_1 = __importDefault(require("./useMultipleEvents"));
const EventIcon = ({ color, framed = false, frameColor = { color: 'primary' }, draggable = false, style, onClick, size = 24, Svg, onDown, onDrag, onDragStart, onMouseEnter, onDragEnd, onHover, }) => {
    const [h, isHover] = useHover_1.default();
    if (!color) {
        if (framed) {
            color = { color: 'background', tone: 1 };
        }
        else {
            color = { color: 'foreground', tone: isHover ? 2 : 3 };
        }
    }
    let events;
    if (onMouseEnter) {
        if (!events) {
            events = {};
        }
        events.onMouseEnter = onMouseEnter;
    }
    if (onDown) {
        if (!events) {
            events = {};
        }
        events.onDown = onDown;
    }
    return (react_1.default.createElement("div", { draggable: draggable, style: {
            cursor: (onDragStart || onDrag) && !onClick ? 'grab' : 'pointer',
            ...style,
        }, onDrag: onDrag, onDragStart: onDragStart, onClick: onClick, onDragEnd: onDragEnd, onMouseDown: onDown, onMouseEnter: onMouseEnter || onHover, ...(events ? useMultipleEvents_1.default(events, h) : h) },
        react_1.default.createElement(Svg, { color: color, frameColor: frameColor, size: size, framed: framed })));
};
const SimpleIcon = ({ color, framed = false, frameColor = { color: 'primary' }, style, size = 24, Svg, }) => {
    if (!color) {
        if (framed) {
            color = { color: 'background', tone: 1 };
        }
        else {
            color = { color: 'foreground', tone: 3 };
        }
    }
    return (react_1.default.createElement("div", { style: style },
        react_1.default.createElement(Svg, { color: color, frameColor: frameColor, size: size, framed: framed })));
};
const Icon = (props) => {
    const { onClick, onDown, onDrag, onDragStart } = props;
    return onClick || onDown || onDragStart || onDrag ? (react_1.default.createElement(EventIcon, { ...props })) : (
    // @ts-ignore
    react_1.default.createElement(SimpleIcon, { ...props }));
};
const wrapIcon = (Svg) => {
    return (props) => {
        return react_1.default.createElement(Icon, { ...props, Svg: Svg });
    };
};
const Add = wrapIcon(Add_1.default);
exports.Add = Add;
const Apple = wrapIcon(Apple_1.default);
exports.Apple = Apple;
const AudioFile = wrapIcon(AudioFile_1.default);
exports.AudioFile = AudioFile;
const Checked = wrapIcon(Checked_1.default);
exports.Checked = Checked;
const ChevronLeft = wrapIcon(ChevronLeft_1.default);
exports.ChevronLeft = ChevronLeft;
const ChevronRight = wrapIcon(ChevronRight_1.default);
exports.ChevronRight = ChevronRight;
const Clap = wrapIcon(Clap_1.default);
exports.Clap = Clap;
const Close = wrapIcon(Close_1.default);
exports.Close = Close;
const Collapse = wrapIcon(Collapse_1.default);
exports.Collapse = Collapse;
const Custom = wrapIcon(Custom_1.default);
exports.Custom = Custom;
const Dashboard = wrapIcon(Dashboard_1.default);
exports.Dashboard = Dashboard;
const Date = wrapIcon(Date_1.default);
exports.Date = Date;
const Delete = wrapIcon(Delete_1.default);
exports.Delete = Delete;
const Desktop = wrapIcon(Desktop_1.default);
exports.Desktop = Desktop;
const Down = wrapIcon(Down_1.default);
exports.Down = Down;
const DownThick = wrapIcon(DownThick_1.default);
exports.DownThick = DownThick;
const Drag = wrapIcon(Drag_1.default);
exports.Drag = Drag;
const Duplicate = wrapIcon(Duplicate_1.default);
exports.Duplicate = Duplicate;
const Edit = wrapIcon(Edit_1.default);
exports.Edit = Edit;
const EditName = wrapIcon(EditName_1.default);
exports.EditName = EditName;
const Email = wrapIcon(Email_1.default);
exports.Email = Email;
const EmptyLine = wrapIcon(EmptyLine_1.default);
exports.EmptyLine = EmptyLine;
const Expand = wrapIcon(Expand_1.default);
exports.Expand = Expand;
const Font = wrapIcon(Font_1.default);
exports.Font = Font;
const Germany = wrapIcon(Germany_1.default);
exports.Germany = Germany;
const Globe = wrapIcon(Globe_1.default);
exports.Globe = Globe;
const Google = wrapIcon(Google_1.default);
exports.Google = Google;
const GoogleColor = wrapIcon(GoogleColor_1.default);
exports.GoogleColor = GoogleColor;
const Graph = wrapIcon(Graph_1.default);
exports.Graph = Graph;
const Grid = wrapIcon(Grid_1.default);
exports.Grid = Grid;
const Hide = wrapIcon(Hide_1.default);
exports.Hide = Hide;
const ImageFile = wrapIcon(ImageFile_1.default);
exports.ImageFile = ImageFile;
const List = wrapIcon(List_1.default);
exports.List = List;
const Lock = wrapIcon(Lock_1.default);
exports.Lock = Lock;
const Logic = wrapIcon(Logic_1.default);
exports.Logic = Logic;
const MicrosoftColor = wrapIcon(MicrosoftColor_1.default);
exports.MicrosoftColor = MicrosoftColor;
const Mobile = wrapIcon(Mobile_1.default);
exports.Mobile = Mobile;
const More = wrapIcon(More_1.default);
exports.More = More;
const MultipleChoice = wrapIcon(MultipleChoice_1.default);
exports.MultipleChoice = MultipleChoice;
const Netherlands = wrapIcon(Netherlands_1.default);
exports.Netherlands = Netherlands;
const NewFlow = wrapIcon(NewFlow_1.default);
exports.NewFlow = NewFlow;
const NewTab = wrapIcon(NewTab_1.default);
exports.NewTab = NewTab;
const NewUser = wrapIcon(NewUser_1.default);
exports.NewUser = NewUser;
const OpenQuestion = wrapIcon(OpenQuestion_1.default);
exports.OpenQuestion = OpenQuestion;
const Overview = wrapIcon(Overview_1.default);
exports.Overview = Overview;
const Poland = wrapIcon(Poland_1.default);
exports.Poland = Poland;
const Register = wrapIcon(Register_1.default);
exports.Register = Register;
const Reset = wrapIcon(Reset_1.default);
exports.Reset = Reset;
const Russia = wrapIcon(Russia_1.default);
exports.Russia = Russia;
const ScaleQuestion = wrapIcon(ScaleQuestion_1.default);
exports.ScaleQuestion = ScaleQuestion;
const Search = wrapIcon(Search_1.default);
exports.Search = Search;
const Settings = wrapIcon(Settings_1.default);
exports.Settings = Settings;
const Show = wrapIcon(Show_1.default);
exports.Show = Show;
const Shows = wrapIcon(Shows_1.default);
exports.Shows = Shows;
const Skip = wrapIcon(Skip_1.default);
exports.Skip = Skip;
const SmartCopy = wrapIcon(SmartCopy_1.default);
exports.SmartCopy = SmartCopy;
const Star = wrapIcon(Star_1.default);
exports.Star = Star;
const Tablet = wrapIcon(Tablet_1.default);
exports.Tablet = Tablet;
const ThankYou = wrapIcon(ThankYou_1.default);
exports.ThankYou = ThankYou;
const Time = wrapIcon(Time_1.default);
exports.Time = Time;
const ToggleOff = wrapIcon(ToggleOff_1.default);
exports.ToggleOff = ToggleOff;
const ToggleOn = wrapIcon(ToggleOn_1.default);
exports.ToggleOn = ToggleOn;
const UnitedKingdom = wrapIcon(UnitedKingdom_1.default);
exports.UnitedKingdom = UnitedKingdom;
const Unlock = wrapIcon(Unlock_1.default);
exports.Unlock = Unlock;
const Up = wrapIcon(Up_1.default);
exports.Up = Up;
const Upload = wrapIcon(Upload_1.default);
exports.Upload = Upload;
const Video = wrapIcon(Video_1.default);
exports.Video = Video;
const VideoFile = wrapIcon(VideoFile_1.default);
exports.VideoFile = VideoFile;
const WaitingScreen = wrapIcon(WaitingScreen_1.default);
exports.WaitingScreen = WaitingScreen;
const WelcomeScreen = wrapIcon(WelcomeScreen_1.default);
exports.WelcomeScreen = WelcomeScreen;
const icons = {
    Add,
    Apple,
    AudioFile,
    Checked,
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
};
exports.icons = icons;
const iconFromString = (str) => {
    if (str && typeof str === 'string') {
        return icons[str[0].toUpperCase() + str.slice(1)];
    }
    else {
        return null;
    }
};
exports.iconFromString = iconFromString;
//# sourceMappingURL=index.js.map