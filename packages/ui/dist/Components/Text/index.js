"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Text = void 0;
const react_1 = __importDefault(require("react"));
const theme_1 = require("@based/theme");
const text_1 = require("@based/text");
const useDate_1 = __importDefault(require("./useDate"));
const Text = ({ children, style, color = { color: 'foreground' }, noSelect, singleLine, weight = 'regular', }) => {
    useDate_1.default(children);
    return (react_1.default.createElement("div", { style: {
            fontSize: '15px',
            lineHeight: '24px',
            letterSpacing: '-0.015em',
            fontWeight: weight === 'semibold' ? 600 : weight === 'medium' ? 500 : 'normal',
            userSelect: noSelect ? 'none' : 'text',
            color: theme_1.useColor(color),
            whiteSpace: singleLine ? 'nowrap' : null,
            overflow: singleLine ? 'hidden' : null,
            textOverflow: singleLine ? 'ellipsis' : null,
            ...style,
        } }, text_1.getTextValue(children)));
};
exports.Text = Text;
//# sourceMappingURL=index.js.map