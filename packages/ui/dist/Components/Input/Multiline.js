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
exports.MultilineTextInput = void 0;
const react_1 = __importStar(require("react"));
const theme_1 = require("@based/theme");
require("./style.css");
const useHover_1 = __importDefault(require("../../hooks/events/useHover"));
const SubText_1 = require("../Text/SubText");
const text_1 = require("@based/text");
const useInputValue_1 = __importDefault(require("../../hooks/useInputValue"));
const MultilineTextInput = ({ placeholder = '', value = '', onChange, autoFocus, onBlur, onFocus, style, validator, errorText, helperText, color = { color: 'background', tone: 1 }, border, identifier, }) => {
    const ref = react_1.useRef();
    const [isFocus, setFocus] = react_1.useState(false);
    const [isWrong, setWrong] = react_1.useState(false);
    const [hover, isHover] = useHover_1.default();
    const [stateValue, setValue] = useInputValue_1.default(value, identifier, isFocus);
    react_1.useEffect(() => {
        if (ref.current) {
            // @ts-ignore
            ref.current.style.height = 'auto';
            if (!stateValue) {
                // @ts-ignore
                ref.current.style.height = `42px`;
            }
            else {
                // @ts-ignore
                ref.current.style.height = `${ref.current.scrollHeight + 5}px`;
            }
        }
    }, [stateValue]);
    const update = react_1.useCallback((e) => {
        const newvalue = e.target.value;
        setValue(newvalue);
        if (validator) {
            if (validator(newvalue) || !newvalue) {
                setWrong(false);
                onChange(newvalue);
            }
            else {
                setWrong(true);
            }
        }
        else {
            onChange(newvalue);
        }
    }, [setValue, onChange, validator]);
    const blur = react_1.useCallback(() => {
        setFocus(false);
        if (onBlur) {
            onBlur();
        }
    }, [setFocus]);
    const focus = react_1.useCallback(() => {
        setFocus(true);
        if (onFocus) {
            onFocus();
        }
    }, [setFocus]);
    return (react_1.default.createElement("div", { style: {
            position: 'relative',
            flexGrow: 1,
            // width: '100%',
            ...style,
        } },
        react_1.default.createElement("textarea", { ...hover, onChange: update, onFocus: focus, onBlur: blur, ref: ref, autoFocus: autoFocus, style: {
                borderRadius: 8,
                background: theme_1.useColor({
                    color: color.color,
                    tone: isFocus || isHover ? color.tone + 1 : 1,
                }),
                border: isFocus
                    ? '2px solid ' +
                        (isWrong
                            ? theme_1.useColor({ color: 'error' })
                            : theme_1.useColor({ color: 'primary' }))
                    : '1px solid ' +
                        (isWrong
                            ? theme_1.useColor({ color: 'error' })
                            : theme_1.useColor({
                                color: 'divider',
                                opacity: border ? 1 : 0,
                            })),
                paddingLeft: isFocus ? 11 : 12,
                paddingRight: isFocus ? 11 : 12,
                paddingTop: isFocus ? 6.5 : 7.5,
                paddingBottom: isFocus ? 6.5 : 7.5,
                resize: 'none',
                width: '100%',
                height: 'auto',
                appearance: 'none',
                fontFamily: 'Font',
                color: theme_1.useColor({ color: 'foreground' }),
                fontWeight: 'normal',
                fontSize: '15px',
                lineHeight: '24px',
                letterSpacing: '-0.015em',
            }, placeholder: String(text_1.getTextValue(placeholder)), value: stateValue }),
        isFocus && (errorText || helperText) ? (react_1.default.createElement(SubText_1.SubText, { color: {
                color: isWrong ? 'error' : 'foreground',
                tone: isWrong ? 1 : 3,
            }, style: {
                marginLeft: 4,
                position: 'absolute',
                bottom: -25,
                left: 0,
            } }, isWrong ? errorText : helperText || '')) : null));
};
exports.MultilineTextInput = MultilineTextInput;
//# sourceMappingURL=Multiline.js.map