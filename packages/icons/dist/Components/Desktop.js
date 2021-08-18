"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const theme_1 = require("@based/theme");
const Desktop = ({ color, framed, size, frameColor, }) => {
    return (react_1.default.createElement("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none" },
        framed ? (react_1.default.createElement("rect", { width: "24", height: "24", rx: "4", fill: theme_1.useColor(frameColor) })) : null,
        react_1.default.createElement("path", { d: "M4.94044 16.5336H9.66695L9.44799 17.9908H8.5948C8.26258 17.9908 7.99077 18.2701 7.99077 18.6099C7.99077 18.9421 8.26258 19.2139 8.5948 19.2139H15.3977C15.7374 19.2139 16.0092 18.9421 16.0092 18.6099C16.0092 18.2701 15.7374 17.9908 15.3977 17.9908H14.5445L14.3331 16.5336H19.0596C20.3507 16.5336 21 15.9144 21 14.5931V5.94044C21 4.61913 20.3507 4 19.0596 4H4.94044C3.64933 4 3 4.61913 3 5.94044V14.5931C3 15.9144 3.64933 16.5336 4.94044 16.5336ZM4.54027 13.2114C4.31376 13.2114 4.2156 13.1208 4.2156 12.8867V5.96309C4.2156 5.42701 4.44211 5.2156 4.96309 5.2156H19.0369C19.5503 5.2156 19.7844 5.42701 19.7844 5.96309V12.8867C19.7844 13.1208 19.6787 13.2114 19.4522 13.2114H4.54027ZM12 15.7861C11.6149 15.7861 11.2978 15.469 11.2978 15.0839C11.2978 14.7139 11.6149 14.3893 12 14.3893C12.3775 14.3893 12.6946 14.7139 12.6946 15.0839C12.6946 15.469 12.3775 15.7861 12 15.7861Z", fill: theme_1.useColor(color) })));
};
exports.default = Desktop;
//# sourceMappingURL=Desktop.js.map