"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Title = void 0;
const react_1 = __importDefault(require("react"));
const theme_1 = require("@based/theme");
const text_1 = require("@based/text");
const useDate_1 = __importDefault(require("./useDate"));
const Title = ({ children, style, color = { color: 'foreground' }, noSelect, singleLine, size, }) => {
    useDate_1.default(children);
    return (react_1.default.createElement("div", { style: {
            fontSize: size === 'large' ? '28px' : size === 'small' ? '17px' : '19px',
            lineHeight: size === 'large' ? '32px' : '24px',
            fontWeight: size === 'small' ? 600 : 'bold',
            userSelect: noSelect ? 'none' : 'text',
            color: theme_1.useColor(color),
            letterSpacing: '-0.015em',
            whiteSpace: singleLine ? 'nowrap' : null,
            overflow: singleLine ? 'hidden' : null,
            textOverflow: singleLine ? 'ellipsis' : null,
            ...style,
        } }, text_1.getTextValue(children)));
};
exports.Title = Title;
//# sourceMappingURL=Title.js.map