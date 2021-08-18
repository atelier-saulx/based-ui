"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const theme_1 = require("@based/theme");
const Register = ({ color, framed, size, frameColor, }) => {
    return (react_1.default.createElement("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none" },
        framed ? (react_1.default.createElement("rect", { width: "24", height: "24", rx: "4", fill: theme_1.useColor(frameColor) })) : null,
        react_1.default.createElement("path", { d: "M12 19C15.8294 19 19 15.8225 19 12C19 8.17059 15.8225 5 11.9931 5C8.17059 5 5 8.17059 5 12C5 15.8225 8.17745 19 12 19ZM11.9863 13.1735C10.6686 13.1598 9.63235 12.0618 9.63235 10.5863C9.62549 9.2 10.6755 8.04706 11.9863 8.04706C13.3039 8.04706 14.3402 9.2 14.3402 10.5863C14.3402 12.0618 13.3108 13.1873 11.9863 13.1735ZM11.9863 17.9569C10.4147 17.9569 8.82255 17.3118 7.77255 16.1931C8.51373 15.0265 10.1265 14.3402 11.9863 14.3402C13.8324 14.3402 15.4588 15.0127 16.2069 16.1931C15.15 17.3118 13.5647 17.9569 11.9863 17.9569Z", fill: theme_1.useColor(color) })));
};
exports.default = Register;
//# sourceMappingURL=Register.js.map