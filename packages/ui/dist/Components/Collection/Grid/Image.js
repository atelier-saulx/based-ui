"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Image = void 0;
const theme_1 = require("@based/theme");
const react_1 = __importDefault(require("react"));
const Image = ({ src }) => {
    return (react_1.default.createElement("div", { style: {
            // weird behaviour with 100% height in safari
            position: 'absolute',
            top: 0,
            borderTopLeftRadius: 4,
            borderTopRightRadius: 4,
            left: 0,
            bottom: 0,
            right: 0,
            backgroundImage: src
                ? `url(${src})`
                : `linear-gradient(135deg,${theme_1.useColor({
                    color: 'foreground',
                    tone: 5,
                    opacity: 0.3,
                })} 0%,${theme_1.useColor({ color: 'background', tone: 2 })} 100%)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        } }));
};
exports.Image = Image;
//# sourceMappingURL=Image.js.map