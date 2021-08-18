"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Header = void 0;
const react_1 = __importDefault(require("react"));
const Text_1 = require("../Text");
const theme_1 = require("@based/theme");
const icons_1 = require("@based/icons");
const renderChildren_1 = __importDefault(require("../../util/renderChildren"));
const ModalTitle_1 = require("../Overlay/ModalTitle");
const Header = ({ label, children, width, framed, icon, items, data, style, weight = 'semibold', onEditTitle, autoFocusTitle, paddingLeft, indicator, paddingRight, noBorderBottom, isHover, isExpanded, onExpand, ...props }) => {
    const Icon = onExpand ? icons_1.Expand : icon ? icons_1.iconFromString(icon) : null;
    return (react_1.default.createElement("div", { style: {
            marginLeft: paddingLeft || 0,
            marginRight: paddingRight || 0,
            display: 'flex',
            alignItems: 'center',
            border: framed ? '1px solid ' + theme_1.useColor({ color: 'divider' }) : null,
            borderBottom: noBorderBottom || (onExpand && !isExpanded)
                ? '1px solid transparent'
                : '1px solid ' + theme_1.useColor({ color: 'divider' }),
            borderTopLeftRadius: 4,
            borderTopRightRadius: 4,
            height: 48,
            width,
            justifyContent: 'space-between',
            ...style,
        }, ...props },
        react_1.default.createElement("div", { style: {
                padding: 15,
                height: '100%',
                flexGrow: 1,
                display: 'flex',
                cursor: onExpand ? 'pointer' : null,
                alignItems: 'center',
            }, onClick: onExpand || null },
            onExpand ? (react_1.default.createElement(Icon, { style: {
                    marginRight: 15,
                    marginLeft: 1,
                    transition: 'transform',
                    transform: `rotate(${isExpanded ? '90deg' : '0deg'})`,
                }, color: { color: 'foreground' } })) : Icon ? (react_1.default.createElement(Icon, { style: { marginRight: 15, marginLeft: 1 }, color: { color: 'foreground' } })) : null,
            react_1.default.createElement("div", { style: {
                    display: 'flex',
                    alignItems: 'center',
                } },
                indicator ? (react_1.default.createElement(Text_1.Text, { weight: "semibold", style: { marginRight: 0 } }, indicator)) : null,
                onEditTitle ? (react_1.default.createElement(ModalTitle_1.ModalTitle, { placeholder: "Untitled", identifier: data && data.data.id, value: label, onEditTitle: (value) => onEditTitle(value, data), autoFocus: autoFocusTitle })) : (react_1.default.createElement(Text_1.Text, { singleLine: true, noSelect: true, weight: weight }, label)))),
        react_1.default.createElement("div", { style: {
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                paddingRight: 15,
            } }, renderChildren_1.default(children, { items, data, isHover }))));
};
exports.Header = Header;
//# sourceMappingURL=Header.js.map