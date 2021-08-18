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
exports.SwitchTextButton = exports.Switch = void 0;
const react_1 = __importStar(require("react"));
const theme_1 = require("@based/theme");
const useInputValue_1 = __importDefault(require("../../hooks/useInputValue"));
const Text_1 = require("../Text");
const Switch = ({ onChange, color = { color: 'primary' }, ignoreInternal, value, identifier, style, }) => {
    let enabled, setValue;
    if (!ignoreInternal) {
        ;
        [enabled, setValue] = useInputValue_1.default(value, identifier, false);
    }
    else {
        enabled = value;
    }
    return (react_1.default.createElement("div", { style: {
            display: 'flex',
            width: 31 - 3,
            cursor: 'pointer',
            paddingTop: 2,
            paddingBottom: 2,
            paddingLeft: 2.5,
            paddingRight: 2,
            borderRadius: 28,
            backgroundColor: theme_1.useColor({
                color: enabled ? color.color : 'foreground',
                opacity: enabled ? 1 : 0.5,
            }),
            ...style,
        }, onClick: (e) => {
            e.stopPropagation();
            const value = !enabled;
            if (setValue) {
                setValue(value);
            }
            onChange(value);
        } },
        react_1.default.createElement("div", { style: {
                width: 13,
                height: 13,
                borderRadius: '50%',
                backgroundColor: theme_1.useColor({ color: 'background' }),
                transition: 'transform 0.2s',
                transform: `translate3d(${enabled ? 7 + 5 - 3 : 0}px,0px,0px)`,
            } })));
};
exports.Switch = Switch;
const SwitchTextButton = ({ enabledText = 'Enabled', disabledText = 'Disabled', onChange, identifier, value, style, color, }) => {
    const [enabled, setValue] = useInputValue_1.default(value, identifier, false);
    return (react_1.default.createElement("div", { style: {
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            ...style,
        }, onClick: (e) => {
            e.stopPropagation();
            const v = !enabled;
            setValue(v);
            onChange(v);
        } },
        react_1.default.createElement(exports.Switch, { color: color, value: enabled, ignoreInternal: true, onChange: react_1.useCallback((v) => {
                setValue(v);
                onChange(v);
            }, [onChange]) }),
        react_1.default.createElement(Text_1.Text, { weight: "medium", singleLine: true, noSelect: true, style: {
                marginLeft: 8,
            } }, enabled ? enabledText : disabledText)));
};
exports.SwitchTextButton = SwitchTextButton;
//# sourceMappingURL=Switch.js.map