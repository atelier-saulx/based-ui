"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const theme_1 = require("@based/theme");
const Custom = ({ color, framed, size, frameColor, }) => {
    return (react_1.default.createElement("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none" },
        framed ? (react_1.default.createElement("rect", { width: "24", height: "24", rx: "4", fill: theme_1.useColor(frameColor) })) : null,
        react_1.default.createElement("path", { d: "M11.75 8.75L11.375 8L10.625 7.625L11.375 7.25L11.75 6.5L12.125 7.25L12.875 7.625L12.125 8L11.75 8.75ZM8.375 10.25L7.74219 9.00781L6.5 8.375L7.74219 7.74219L8.375 6.5L9.00781 7.74219L10.25 8.375L9.00781 9.00781L8.375 10.25ZM16.625 13.25L17.2578 14.4922L18.5 15.125L17.2578 15.7578L16.625 17L15.9922 15.7578L14.75 15.125L15.9922 14.4922L16.625 13.25ZM18.2891 8.70312C18.4297 8.85938 18.5 9.03906 18.5 9.24219C18.5 9.44531 18.4297 9.61719 18.2891 9.75781L9.75781 18.2891C9.61719 18.4297 9.44531 18.5 9.24219 18.5C9.03906 18.5 8.85938 18.4297 8.70312 18.2891L6.71094 16.2969C6.57031 16.1406 6.5 15.9609 6.5 15.7578C6.5 15.5547 6.57031 15.3828 6.71094 15.2422L15.2422 6.71094C15.3828 6.57031 15.5547 6.5 15.7578 6.5C15.9609 6.5 16.1406 6.57031 16.2969 6.71094L18.2891 8.70312ZM14.9141 11.2578L16.9531 9.24219L15.7578 8.04688L13.7422 10.0859L14.9141 11.2578Z", fill: theme_1.useColor(color) })));
};
exports.default = Custom;
//# sourceMappingURL=Custom.js.map