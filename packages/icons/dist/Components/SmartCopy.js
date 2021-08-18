"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const theme_1 = require("@based/theme");
const SmartCopy = ({ color, framed, size, frameColor, }) => {
    return (react_1.default.createElement("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none" },
        framed ? (react_1.default.createElement("rect", { width: "24", height: "24", rx: "4", fill: theme_1.useColor(frameColor) })) : null,
        react_1.default.createElement("path", { d: "M17.5136 18.5362V8.35745H9.42469V18.5362H17.5136ZM17.5136 6.92766C17.9053 6.92766 18.251 7.07518 18.5506 7.37021C18.8502 7.64255 19 7.97163 19 8.35745V18.5362C19 18.922 18.8502 19.2624 18.5506 19.5574C18.251 19.8525 17.9053 20 17.5136 20H9.42469C9.03292 20 8.68724 19.8525 8.38765 19.5574C8.08807 19.2624 7.93827 18.922 7.93827 18.5362V8.35745C7.93827 7.97163 8.08807 7.64255 8.38765 7.37021C8.68724 7.07518 9.03292 6.92766 9.42469 6.92766H17.5136ZM15.3012 4V5.46383H6.45185V15.6426H5V5.46383C5 5.07801 5.13827 4.73759 5.41481 4.44255C5.7144 4.14752 6.06008 4 6.45185 4H15.3012Z", fill: theme_1.useColor(color) })));
};
exports.default = SmartCopy;
//# sourceMappingURL=SmartCopy.js.map