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
exports.Check = void 0;
const react_1 = __importStar(require("react"));
const theme_1 = require("@based/theme");
const icons_1 = require("@based/icons");
const Check = ({ onChange = () => { }, color = { color: 'primary' }, value = false, disabledColor = { color: 'divider' }, overrideValue, style, }) => {
    let [enabled, update] = react_1.useReducer((x) => !x, value);
    if (overrideValue !== undefined) {
        enabled = overrideValue;
    }
    const parsedColor = theme_1.useColor(!enabled ? disabledColor || color : color);
    return (react_1.default.createElement("div", { style: {
            display: 'flex',
            cursor: 'pointer',
            width: 20,
            height: 20,
            transition: 'background-color 0.2s',
            borderRadius: 4,
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid ' + parsedColor,
            boxShadow: `0 0 1px 0 ${parsedColor} inset, 0 0 1px 0 ` + parsedColor,
            backgroundColor: theme_1.useColor({
                color: (!enabled ? disabledColor || color : color).color,
                opacity: enabled ? 1 : 0.1,
            }),
            ...style,
        }, onClick: react_1.useCallback(() => {
            if (overrideValue !== undefined) {
                onChange(!overrideValue);
            }
            else {
                onChange(update());
            }
        }, [onChange]) },
        react_1.default.createElement(icons_1.Checked, { size: 18, style: {
                opacity: enabled ? 1 : 0,
            }, color: { color: 'background' } })));
};
exports.Check = Check;
//# sourceMappingURL=CheckBox.js.map