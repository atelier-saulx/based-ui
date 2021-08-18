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
exports.ColorInput = void 0;
const react_1 = __importStar(require("react"));
const theme_1 = require("@based/theme");
const useHover_1 = __importDefault(require("../../hooks/events/useHover"));
const hex_rgb_1 = __importDefault(require("hex-rgb"));
const rgb_hex_1 = __importDefault(require("rgb-hex"));
const text_1 = require("@based/text");
const useInputValue_1 = __importDefault(require("../../hooks/useInputValue"));
require("./style.css");
const isHex = (value) => value && /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value);
const isRgb = (value) => {
    return value && /^rgb\((\d+),(\d+),(\d+)\)$/.test(value);
};
const toRgb = (value) => {
    if (value && isHex(value)) {
        const x = hex_rgb_1.default(value);
        if (x) {
            return `rgb(${x.red},${x.green},${x.blue})`;
        }
    }
    return value;
};
const Text = ({ onChange, value, placeholder, focus, blur }) => {
    return (react_1.default.createElement("input", { type: "text", value: value, onChange: onChange, onFocus: focus, onBlur: blur, placeholder: String(text_1.getTextValue(placeholder)), style: {
            width: '100%',
            textAlign: 'left',
            appearance: 'none',
            fontSize: '15px',
            lineHeight: '24px',
            letterSpacing: '-0.015em',
            background: 'none',
            fontFamily: 'Font',
            color: theme_1.useColor({ color: 'foreground' }),
            fontWeight: 'normal',
        } }));
};
const ColorInput = ({ value = '', onChange, autoFocus, identifier, border, style, placeholder, color = { color: 'background', tone: 1 }, }) => {
    const [isFocus, setFocus] = react_1.useState(false);
    const [hover, isHover] = useHover_1.default();
    const [stateValue, setValue] = useInputValue_1.default(value, identifier, isFocus);
    const update = react_1.useCallback((e) => {
        const newvalue = toRgb(e.target.value);
        setValue(newvalue);
        onChange(newvalue);
    }, [setValue, onChange]);
    const blur = react_1.useCallback(() => {
        setFocus(false);
    }, [setFocus]);
    const focus = react_1.useCallback(() => {
        setFocus(true);
    }, [setFocus]);
    return (react_1.default.createElement("div", { ...hover, style: {
            cursor: 'pointer',
            position: 'relative',
            paddingLeft: isFocus ? 11 : 12,
            paddingRight: isFocus ? 11 : 12,
            paddingTop: isFocus ? 6.5 : 7.5,
            paddingBottom: isFocus ? 6.5 : 7.5,
            justifyContent: 'space-between',
            display: 'flex',
            borderRadius: 4,
            background: theme_1.useColor({
                color: color.color,
                tone: isFocus || isHover ? color.tone + 1 : 1,
            }),
            border: isFocus
                ? '2px solid ' + theme_1.useColor({ color: 'primary' })
                : '1px solid ' +
                    theme_1.useColor({
                        color: 'divider',
                        opacity: border ? 1 : 0,
                    }),
            ...style,
        } },
        react_1.default.createElement("div", { style: {
                width: 28,
                height: 28,
                borderRadius: 4,
                position: 'relative',
                border: '1px solid ' +
                    theme_1.useColor({
                        color: 'divider',
                    }),
                background: stateValue,
            } },
            react_1.default.createElement("input", { type: "color", value: isHex(stateValue)
                    ? stateValue
                    : isRgb(stateValue)
                        ? '#' + rgb_hex_1.default(stateValue)
                        : '#ffffff', onChange: update, onFocus: focus, onBlur: blur, autoFocus: autoFocus, style: {
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    right: 0,
                    height: 24,
                    width: 24,
                    bottom: 0,
                    border: '1px solid red',
                    appearance: 'none',
                    background: 'none',
                } })),
        react_1.default.createElement("div", { style: {
                marginLeft: 15,
                display: 'flex',
                width: '100%',
                justifyContent: 'space-between',
            } },
            react_1.default.createElement("div", { style: {
                    minWidth: '80%',
                    display: 'flex',
                } },
                react_1.default.createElement(Text, { placeholder: placeholder, value: toRgb(stateValue), onChange: update, blur: blur, focus: focus })))));
};
exports.ColorInput = ColorInput;
//# sourceMappingURL=Color.js.map