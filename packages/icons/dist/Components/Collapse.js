"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const theme_1 = require("@based/theme");
const Collapse = ({ color, framed, size, frameColor, }) => {
    return (react_1.default.createElement("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none" },
        framed ? (react_1.default.createElement("rect", { width: "24", height: "24", rx: "4", fill: theme_1.useColor(frameColor) })) : null,
        react_1.default.createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M11.2 15.9333C11.6 16.4667 12.4 16.4667 12.8 15.9333L16.8 10.6C17.2944 9.94076 16.824 9 16 9H8C7.17595 9 6.70557 9.94076 7.2 10.6L11.2 15.9333Z", fill: theme_1.useColor(color) })));
};
exports.default = Collapse;
//# sourceMappingURL=Collapse.js.map