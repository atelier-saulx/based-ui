"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Divider = void 0;
const react_1 = __importDefault(require("react"));
const theme_1 = require("@based/theme");
const Divider = ({ color = { color: 'divider' }, style }) => {
    return (react_1.default.createElement("div", { style: {
            borderBottom: '1px solid ' + theme_1.useColor(color),
            marginTop: 16,
            marginBottom: 16,
            ...style,
        } }));
};
exports.Divider = Divider;
//# sourceMappingURL=index.js.map