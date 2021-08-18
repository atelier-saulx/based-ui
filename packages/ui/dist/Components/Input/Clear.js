"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const icons_1 = require("@based/icons");
const Clear = ({ color = { color: 'foreground', tone: 1 }, style, onClick, }) => {
    return (react_1.default.createElement("div", { onClick: onClick, style: {
            paddingLeft: 4,
            position: 'absolute',
            right: 8,
            top: 0,
            bottom: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            transition: 'opacity 0.15s',
            cursor: 'pointer',
            ...style,
        } },
        react_1.default.createElement(icons_1.Close, { color: color })));
};
exports.default = Clear;
//# sourceMappingURL=Clear.js.map