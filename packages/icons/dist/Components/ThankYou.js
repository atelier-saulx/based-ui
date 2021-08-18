"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const theme_1 = require("@based/theme");
const ThankYou = ({ color, framed, size, frameColor, }) => {
    return (react_1.default.createElement("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none" },
        framed ? (react_1.default.createElement("rect", { width: "24", height: "24", rx: "4", fill: theme_1.useColor(frameColor) })) : null,
        react_1.default.createElement("path", { d: "M18.125 6C18.6082 6 19 6.39175 19 6.875L19 17.125C19 17.6082 18.6083 18 18.125 18L13.75 18C13.2668 18 12.875 17.6082 12.875 17.125L12.875 6.875C12.875 6.39175 13.2668 6 13.75 6L18.125 6Z", fill: theme_1.useColor(color) }),
        react_1.default.createElement("rect", { opacity: "0.7", x: "12", y: "16.2857", width: "3.5", height: "8.57143", rx: "0.4375", transform: "rotate(180 12 16.2857)", fill: theme_1.useColor(color) }),
        react_1.default.createElement("rect", { opacity: "0.4", x: "7.625", y: "14.5714", width: "2.625", height: "5.14286", rx: "0.175", transform: "rotate(180 7.625 14.5714)", fill: theme_1.useColor(color) })));
};
exports.default = ThankYou;
//# sourceMappingURL=ThankYou.js.map