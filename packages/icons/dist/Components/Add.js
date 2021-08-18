"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const theme_1 = require("@based/theme");
const Add = ({ color, framed, size, frameColor, }) => {
    return (react_1.default.createElement("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none" },
        framed ? (react_1.default.createElement("rect", { width: "24", height: "24", rx: "4", fill: theme_1.useColor(frameColor) })) : null,
        react_1.default.createElement("path", { d: "M18.5 12C18.5 12.506 18.0898 12.9161 17.5839 12.9161H12.9161V17.5839C12.9161 18.0898 12.506 18.5 12 18.5C11.494 18.5 11.0839 18.0898 11.0839 17.5839V12.9161H6.41611C5.91015 12.9161 5.5 12.506 5.5 12C5.5 11.494 5.91016 11.0839 6.41611 11.0839H11.0839V6.41611C11.0839 5.91015 11.494 5.5 12 5.5C12.506 5.5 12.9161 5.91016 12.9161 6.41611V11.0839H17.5839C18.0898 11.0839 18.5 11.494 18.5 12Z", fill: theme_1.useColor(color) })));
};
exports.default = Add;
//# sourceMappingURL=Add.js.map