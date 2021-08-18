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
exports.Input = void 0;
const react_1 = __importStar(require("react"));
const theme_1 = require("@based/theme");
const Clear_1 = __importDefault(require("./Clear"));
const icons_1 = require("@based/icons");
const validators_1 = require("./validators");
const SubText_1 = require("../Text/SubText");
const useDropdown_1 = __importDefault(require("../../hooks/overlay/useDropdown"));
const useHover_1 = __importDefault(require("../../hooks/events/useHover"));
const ProgressIndicator_1 = require("../ProgressIndicator/ProgressIndicator");
const text_1 = require("@based/text");
const useInputValue_1 = __importDefault(require("../../hooks/useInputValue"));
require("./style.css");
const Input = ({ inputRef, placeholder = '', value = '', onChange, onKeyUp, noBackground, onFocus, iconColor = { color: 'foreground', tone: 3 }, name, noHover, onBlur, weight, autoFocus, noBorder, noBordeRadius, border, icon, color = { color: 'background', tone: 1 }, style, noClear, type = 'text', onValid, validator, dropdown, errorText, helperText, identifier, progress, autoComplete, }) => {
    const [hover, isHover] = noHover ? [{}, false] : useHover_1.default();
    const [isFocus, setFocus] = react_1.useState(false);
    const [isWrong, setWrong] = react_1.useState(false);
    const [stateValue, setValue] = useInputValue_1.default(value, identifier, isFocus);
    const update = react_1.useCallback((e) => {
        let newvalue = e.target ? e.target.value : e;
        if (newvalue && type === 'number') {
            newvalue = Number(newvalue);
        }
        setValue(newvalue);
        if (validator) {
            if (validator(newvalue) || !newvalue) {
                setWrong(false);
                if (onValid)
                    onValid(true);
                onChange(newvalue);
            }
            else {
                setWrong(true);
                if (onValid)
                    onValid(false);
            }
        }
        else {
            onChange(newvalue);
        }
    }, [setValue, onChange, validator]);
    const clear = react_1.useCallback(() => {
        setValue('');
        onChange(null);
    }, [setValue, onChange]);
    const blur = react_1.useCallback((event) => {
        setFocus(false);
        onBlur && onBlur(event);
    }, [setFocus]);
    const focus = react_1.useCallback((event) => {
        setFocus(true);
        onFocus && onFocus(event);
    }, [setFocus]);
    let Icon;
    if (Icon === undefined) {
        if (icon) {
            Icon = icons_1.iconFromString(icon);
        }
        else if (type === 'search') {
            Icon = icons_1.Search;
        }
        else if (type === 'date') {
            Icon = icons_1.Date;
        }
        else if (type === 'time') {
            Icon = icons_1.Time;
        }
        else if (type === 'email') {
            Icon = icons_1.Email;
        }
    }
    if (type === 'email') {
        if (!validator) {
            validator = validators_1.emailValidator;
        }
        if (!errorText) {
            errorText = { en: 'Please enter a valid email adress' };
        }
    }
    return (react_1.default.createElement("div", { ...hover, style: {
            position: 'relative',
            paddingLeft: !noBorder && isFocus ? 11 : 12,
            paddingRight: !noBorder && isFocus ? 11 : 12,
            display: 'flex',
            alignItems: 'center',
            borderRadius: noBordeRadius ? null : '8px',
            flexGrow: 1,
            background: noBackground
                ? 'transparent'
                : theme_1.useColor({
                    color: color.color,
                    tone: isFocus ? 1 : isHover ? color.tone + 1 : 1,
                }),
            border: noBorder
                ? null
                : isFocus
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
            ...style,
        } },
        progress !== null && progress !== undefined ? (react_1.default.createElement("div", { style: { marginRight: 9 } },
            react_1.default.createElement(ProgressIndicator_1.ProgressIndicator, { value: progress }))) : Icon ? (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("div", { style: {
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                } },
                react_1.default.createElement(Icon, { color: iconColor })),
            react_1.default.createElement("div", { style: { width: 28 } }))) : null,
        react_1.default.createElement("input", { ref: inputRef, type: type, value: stateValue, onChange: update, onKeyUp: onKeyUp, onFocus: focus, onBlur: blur, name: name, autoFocus: autoFocus, autoComplete: autoComplete, placeholder: String(text_1.getTextValue(placeholder)), style: {
                width: '100%',
                paddingLeft: Icon ? 6.5 : 0,
                paddingTop: isFocus && !noBorder ? 6.5 : 7.5,
                paddingBottom: isFocus && !noBorder ? 6.5 : 7.5,
                appearance: 'none',
                fontSize: '15px',
                lineHeight: '24px',
                letterSpacing: '-0.015em',
                background: 'none',
                fontFamily: 'Font',
                color: theme_1.useColor({ color: 'foreground' }),
                fontWeight: weight === 'semibold' ? 600 : weight === 'medium' ? 500 : 'normal',
            } }),
        dropdown ? (react_1.default.createElement(icons_1.Down, { onClick: useDropdown_1.default(dropdown, (value) => {
                if (!Array.isArray(value)) {
                    update(value.value === undefined ? '' : value.value);
                }
            }, { value: stateValue }, {
                align: 'flex-end',
                x: ({ left }) => left - 15,
                y: ({ top }) => top + 15,
                selectTarget: (target) => {
                    return target.parentNode.parentNode;
                },
            }) })) : !noClear ? (react_1.default.createElement(Clear_1.default, { color: isWrong
                ? { color: 'error' }
                : isFocus
                    ? { color: 'primary' }
                    : { color: 'foreground', tone: 1 }, style: {
                // @ts-ignore
                opacity: isHover && (stateValue || stateValue === 0) ? 1 : 0,
            }, onClick: clear })) : null,
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
exports.Input = Input;
//# sourceMappingURL=Text.js.map