"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const theme_1 = require("@based/theme");
const Tablet = ({ color, framed, size, frameColor, }) => {
    return (react_1.default.createElement("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none" },
        framed ? (react_1.default.createElement("rect", { width: "24", height: "24", rx: "4", fill: theme_1.useColor(frameColor) })) : null,
        react_1.default.createElement("path", { d: "M17.5136 17V5.21235H6.45185V17H17.5136ZM11.1877 19.6617C11.4181 19.8691 11.6831 19.9728 11.9827 19.9728C12.2823 19.9728 12.5358 19.8691 12.7432 19.6617C12.9737 19.4313 13.0889 19.1663 13.0889 18.8667C13.0889 18.5671 12.9737 18.3136 12.7432 18.1062C12.5358 17.8757 12.2823 17.7605 11.9827 17.7605C11.6831 17.7605 11.4181 17.8757 11.1877 18.1062C10.9802 18.3136 10.8765 18.5671 10.8765 18.8667C10.8765 19.1663 10.9802 19.4313 11.1877 19.6617ZM17.1679 3C17.6749 3 18.1012 3.18436 18.4469 3.55309C18.8156 3.89877 19 4.3251 19 4.8321V18.8667C19 19.3737 18.8156 19.8115 18.4469 20.1802C18.1012 20.5259 17.6749 20.6988 17.1679 20.6988H6.8321C6.3251 20.6988 5.88724 20.5259 5.51852 20.1802C5.17284 19.8115 5 19.3737 5 18.8667V4.8321C5 4.3251 5.17284 3.89877 5.51852 3.55309C5.88724 3.18436 6.3251 3 6.8321 3H17.1679Z", fill: theme_1.useColor(color) })));
};
exports.default = Tablet;
//# sourceMappingURL=Tablet.js.map