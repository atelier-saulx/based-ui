"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Footer = void 0;
const react_1 = __importStar(require("react"));
const Text_1 = require("../Text");
const theme_1 = require("@based/theme");
const icons_1 = require("@based/icons");
const useHover_1 = __importDefault(require("../../hooks/events/useHover"));
const Loader_1 = require("../Loader/Loader");
const Footer = ({ width, framed, paddingRight, icon = 'add', data, floating, paddingLeft, label = { en: 'Add item' }, onClick, items, style, }) => {
    const Icon = icon ? icons_1.iconFromString(icon) : null;
    const [hover, isHover, isActive] = useHover_1.default();
    const [loading, setLoading] = react_1.useState(false);
    return (react_1.default.createElement("div", { style: {
            cursor: 'pointer',
            marginLeft: paddingLeft || 0,
            marginRight: paddingRight || 0,
            padding: 15,
            display: 'flex',
            alignItems: 'center',
            border: framed ? '1px solid ' + theme_1.useColor({ color: 'divider' }) : null,
            borderTop: '1px solid ' + theme_1.useColor({ color: 'divider' }),
            borderBottomLeftRadius: 4,
            borderBottomRightRadius: 4,
            borderTopLeftRadius: floating ? 4 : null,
            borderTopRightRadius: floating ? 4 : null,
            height: 48,
            width,
            backgroundColor: isActive
                ? theme_1.useColor({ color: 'background', tone: 2 })
                : null,
            justifyContent: 'space-between',
            ...style,
        }, onClick: react_1.useCallback((e) => {
            setLoading(true);
            // @ts-ignore
            const p = onClick(e, data || items);
            if (p instanceof Promise) {
                p.then((v) => {
                    setLoading(false);
                });
            }
            else {
                setLoading(false);
            }
        }, [data, items, onClick]), ...hover },
        react_1.default.createElement("div", { style: {
                display: 'flex',
                alignItems: 'center',
            } },
            Icon ? (react_1.default.createElement(Icon, { style: { marginRight: 15, marginLeft: 1 }, color: { color: 'foreground', tone: isHover ? 1 : 3 } })) : null,
            react_1.default.createElement(Text_1.Text, { singleLine: true, noSelect: true, color: { color: 'foreground', tone: isHover ? 1 : 3 }, weight: "semibold" }, label)),
        loading ? react_1.default.createElement(Loader_1.Loader, { color: { color: 'foreground', tone: 3 } }) : null));
};
exports.Footer = Footer;
//# sourceMappingURL=Footer.js.map