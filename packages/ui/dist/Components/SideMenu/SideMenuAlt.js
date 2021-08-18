"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SideMenuAlt = void 0;
const react_1 = __importDefault(require("react"));
const useHover_1 = __importDefault(require("../../hooks/events/useHover"));
const theme_1 = require("@based/theme");
const Text_1 = require("../../Components/Text");
const use_location_1 = __importDefault(require("wouter/use-location"));
const Button = ({ label, to, active, prefix }) => {
    const [hover, isHover] = useHover_1.default();
    const [, setLocation] = use_location_1.default();
    return (react_1.default.createElement("div", { style: {
            padding: 8,
            borderRadius: 4,
            paddingTop: 4,
            paddingBottom: 4,
            marginBottom: 8,
            background: theme_1.useColor({ color: 'divider', tone: 1 }),
            cursor: 'pointer',
            alignItems: 'center',
            transition: 'background 0.15s',
            backgroundColor: to === active
                ? theme_1.useColor({ color: 'primary', opacity: 0.1 })
                : isHover
                    ? theme_1.useColor({ color: 'background', tone: 3 })
                    : null,
        }, ...hover, onClick: () => {
            setLocation(`/${prefix}/${to}`);
        } },
        react_1.default.createElement(Text_1.Text, { noSelect: true, weight: to === active ? 'semibold' : 'regular', style: { marginLeft: to === active ? 1 : 0 }, color: { color: to === active ? 'primary' : 'foreground' } }, label)));
};
const Section = ({ active, prefix, label, items }) => {
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Text_1.Text, { weight: "semibold", noSelect: true, style: {
                marginTop: 32,
                paddingLeft: 8,
                marginBottom: 8,
            } }, label),
        items.map((v, i) => {
            return (react_1.default.createElement(Button, { key: i, label: v.label, active: active, prefix: prefix, to: v.to }));
        })));
};
const SideMenuAlt = ({ active, prefix, sections, }) => {
    const children = sections.map((v, i) => {
        return react_1.default.createElement(Section, { key: i, active: active, prefix: prefix, ...v });
    });
    return (react_1.default.createElement("div", { style: {
            paddingLeft: 16,
            paddingRight: 16,
            minWidth: 240,
            maxWidth: 240,
            paddingTop: 112 - 32,
            borderRight: '1px solid ' + theme_1.useColor({ color: 'divider' }),
        } }, children));
};
exports.SideMenuAlt = SideMenuAlt;
//# sourceMappingURL=SideMenuAlt.js.map