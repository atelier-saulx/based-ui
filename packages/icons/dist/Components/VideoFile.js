"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const theme_1 = require("@based/theme");
const VideoFile = ({ color, framed, size, frameColor, }) => {
    return (react_1.default.createElement("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none" },
        framed ? (react_1.default.createElement("rect", { width: "24", height: "24", rx: "4", fill: theme_1.useColor(frameColor) })) : null,
        react_1.default.createElement("path", { d: "M17.214 5.33301H6.78732C5.98466 5.33301 5.33398 5.98369 5.33398 6.78634V17.213C5.33398 18.0157 5.98466 18.6663 6.78732 18.6663H17.214C18.0166 18.6663 18.6673 18.0157 18.6673 17.213V6.78634C18.6673 5.98369 18.0166 5.33301 17.214 5.33301Z", stroke: theme_1.useColor(color), strokeWidth: "1.33333", strokeLinecap: "round", strokeLinejoin: "round" }),
        react_1.default.createElement("path", { d: "M8.66602 5.33301V18.6663", stroke: theme_1.useColor(color), strokeWidth: "1.33333", strokeLinecap: "round", strokeLinejoin: "round" }),
        react_1.default.createElement("path", { d: "M15.334 5.33301V18.6663", stroke: theme_1.useColor(color), strokeWidth: "1.33333", strokeLinecap: "round", strokeLinejoin: "round" }),
        react_1.default.createElement("path", { d: "M5.33398 12H18.6673", stroke: theme_1.useColor(color), strokeWidth: "1.33333", strokeLinecap: "round", strokeLinejoin: "round" }),
        react_1.default.createElement("path", { d: "M5.33398 8.66699H8.66732", stroke: theme_1.useColor(color), strokeWidth: "1.33333", strokeLinecap: "round", strokeLinejoin: "round" }),
        react_1.default.createElement("path", { d: "M5.33398 15.333H8.66732", stroke: theme_1.useColor(color), strokeWidth: "1.33333", strokeLinecap: "round", strokeLinejoin: "round" }),
        react_1.default.createElement("path", { d: "M15.334 15.333H18.6673", stroke: theme_1.useColor(color), strokeWidth: "1.33333", strokeLinecap: "round", strokeLinejoin: "round" }),
        react_1.default.createElement("path", { d: "M15.334 8.66699H18.6673", stroke: theme_1.useColor(color), strokeWidth: "1.33333", strokeLinecap: "round", strokeLinejoin: "round" })));
};
exports.default = VideoFile;
//# sourceMappingURL=VideoFile.js.map