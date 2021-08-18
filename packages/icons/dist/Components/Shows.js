"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const theme_1 = require("@based/theme");
const Shows = ({ color, framed, size, frameColor, }) => {
    return (react_1.default.createElement("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none" },
        framed ? (react_1.default.createElement("rect", { width: "24", height: "24", rx: "4", fill: theme_1.useColor(frameColor) })) : null,
        react_1.default.createElement("path", { d: "M18.5362 15.1224V6.45573H5.46383V15.1224H18.5362ZM18.5362 5C18.922 5 19.2624 5.1467 19.5574 5.4401C19.8525 5.73351 20 6.07205 20 6.45573L19.966 15.1224C19.966 15.5061 19.8184 15.8446 19.5234 16.138C19.2511 16.4089 18.922 16.5443 18.5362 16.5443H14.8936V18H9.10638V16.5443H5.46383C5.07801 16.5443 4.73759 16.4089 4.44255 16.138C4.14752 15.8446 4 15.5061 4 15.1224V6.45573C4 6.07205 4.14752 5.73351 4.44255 5.4401C4.73759 5.1467 5.07801 5 5.46383 5H18.5362Z", fill: theme_1.useColor(color) })));
};
exports.default = Shows;
//# sourceMappingURL=Shows.js.map