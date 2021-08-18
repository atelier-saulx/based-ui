"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const theme_1 = require("@based/theme");
const EditName = ({ color, framed, size, frameColor, }) => {
    return (react_1.default.createElement("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none" },
        framed ? (react_1.default.createElement("rect", { width: "24", height: "24", rx: "4", fill: theme_1.useColor(frameColor) })) : null,
        react_1.default.createElement("path", { d: "M17.8125 8.6875L16.5938 9.90625L14.0938 7.40625L15.3125 6.1875C15.4375 6.0625 15.5938 6 15.7812 6C15.9688 6 16.125 6.0625 16.25 6.1875L17.8125 7.75C17.9375 7.875 18 8.03125 18 8.21875C18 8.40625 17.9375 8.5625 17.8125 8.6875ZM6 15.5L13.375 8.125L15.875 10.625L8.5 18H6V15.5Z", fill: theme_1.useColor(color) })));
};
exports.default = EditName;
//# sourceMappingURL=EditName.js.map