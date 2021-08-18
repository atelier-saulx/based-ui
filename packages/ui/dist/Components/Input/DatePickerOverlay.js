"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatePickerOverlay = void 0;
const react_1 = __importDefault(require("react"));
const icons_1 = require("@based/icons");
const useHover_1 = __importDefault(require("../../hooks/events/useHover"));
const theme_1 = require("@based/theme");
const DayCell = ({ highlight, onClick, children }) => {
    const [hover, isHover] = useHover_1.default();
    const clickable = onClick;
    return (react_1.default.createElement("div", { ...hover, onClick: onClick, style: {
            color: highlight ? theme_1.useColor({ color: 'background' }) : null,
            flexBasis: '9.5%',
            textAlign: 'center',
            cursor: !highlight && clickable ? 'pointer' : null,
            backgroundColor: highlight
                ? theme_1.useColor({ color: 'primary' })
                : clickable && isHover
                    ? theme_1.useColor({ color: 'background', tone: 3 })
                    : null,
            borderRadius: 15,
            paddingTop: 4,
            paddingBottom: 4,
            margin: 6,
        } }, children));
};
const dayOfTheWeekNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((v, i) => (react_1.default.createElement(DayCell, { key: i }, v)));
const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];
const DatePickerOverlay = ({ date, onChange, }) => {
    if (!date)
        return null;
    // day 0 is the last day of the previous month
    const amountDaysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    // Sunday is 0
    const startWeekDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    const emptyCells = [...Array(startWeekDay)].map((_, i) => (react_1.default.createElement(DayCell, { key: i }, "\u00A0")));
    const days = [...Array(amountDaysInMonth).keys()].map((v, i) => {
        return (react_1.default.createElement(DayCell, { key: i + startWeekDay, onClick: () => {
                if (onChange) {
                    onChange(new Date(date.getFullYear(), date.getMonth(), v + 1));
                }
            }, highlight: v + 1 === date.getDate() }, v + 1));
    });
    const dayCells = emptyCells.concat(days);
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("div", { style: {
                display: 'flex',
                width: 260,
                border: `1px solid ${theme_1.useColor({ color: 'divider' })}`,
                paddingTop: 8,
                paddingBottom: 8,
                marginBottom: 8,
            } },
            react_1.default.createElement("div", { style: {
                    display: 'flex',
                    flexWrap: 'nowrap',
                    marginLeft: 12,
                    alignItems: 'center',
                } },
                react_1.default.createElement("div", null, months[date.getMonth()]),
                react_1.default.createElement("div", { style: {
                        marginLeft: 8,
                    } }, date.getFullYear())),
            react_1.default.createElement("div", { style: {
                    display: 'flex',
                    flexWrap: 'nowrap',
                    flexGrow: 1,
                    justifyContent: 'flex-end',
                    marginRight: 6,
                } },
                react_1.default.createElement(icons_1.ChevronLeft, { onClick: () => {
                        onChange(new Date(date.setMonth(date.getMonth() - 1)));
                    } }),
                react_1.default.createElement(icons_1.ChevronRight, { onClick: () => {
                        onChange(new Date(date.setMonth(date.getMonth() + 1)));
                    } }))),
        react_1.default.createElement("div", { style: {
                display: 'flex',
                flexWrap: 'wrap',
            } },
            dayOfTheWeekNames,
            dayCells)));
};
exports.DatePickerOverlay = DatePickerOverlay;
//# sourceMappingURL=DatePickerOverlay.js.map