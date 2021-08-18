"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const theme_1 = require("@based/theme");
const Expand = ({ color, framed, size, frameColor, }) => {
    return (react_1.default.createElement("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none" },
        framed ? (react_1.default.createElement("rect", { width: "24", height: "24", rx: "4", fill: theme_1.useColor(frameColor) })) : null,
        react_1.default.createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M14.9333 12.8C15.4667 12.4 15.4667 11.6 14.9333 11.2L9.6 7.2C8.94076 6.70557 8 7.17596 8 8L8 16C8 16.824 8.94076 17.2944 9.6 16.8L14.9333 12.8Z", fill: theme_1.useColor(color) })));
};
exports.default = Expand;
//# sourceMappingURL=Expand.js.map