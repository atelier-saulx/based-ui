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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const theme_1 = require("@based/theme");
const _1 = require(".");
const useThrottledCallback_1 = __importDefault(require("../../../hooks/useThrottledCallback"));
const HoverPath = ({ amount, i, code, d, legend, points }) => {
    const ctx = react_1.useContext(_1.GraphContext);
    const s = i % 3;
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("path", { 
            // @ts-ignore
            onMouseEnter: useThrottledCallback_1.default(() => {
                // @ts-ignore
                ctx.v = code;
                global.requestAnimationFrame(() => ctx.hover && ctx.hover(code));
            }, [ctx]), 
            // @ts-ignore
            onMouseLeave: useThrottledCallback_1.default(() => {
                // @ts-ignore
                ctx.v = '';
                global.requestAnimationFrame(() => ctx.hover && ctx.hover(''));
            }, [ctx]), d: d, style: {
                opacity: s === 1 ? 0.3 : s === 2 ? 0.4 : 0.1,
                // @ts-ignore
                ':hover': {
                    opacity: '1 !important',
                },
            }, fill: theme_1.useColor({
                color: 'primary',
                tone: 2,
            }) })));
};
exports.default = HoverPath;
//# sourceMappingURL=HoverPath.js.map