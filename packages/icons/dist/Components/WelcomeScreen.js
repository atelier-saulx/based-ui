"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const theme_1 = require("@based/theme");
const WelcomeScreen = ({ color, framed, size, frameColor, }) => {
    const c = theme_1.useColor(color);
    return (react_1.default.createElement("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none" },
        framed ? (react_1.default.createElement("rect", { width: "24", height: "24", rx: "4", fill: theme_1.useColor(frameColor) })) : null,
        react_1.default.createElement("path", { d: "M5.875 18C5.39175 18 5 17.6082 5 17.125L5 6.875C5 6.39175 5.39175 6 5.875 6L10.25 6C10.7332 6 11.125 6.39175 11.125 6.875L11.125 17.125C11.125 17.6082 10.7332 18 10.25 18L5.875 18Z", fill: c }),
        react_1.default.createElement("rect", { opacity: "0.7", x: "12", y: "7.71423", width: "3.5", height: "8.57143", rx: "0.4375", fill: c }),
        react_1.default.createElement("rect", { opacity: "0.4", x: "16.375", y: "9.42859", width: "2.625", height: "5.14286", rx: "0.175", fill: c })));
};
exports.default = WelcomeScreen;
//# sourceMappingURL=WelcomeScreen.js.map