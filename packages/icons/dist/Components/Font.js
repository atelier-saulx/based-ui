"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const theme_1 = require("@based/theme");
const Font = ({ color, framed, size, frameColor, }) => {
    return (react_1.default.createElement("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none" },
        framed ? (react_1.default.createElement("rect", { width: "24", height: "24", rx: "4", fill: theme_1.useColor(frameColor) })) : null,
        react_1.default.createElement("path", { d: "M4.74908 16.9404C5.19589 16.9404 5.43244 16.7551 5.577 16.2786L6.29322 14.2402H10.0386L10.7548 16.2786C10.8994 16.7551 11.1359 16.9404 11.5828 16.9404C12.0559 16.9404 12.3581 16.6559 12.3581 16.2124C12.3581 16.047 12.3318 15.908 12.2661 15.7227L9.37495 7.84712C9.17125 7.27134 8.79014 7 8.17248 7C7.58111 7 7.2 7.27134 7.00287 7.8405L4.09199 15.7624C4.02628 15.9345 4 16.0801 4 16.2257C4 16.6691 4.28255 16.9404 4.74908 16.9404ZM6.67433 12.996L8.15277 8.70748H8.1922L9.67064 12.996H6.67433ZM16.2152 16.9934C17.3454 16.9934 18.2062 16.4639 18.607 15.5175H18.6595V16.3183C18.6661 16.7485 18.9421 17 19.3232 17C19.724 17 20 16.7353 20 16.2919V10.1039C20 9.65387 19.724 9.38915 19.3232 9.38915C18.9355 9.38915 18.6595 9.65387 18.6595 10.1039V10.8981H18.607C18.2062 9.96492 17.3125 9.40238 16.2152 9.40238C14.3885 9.40238 13.1926 10.9113 13.1926 13.1946C13.1926 15.4911 14.3885 16.9934 16.2152 16.9934ZM16.6094 15.822C15.3873 15.822 14.6185 14.8094 14.6185 13.2012C14.6185 11.593 15.3873 10.5738 16.6094 10.5738C17.8251 10.5738 18.6267 11.6195 18.6267 13.2078C18.6267 14.8094 17.8382 15.822 16.6094 15.822Z", fill: theme_1.useColor(color) })));
};
exports.default = Font;
//# sourceMappingURL=Font.js.map