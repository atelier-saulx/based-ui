"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const theme_1 = require("@based/theme");
const Google = ({ color, framed, size, frameColor, }) => {
    return (react_1.default.createElement("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none" },
        framed ? (react_1.default.createElement("rect", { width: "24", height: "24", rx: "4", fill: theme_1.useColor(frameColor) })) : null,
        react_1.default.createElement("path", { d: "M12.1357 9.726H18.8214C18.9214 10.167 19 10.58 19 11.161C19 15.158 16.2643 18 12.1429 18C8.2 18 5 14.864 5 11C5 7.136 8.2 4 12.1429 4C14.0714 4 15.6857 4.693 16.9214 5.827L14.8929 7.759C14.3786 7.283 13.4786 6.723 12.1429 6.723C9.77857 6.723 7.85 8.648 7.85 11.007C7.85 13.366 9.77857 15.291 12.1429 15.291C14.8786 15.291 15.8857 13.436 16.0714 12.337H12.1357V9.726Z", fill: theme_1.useColor(color) })));
};
exports.default = Google;
//# sourceMappingURL=Google.js.map