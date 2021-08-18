"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgressIndicator = void 0;
const react_1 = __importDefault(require("react"));
const theme_1 = require("@based/theme");
const calcSvg = (val) => {
    const r = 84;
    const c = Math.PI * (r * 2);
    if (val < 0) {
        val = 0;
    }
    else if (val > 100) {
        val = 100;
    }
    return ((100 - val) / 100) * c;
};
const ProgressIndicator = ({ value = 0, size = 25, style, }) => {
    return (react_1.default.createElement("div", { style: {
            width: size,
            height: size,
            animationDuration: '0.5s',
            animationIterationCount: value > 99 ? 'infinite' : null,
            // @ts-ignore
            '@keyframes': {
                // fade: {
                '0%': {
                    opacity: 0.5,
                },
                '50%': {
                    opacity: 1,
                },
                '100%': {
                    opacity: 0.5,
                },
                // },
            },
            ...style,
        } },
        react_1.default.createElement("svg", { style: {
                transform: 'rotate(-90deg)',
            }, strokeWidth: "30px", width: size, height: size, viewBox: "0 0 200 200" },
            react_1.default.createElement("circle", { r: "84", cx: "100", cy: "100", fill: "transparent", strokeDasharray: "527.781333333", style: {
                    stroke: theme_1.useColor({ color: 'foreground', opacity: 0.33 }),
                } }),
            react_1.default.createElement("circle", { id: "bar", r: "84", cx: "100", cy: "100", fill: "transparent", strokeDasharray: "527.781333333", strokeDashoffset: calcSvg(value) + 'px', style: {
                    transition: 'stroke-dashoffset 0.5s linear',
                    stroke: theme_1.useColor({ color: 'primary' }),
                } }))));
};
exports.ProgressIndicator = ProgressIndicator;
//# sourceMappingURL=ProgressIndicator.js.map