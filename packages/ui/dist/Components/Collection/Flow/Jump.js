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
exports.Jump = void 0;
const react_1 = __importStar(require("react"));
const SubText_1 = require("../../Text/SubText");
const Text_1 = require("../../Text");
const theme_1 = require("@based/theme");
const Dot = ({ isHover }) => {
    return (react_1.default.createElement("div", { style: {
            borderRadius: '50%',
            width: 26,
            display: 'flex',
            justifyContent: 'center',
            animationDuration: '0.6s',
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite',
            animationDirection: 'alternate',
            // @ts-ignore
            '@keyframes': {
                from: {
                    opacity: 0.5,
                    // backgroundColor: useColor({ color: 'primary', opacity: 0.1 }),
                },
                to: {
                    opacity: 1,
                    // backgroundColor: useColor({ color: 'primary', opacity: 0.75 }),
                },
            },
            alignItems: 'center',
            height: 26,
            backgroundColor: theme_1.useColor({ color: 'primary', opacity: 0.1 }),
        } },
        react_1.default.createElement("div", { style: {
                width: 12,
                borderRadius: '50%',
                border: '2px solid ' + theme_1.useColor({ color: 'primary' }),
                height: 12,
                backgroundColor: theme_1.useColor({ color: 'background' }),
            } })));
};
const Logic = ({ color, style }) => {
    const c = theme_1.useColor(color);
    return (react_1.default.createElement("svg", { width: "15", height: "15", viewBox: "0 0 15 15", fill: "none", style: style },
        react_1.default.createElement("circle", { cx: "12.5656", cy: "6.17355", r: "1.76522", stroke: c, strokeWidth: "1.33913" }),
        react_1.default.createElement("circle", { cx: "12.5656", cy: "12.261", r: "1.76522", stroke: c, strokeWidth: "1.33913" }),
        react_1.default.createElement("path", { d: "M1 1.3042V7.39115C1 10.0805 3.18018 12.2607 5.86957 12.2607H10.7391", stroke: c, strokeWidth: "1.33913", strokeLinecap: "round" }),
        react_1.default.createElement("path", { d: "M10.7391 6.17383H1", stroke: c, strokeWidth: "1.33913" })));
};
const Jump = ({ label = 'jump to', items, data, isHover, onClick, }) => {
    const str = items.map((v) => v.index || v.id).join(', ');
    return (react_1.default.createElement("div", { style: {
            display: 'flex',
            alignItems: 'center',
        }, onClick: react_1.useCallback((e) => {
            onClick(e, data);
        }, [onClick, data]) },
        react_1.default.createElement(Dot, { isHover: isHover }),
        react_1.default.createElement(Logic, { color: { color: 'primary' }, style: { marginLeft: 14 } }),
        react_1.default.createElement(SubText_1.SubText, { style: { marginLeft: 7.5 }, singleLine: true, noSelect: true }, label),
        react_1.default.createElement(Text_1.Text, { style: { marginLeft: 5 }, weight: "semibold", singleLine: true }, str)));
};
exports.Jump = Jump;
//# sourceMappingURL=Jump.js.map