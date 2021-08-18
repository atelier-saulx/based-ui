"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardOption = void 0;
const react_1 = __importDefault(require("react"));
const Text_1 = require("../Text");
const theme_1 = require("@based/theme");
const useHover_1 = __importDefault(require("../../hooks/events/useHover"));
const CheckBox_1 = require("./CheckBox");
const CardOption = ({ children, onChange, value, label = '', onHover, style }) => {
    const [hover, isHover] = useHover_1.default(onHover);
    return (react_1.default.createElement("div", { ...hover, onClick: () => {
            onChange(!value);
        }, style: {
            padding: value || isHover ? 11 : 12,
            display: 'flex',
            border: value || isHover
                ? '2px solid ' + theme_1.useColor({ color: 'primary' })
                : '1px solid ' + theme_1.useColor({ color: 'divider' }),
            alignItems: 'center',
            cursor: 'pointer',
            borderRadius: 4,
            transition: 'hover 0.15s, background-color 0.15s',
            ...style,
        } },
        react_1.default.createElement(CheckBox_1.Check, { overrideValue: value, value: value, disabledColor: { color: isHover ? 'primary' : 'divider' } }),
        react_1.default.createElement(Text_1.Text, { noSelect: true, singleLine: true, style: {
                marginLeft: 12,
                marginRight: 16,
            } }, label),
        children || null));
};
exports.CardOption = CardOption;
//# sourceMappingURL=CardOption.js.map