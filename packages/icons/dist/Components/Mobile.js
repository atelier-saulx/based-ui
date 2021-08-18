"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const theme_1 = require("@based/theme");
const Mobile = ({ color, framed, size, frameColor, }) => {
    return (react_1.default.createElement("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none" },
        framed ? (react_1.default.createElement("rect", { width: "24", height: "24", rx: "4", fill: theme_1.useColor(frameColor) })) : null,
        react_1.default.createElement("path", { d: "M15.4477 17.1047V6.31047H8.51625V17.1047H15.4477ZM11.1516 19.8484C11.3923 20.065 11.6691 20.1733 11.9819 20.1733C12.2948 20.1733 12.5596 20.065 12.7762 19.8484C13.0168 19.6077 13.1372 19.3309 13.1372 19.0181C13.1372 18.7052 13.0168 18.4404 12.7762 18.2238C12.5596 17.9832 12.2948 17.8628 11.9819 17.8628C11.6691 17.8628 11.3923 17.9832 11.1516 18.2238C10.935 18.4404 10.8267 18.7052 10.8267 19.0181C10.8267 19.3309 10.935 19.6077 11.1516 19.8484ZM15.0866 4C15.6161 4 16.0614 4.19254 16.4224 4.57762C16.8075 4.9627 17 5.41998 17 5.94946V19.0181C17 19.5475 16.8075 20.0048 16.4224 20.3899C16.0614 20.775 15.6161 20.9675 15.0866 20.9675H8.91336C8.38387 20.9675 7.92659 20.775 7.54152 20.3899C7.18051 20.0048 7 19.5475 7 19.0181V5.94946C7 5.41998 7.18051 4.9627 7.54152 4.57762C7.92659 4.19254 8.38387 4 8.91336 4H15.0866Z", fill: theme_1.useColor(color) })));
};
exports.default = Mobile;
//# sourceMappingURL=Mobile.js.map