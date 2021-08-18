"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SideMenu = void 0;
const react_1 = __importDefault(require("react"));
const theme_1 = require("@based/theme");
const Text_1 = require("../Text");
const SideMenuItem_1 = require("./SideMenuItem");
const useWindowSize_1 = __importDefault(require("../../hooks/events/useWindowSize"));
const isComponent_1 = __importDefault(require("../../util/isComponent"));
const SideMenu = ({ items, style, Logo, footer, collapse = 1500, }) => {
    const size = useWindowSize_1.default();
    const isSmall = collapse ? size.width < collapse : false;
    const wrapItems = items.map((item, index) => {
        if (item.hidden)
            return null;
        if (item.type === 'label') {
            return isSmall ? (react_1.default.createElement("div", { key: index, style: { height: 24 } })) : (react_1.default.createElement(Text_1.Text, { style: {
                    marginBottom: 8,
                    marginTop: 8,
                    marginLeft: 16,
                }, noSelect: true, singleLine: true, weight: "semibold", color: { color: 'foreground' }, key: index }, item.label));
        }
        return react_1.default.createElement(SideMenuItem_1.SideMenuItem, { isSmall: isSmall, key: index, ...item });
    });
    return (react_1.default.createElement("div", { style: {
            height: '100%',
            backgroundColor: theme_1.useColor({ color: 'background', tone: 2 }),
            width: isSmall ? 60 : 240,
            minWidth: isSmall ? 60 : 240,
            overflowX: 'hidden',
            padding: 8,
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            borderRight: '1px solid ' + theme_1.useColor({ color: 'divider' }),
            ...style,
        } },
        Logo ? (react_1.default.createElement("div", { style: {
                display: 'flex',
                alignItems: 'center',
                maxHeight: 60,
                marginTop: 16,
                minHeight: 60,
                paddingBottom: 8,
                marginBottom: 32,
            } },
            react_1.default.createElement(Logo, { isSmall: isSmall }))) : null,
        items ? (footer ? (react_1.default.createElement("div", { style: {
                flexGrow: 1,
                flexBasis: '100%',
                display: 'flex',
                flexDirection: 'column',
            } }, wrapItems)) : (wrapItems)) : null,
        footer ? (react_1.default.createElement("div", { style: {
                display: 'flex',
                flexDirection: 'column',
                flexGrow: 0,
            } }, isComponent_1.default(footer)
            ? react_1.default.createElement(footer, { isSmall })
            : footer.map((item, index) => {
                if (item.type === 'label') {
                    return (react_1.default.createElement(Text_1.Text, { style: {
                            marginBottom: 8,
                            marginTop: 8,
                        }, color: { color: 'foreground' }, key: index }, item.label));
                }
                return react_1.default.createElement(SideMenuItem_1.SideMenuItem, { key: index, ...item });
            }))) : null));
};
exports.SideMenu = SideMenu;
//# sourceMappingURL=SideMenu.js.map