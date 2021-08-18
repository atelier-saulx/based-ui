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
exports.Radio = void 0;
const react_1 = __importStar(require("react"));
const theme_1 = require("@based/theme");
const Radio = ({ onChange = () => { }, color = { color: 'primary' }, value = false, overrideValue, style, }) => {
    let [enabled, update] = react_1.useReducer((x) => !x, value);
    if (overrideValue !== undefined) {
        enabled = overrideValue;
    }
    return (react_1.default.createElement("div", { style: {
            display: 'flex',
            cursor: 'pointer',
            borderRadius: '50%',
            width: 24,
            height: 24,
            padding: 5,
            border: '1px solid ' + theme_1.useColor(color),
            boxShadow: `0 0 1px 0 ${theme_1.useColor(color)} inset, 0 0 1px 0 ` + theme_1.useColor(color),
            backgroundColor: theme_1.useColor({ color: color.color, opacity: 0.1 }),
            ...style,
        }, onClick: react_1.useCallback(() => {
            if (overrideValue !== undefined) {
                onChange(!overrideValue);
            }
            else {
                onChange(update());
            }
        }, [onChange]) },
        react_1.default.createElement("div", { style: {
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                opacity: enabled ? 1 : 0,
                backgroundColor: theme_1.useColor(color),
                transition: 'opacity 0.2s',
            } })));
};
exports.Radio = Radio;
//# sourceMappingURL=Radio.js.map