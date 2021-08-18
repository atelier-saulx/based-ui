"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const theme_1 = require("@based/theme");
const Overview = ({ color, framed, size, frameColor, }) => {
    return (react_1.default.createElement("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none" },
        framed ? (react_1.default.createElement("rect", { width: "24", height: "24", rx: "4", fill: theme_1.useColor(frameColor) })) : null,
        react_1.default.createElement("path", { d: "M16.2974 11.4622H17.7592C18.5842 11.4622 19 11.0451 19 10.1847V7.27105C19 6.41065 18.5842 6 17.7592 6H16.2974C15.4659 6 15.0501 6.41065 15.0501 7.27105V10.1847C15.0501 11.0451 15.4659 11.4622 16.2974 11.4622ZM11.2691 11.4622H12.7374C13.5624 11.4622 13.9782 11.0451 13.9782 10.1847V7.27105C13.9782 6.41065 13.5624 6 12.7374 6H11.2691C10.4441 6 10.0283 6.41065 10.0283 7.27105V10.1847C10.0283 11.0451 10.4441 11.4622 11.2691 11.4622ZM6.24084 18H7.70905C8.53411 18 8.94988 17.5894 8.94988 16.729V13.8088C8.94988 12.9549 8.53411 12.5378 7.70905 12.5378H6.24084C5.41578 12.5378 5 12.9549 5 13.8088V16.729C5 17.5894 5.41578 18 6.24084 18ZM11.2691 18H12.7374C13.5624 18 13.9782 17.5894 13.9782 16.729V13.8088C13.9782 12.9549 13.5624 12.5378 12.7374 12.5378H11.2691C10.4441 12.5378 10.0283 12.9549 10.0283 13.8088V16.729C10.0283 17.5894 10.4441 18 11.2691 18ZM16.2974 18H17.7592C18.5842 18 19 17.5894 19 16.729V13.8088C19 12.9549 18.5842 12.5378 17.7592 12.5378H16.2974C15.4659 12.5378 15.0501 12.9549 15.0501 13.8088V16.729C15.0501 17.5894 15.4659 18 16.2974 18Z", fill: theme_1.useColor(color), fillOpacity: "0.7" }),
        react_1.default.createElement("path", { d: "M7.70905 11.4622H6.24084C5.41578 11.4622 5 11.0451 5 10.1847V7.27105C5 6.41065 5.41578 6 6.24084 6H7.70905C8.53411 6 8.94988 6.41065 8.94988 7.27105V10.1847C8.94988 11.0451 8.53411 11.4622 7.70905 11.4622Z", fill: theme_1.useColor(color) })));
};
exports.default = Overview;
//# sourceMappingURL=Overview.js.map