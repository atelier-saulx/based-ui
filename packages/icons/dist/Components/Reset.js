"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const theme_1 = require("@based/theme");
const Reset = ({ color, framed, size, frameColor, }) => {
    return (react_1.default.createElement("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none" },
        framed ? (react_1.default.createElement("rect", { width: "24", height: "24", rx: "4", fill: theme_1.useColor(frameColor) })) : null,
        react_1.default.createElement("path", { d: "M11.4241 11.7315C11.4241 11.4004 11.1714 11.1503 10.8295 11.1503C10.6735 11.1503 10.5248 11.2018 10.4059 11.3195L8.19879 13.5192C8.10218 13.0705 8.05759 12.5628 8.05759 11.9963C8.05759 9.04612 10.4431 6.68449 13.4231 6.68449C16.4106 6.68449 18.8035 9.04612 18.8035 11.9963C18.8035 14.9465 16.4106 17.3155 13.4231 17.3155C13.0664 17.3155 12.8063 17.5362 12.8063 17.8894C12.8063 18.2499 13.0664 18.5 13.4231 18.5C17.072 18.5 20 15.6013 20 11.9963C20 8.39134 17.072 5.5 13.4231 5.5C9.7817 5.5 6.86112 8.39134 6.86112 11.9963C6.86112 12.4304 6.90571 12.8571 6.98003 13.2765L5.03298 11.3121C4.91407 11.2018 4.76544 11.1503 4.60938 11.1503C4.26753 11.1503 4 11.4004 4 11.7241C4 11.908 4.05945 12.0552 4.17836 12.1582L7.28472 15.1893C7.40362 15.307 7.56712 15.3732 7.73061 15.3732C7.90153 15.3732 8.05016 15.3144 8.1765 15.1893L11.2531 12.1582C11.3646 12.0478 11.4241 11.908 11.4241 11.7315Z", fill: theme_1.useColor(color) })));
};
exports.default = Reset;
//# sourceMappingURL=Reset.js.map