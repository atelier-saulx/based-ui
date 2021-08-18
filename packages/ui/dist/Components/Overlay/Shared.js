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
exports.InnerShared = void 0;
const react_1 = __importStar(require("react"));
const theme_1 = require("@based/theme");
exports.InnerShared = react_1.forwardRef(({ width, style, children }, ref) => {
    return (react_1.default.createElement("div", { ref: ref, style: {
            pointerEvents: 'all',
            borderRadius: 2,
            width: width,
            background: theme_1.useColor({ color: 'background' }),
            overflowY: 'auto',
            overflowX: 'hidden',
            paddingTop: 10,
            border: '1px solid ' +
                theme_1.useColor({
                    color: 'foreground',
                    tone: 2,
                    opacity: 0.05,
                }),
            paddingBottom: 10,
            maxHeight: 'calc(100vh-30px)',
            boxShadow: `0px 3px 16px 1px ${theme_1.useColor({
                color: 'foreground',
                tone: 2,
                opacity: 0.15,
            })}`,
            ...style,
        } }, children));
});
exports.default = react_1.forwardRef(({ position, align = 'center', children, style, width = 'auto' }, ref) => {
    return (react_1.default.createElement("div", { style: {
            opacity: position ? 1 : 0,
            width: position ? position.containerWidth : 'auto',
            position: 'fixed',
            top: position ? position.y : 0,
            left: position ? position.x : 0,
            bottom: position ? position.bottom : null,
            display: 'flex',
            justifyContent: align,
            pointerEvents: 'none',
        } },
        react_1.default.createElement("div", { style: {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: position && position.spaceOnTop ? 'flex-end' : 'flex-start',
            } },
            react_1.default.createElement(exports.InnerShared, { ref: ref, width: position ? position.width : width, style: {
                    ...style,
                } }, children))));
});
//# sourceMappingURL=Shared.js.map