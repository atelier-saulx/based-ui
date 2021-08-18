"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const theme_1 = require("@based/theme");
const MicrosoftColor = ({ color, framed, size, frameColor, }) => {
    return (react_1.default.createElement("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none" },
        framed ? (react_1.default.createElement("rect", { width: "24", height: "24", rx: "4", fill: theme_1.useColor(frameColor) })) : null,
        react_1.default.createElement("path", { d: "M3 3H11.5588V11.559H3V3Z", fill: "#E95228" }),
        react_1.default.createElement("path", { d: "M12.4414 3H21.0002V11.559H12.4414V3Z", fill: "#7EBA28" }),
        react_1.default.createElement("path", { d: "M3 12.457H11.5588V20.9997H3V12.457Z", fill: "#339FDA" }),
        react_1.default.createElement("path", { d: "M12.4414 12.457H21.0002V20.9997H12.4414V12.457Z", fill: "#FBB811" })));
};
exports.default = MicrosoftColor;
//# sourceMappingURL=MicrosoftColor.js.map