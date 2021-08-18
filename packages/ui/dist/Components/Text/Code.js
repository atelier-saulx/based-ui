"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Code = void 0;
const react_1 = __importDefault(require("react"));
const theme_1 = require("@based/theme");
const Code = ({ children, style, color = { color: 'foreground' }, noSelect, }) => {
    return (react_1.default.createElement("div", { style: {
            color: theme_1.useColor(color),
            display: 'flex',
            ...style,
        } },
        react_1.default.createElement("pre", { style: {
                userSelect: 'text',
                lineHeight: '24px',
                fontSize: '13px',
                margin: 0,
                overflowX: 'hidden',
                fontFamily: 'Menlo, Consolas, Monaco, Liberation Mono, Lucida Console, monospace',
            } }, children)));
};
exports.Code = Code;
//# sourceMappingURL=Code.js.map