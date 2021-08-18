"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Loader = void 0;
const react_1 = __importStar(require("react"));
const theme_1 = require("@based/theme");
require("@compiled/react");
const Loader = ({ style, size = 20, color = { color: 'foreground' }, delay = 0, fadeIn, }) => {
    const stroke = theme_1.useColor(color);
    const [ready, setReady] = react_1.useState(!fadeIn && !delay);
    react_1.useEffect(() => {
        const timer = setTimeout(() => {
            setReady(true);
        }, delay);
        return () => {
            clearTimeout(timer);
        };
    }, []);
    const svg = (react_1.default.createElement("svg", { css: {
            position: 'absolute',
            top: 0,
            width: '100%',
            height: '100%',
            '@keyframes spin': {
                from: { transform: 'rotate(0deg)' },
                to: { transform: 'rotate(360deg)' },
            },
            animationName: 'spin',
            animationDuration: '0.3s',
            transform: 'rotate(-90deg)',
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite',
        }, viewBox: "0 0 32 32", width: size, height: size },
        react_1.default.createElement("circle", { cx: "16", cy: "16", fill: "none", r: "14", strokeWidth: "4", style: {
                stroke,
                opacity: 0.2,
            } }),
        react_1.default.createElement("circle", { cx: "16", cy: "16", fill: "none", r: "14", strokeWidth: "4", style: {
                stroke,
                strokeDasharray: 80,
                strokeDashoffset: 60,
            } })));
    return (react_1.default.createElement("div", { css: {
            position: 'relative',
            transition: 'opacity 0.5s',
        }, style: {
            opacity: ready ? 1 : 0,
            maxWidth: size,
            minWidth: size,
            width: size,
            height: size,
            ...style,
        } }, svg));
};
exports.Loader = Loader;
//# sourceMappingURL=Loader.js.map