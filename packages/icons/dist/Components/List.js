"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const theme_1 = require("@based/theme");
const Hide = ({ color, framed, size, frameColor, }) => {
    return (react_1.default.createElement("svg", { width: "25", height: "20", viewBox: "0 0 25 20", fill: "none" },
        react_1.default.createElement("path", { d: "M2.66081 9.10375H22.3392C24.1092 9.10375 25 8.28897 25 6.61597V2.46605C25 0.803911 24.1092 0 22.3392 0H2.66081C0.890791 0 0 0.803911 0 2.46605V6.61597C0 8.28897 0.890791 9.10375 2.66081 9.10375ZM2.79963 7.46334C2.11708 7.46334 1.74688 7.12656 1.74688 6.45301V2.65073C1.74688 1.96632 2.11708 1.64041 2.79963 1.64041H22.1888C22.8829 1.64041 23.2531 1.96632 23.2531 2.65073V6.45301C23.2531 7.12656 22.8829 7.46334 22.1888 7.46334H2.79963ZM2.66081 20H22.3392C24.1092 20 25 19.1961 25 17.5231V13.3623C25 11.711 24.1092 10.8963 22.3392 10.8963H2.66081C0.890791 10.8963 0 11.711 0 13.3623V17.5231C0 19.1961 0.890791 20 2.66081 20ZM2.79963 18.3596C2.11708 18.3596 1.74688 18.0228 1.74688 17.3493V13.547C1.74688 12.8626 2.11708 12.5367 2.79963 12.5367H22.1888C22.8829 12.5367 23.2531 12.8626 23.2531 13.547V17.3493C23.2531 18.0228 22.8829 18.3596 22.1888 18.3596H2.79963Z", fill: theme_1.useColor(color) })));
};
exports.default = Hide;
//# sourceMappingURL=List.js.map