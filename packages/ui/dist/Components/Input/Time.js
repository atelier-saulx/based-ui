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
exports.TimeInput = void 0;
const react_1 = __importStar(require("react"));
const theme_1 = require("@based/theme");
const useHover_1 = __importDefault(require("../../hooks/events/useHover"));
const icons_1 = require("@based/icons");
const Clear_1 = __importDefault(require("./Clear"));
const useKeyboard_1 = require("../../hooks/events/useKeyboard");
const dateTimeFunctions_1 = require("./dateTimeFunctions");
/**
 * Time inpuut field
 * WARNING: Accepts and returns miliseconds.
 * If milliseconds are used as timestamp to a Date object it will add local timezone offset
 * when getting or viewing value.
 * UTC functions must be used when setting or getting hours/minustes/seconds:
 * setUTCHours(), getUTC*(), toUTCString()
 */
const TimeInput = ({ border, value, style, identifier, onChange, useSeconds = false, noBackground, color = { color: 'background', tone: 1 }, noHover, weight, }) => {
    const [hover, isHover] = noHover ? [{}, false] : useHover_1.default();
    const [isFocus, setFocus] = react_1.useState(false);
    const inputRef = react_1.useRef();
    const timeString = react_1.useRef(dateTimeFunctions_1.milisecondsToTimeString(dateTimeFunctions_1.timeValueToMiliseconds(value), useSeconds) || '');
    const setTimeString = (value) => {
        timeString.current = value;
        inputRef.current.value = timeString.current;
    };
    const update = () => {
        onChange(dateTimeFunctions_1.timeValueToMiliseconds(timeString.current));
    };
    const initialValue = react_1.useRef();
    const initialIdentifier = react_1.useRef();
    react_1.useEffect(() => {
        if (value !== initialValue.current ||
            identifier !== initialIdentifier.current) {
            setTimeString(dateTimeFunctions_1.milisecondsToTimeString(dateTimeFunctions_1.timeValueToMiliseconds(value), useSeconds));
            initialValue.current = value;
            initialIdentifier.current = identifier;
        }
    }, [value, identifier]);
    const clear = react_1.useCallback(() => {
        setTimeString('');
        onChange(null);
    }, [onChange]);
    const blocks = [
        [0, 2],
        [3, 5],
    ];
    if (useSeconds)
        blocks.push([6, 9]);
    return (react_1.default.createElement("div", { style: {
            width: 200,
        } },
        react_1.default.createElement("div", { ...hover, style: {
                position: 'relative',
                paddingLeft: border && isFocus ? 11 : 12,
                paddingRight: border && isFocus ? 11 : 12,
                display: 'flex',
                alignItems: 'center',
                borderRadius: '4px',
                flexGrow: 1,
                background: noBackground
                    ? 'transparent'
                    : theme_1.useColor({
                        color: color.color,
                        tone: isFocus || isHover ? color.tone + 1 : 1,
                    }),
                border: border
                    ? isFocus
                        ? '2px solid ' + theme_1.useColor({ color: 'primary' })
                        : '1px solid ' +
                            theme_1.useColor({
                                color: 'divider',
                                opacity: border ? 1 : 0,
                            })
                    : null,
                ...style,
            } },
            react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement("div", { style: {
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    } },
                    react_1.default.createElement(icons_1.Time, { color: { color: 'foreground', tone: 4 } })),
                react_1.default.createElement("div", { style: { width: 28 } })),
            react_1.default.createElement("input", { ref: inputRef, placeholder: useSeconds ? 'hh:mm:ss' : 'hh:mm', style: {
                    width: '100%',
                    paddingLeft: 6.5,
                    paddingTop: isFocus && border ? 6.5 : 7.5,
                    paddingBottom: isFocus && border ? 6.5 : 7.5,
                    appearance: 'none',
                    fontSize: '15px',
                    lineHeight: '24px',
                    letterSpacing: '-0.015em',
                    background: 'none',
                    fontFamily: 'Font',
                    color: theme_1.useColor({ color: 'foreground' }),
                    userSelect: 'all',
                    fontWeight: weight === 'semibold'
                        ? 600
                        : weight === 'medium'
                            ? 500
                            : 'normal',
                }, onFocus: () => setFocus(true), onBlur: (e) => {
                    const { value } = e.target;
                    const parsedTimeString = dateTimeFunctions_1.parseTimeString(value, useSeconds);
                    if (parsedTimeString.milliseconds) {
                        setTimeString(parsedTimeString.formatedString);
                        update();
                    }
                    setFocus(false);
                }, onChange: react_1.useCallback((e) => {
                    const { value } = e.target;
                    const parsedTimeString = dateTimeFunctions_1.parseTimeString(value, useSeconds);
                    setTimeString(parsedTimeString.formatedString);
                }, []), onClick: (e) => {
                    const el = e.target;
                    const blockIndex = dateTimeFunctions_1.getSelectionBlockIndex(el, blocks);
                    el.setSelectionRange(blocks[blockIndex][0], blocks[blockIndex][1]);
                }, onKeyDown: (e) => {
                    const el = e.target;
                    const key = [
                        'ArrowLeft',
                        'ArrowRight',
                        'ArrowUp',
                        'Enter',
                        'ArrowDown',
                    ].find((k) => useKeyboard_1.matchKeyCode(k, e));
                    if (key) {
                        e.preventDefault();
                        e.stopPropagation();
                        const blockIndex = dateTimeFunctions_1.getSelectionBlockIndex(el, blocks);
                        if (key === 'Enter') {
                            onChange(dateTimeFunctions_1.timeValueToMiliseconds(timeString.current));
                        }
                        else if (key === 'ArrowLeft' && blockIndex > 0) {
                            el.setSelectionRange(blocks[blockIndex - 1][0], blocks[blockIndex - 1][1]);
                            return;
                        }
                        else if (key === 'ArrowRight' &&
                            blockIndex < blocks.length - 1) {
                            el.setSelectionRange(blocks[blockIndex + 1][0], blocks[blockIndex + 1][1]);
                            return;
                        }
                        else if (key === 'ArrowUp' || key === 'ArrowDown') {
                            const pre = el.value.substring(0, blocks[blockIndex][0]);
                            const value = el.value.substring(blocks[blockIndex][0], blocks[blockIndex][1]);
                            let newValue;
                            if (key === 'ArrowUp') {
                                newValue = parseInt(value) + 1;
                                if ((blockIndex === 0 && newValue > 23) || newValue > 59) {
                                    newValue = 0;
                                }
                            }
                            else {
                                newValue = parseInt(value) - 1;
                                if (newValue < 0) {
                                    newValue = blockIndex === 0 ? 23 : 59;
                                }
                            }
                            const post = el.value.substring(blocks[blockIndex][1]);
                            setTimeString(pre + ('0' + newValue).slice(-2) + post);
                            update();
                        }
                        el.setSelectionRange(blocks[blockIndex][0], blocks[blockIndex][1]);
                    }
                } }),
            react_1.default.createElement(Clear_1.default, { style: {
                    // @ts-ignore
                    opacity: isHover && timeString ? 1 : 0,
                }, onClick: clear }))));
};
exports.TimeInput = TimeInput;
//# sourceMappingURL=Time.js.map