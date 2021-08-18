"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const theme_1 = require("@based/theme");
const ChevronLeft = ({ color, framed, size, frameColor, }) => {
    return (react_1.default.createElement("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none" },
        framed ? (react_1.default.createElement("rect", { width: "24", height: "24", rx: "4", fill: theme_1.useColor(frameColor) })) : null,
        react_1.default.createElement("path", { d: "M8 12C8 12.2016 8.07362 12.379 8.22904 12.5323L14.7157 18.7823C14.8548 18.9274 15.0348 19 15.2474 19C15.6728 19 16 18.6855 16 18.2661C16 18.0565 15.91 17.879 15.7791 17.7419L9.82413 12L15.7791 6.25806C15.91 6.12097 16 5.93548 16 5.73387C16 5.31452 15.6728 5 15.2474 5C15.0348 5 14.8548 5.07258 14.7157 5.20968L8.22904 11.4677C8.07362 11.6129 8 11.7984 8 12Z", fill: theme_1.useColor(color) })));
};
exports.default = ChevronLeft;
//# sourceMappingURL=ChevronLeft.js.map