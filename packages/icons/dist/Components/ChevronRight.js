"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const theme_1 = require("@based/theme");
const ChevronRight = ({ color, framed, size, frameColor, }) => {
    return (react_1.default.createElement("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none" },
        framed ? (react_1.default.createElement("rect", { width: "24", height: "24", rx: "4", fill: theme_1.useColor(frameColor) })) : null,
        react_1.default.createElement("path", { d: "M16 12C16 12.2016 15.9264 12.379 15.771 12.5323L9.28425 18.7823C9.14519 18.9274 8.96524 19 8.75256 19C8.3272 19 8 18.6855 8 18.2661C8 18.0565 8.08998 17.879 8.22086 17.7419L14.1759 12L8.22086 6.25806C8.08998 6.12097 8 5.93548 8 5.73387C8 5.31452 8.3272 5 8.75256 5C8.96524 5 9.14519 5.07258 9.28425 5.20968L15.771 11.4677C15.9264 11.6129 16 11.7984 16 12Z", fill: theme_1.useColor(color) })));
};
exports.default = ChevronRight;
//# sourceMappingURL=ChevronRight.js.map