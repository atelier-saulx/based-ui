"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Card = void 0;
const react_1 = __importDefault(require("react"));
const Text_1 = require("../Text");
const theme_1 = require("@based/theme");
const useHover_1 = __importDefault(require("../../hooks/events/useHover"));
const icons_1 = require("@based/icons");
const SubText_1 = require("../Text/SubText");
const Loader_1 = require("../Loader/Loader");
const useAsyncClick_1 = __importDefault(require("./useAsyncClick"));
const Card = ({ onClick, children = '', label = '', onHover, width = '100%', icon, frameColor = { color: 'primary' }, }) => {
    const [hover, isHover] = useHover_1.default(onHover);
    const Icon = icon && icons_1.iconFromString(icon);
    const [isLoading, handler] = useAsyncClick_1.default(onClick);
    return (react_1.default.createElement("div", { ...hover, onClick: isLoading ? null : handler, style: {
            width,
            padding: 20,
            border: isHover
                ? '1px solid ' + theme_1.useColor({ color: 'primary' })
                : '1px solid ' + theme_1.useColor({ color: 'divider' }),
            alignItems: 'center',
            position: 'relative',
            cursor: 'pointer',
            borderRadius: 4,
            transition: 'hover 0.15s, background-color 0.15s',
            backgroundColor: isHover
                ? theme_1.useColor({ color: 'primary', opacity: 0.05 })
                : null,
        } },
        isLoading ? (react_1.default.createElement(Loader_1.Loader, null)) : Icon ? (react_1.default.createElement(Icon, { framed: true, frameColor: frameColor })) : null,
        react_1.default.createElement(Text_1.Text, { weight: "semibold", noSelect: true, singleLine: true, style: {
                marginTop: 15,
            } }, label),
        react_1.default.createElement(SubText_1.SubText, { color: { color: 'foreground', tone: 2 }, noSelect: true }, children)));
};
exports.Card = Card;
//# sourceMappingURL=Card.js.map