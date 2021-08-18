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
exports.DateInput = void 0;
const react_1 = __importStar(require("react"));
const theme_1 = require("@based/theme");
const useHover_1 = __importDefault(require("../../hooks/events/useHover"));
const icons_1 = require("@based/icons");
const Clear_1 = __importDefault(require("./Clear"));
const useKeyboard_1 = require("../../hooks/events/useKeyboard");
const dateTimeFunctions_1 = require("./dateTimeFunctions");
const DatePickerOverlay_1 = require("./DatePickerOverlay");
const useOverlay_1 = __importDefault(require("../../hooks/overlay/useOverlay"));
// TODO: handle tab when popup is open
const DateInput = ({ border = false, style, value, identifier, color = { color: 'background', tone: 1 }, onChange, noBackground, noHover, weight, }) => {
    const [hover, isHover] = noHover ? [{}, false] : useHover_1.default();
    const [isFocus, setFocus] = react_1.useState(false);
    const inputRef = react_1.useRef();
    const dateString = react_1.useRef(dateTimeFunctions_1.timestampToDateString(dateTimeFunctions_1.dateValueToTimestamp(value)));
    const setDateString = (value) => {
        dateString.current = value;
        inputRef.current.value = dateString.current;
    };
    const [datePickerDate, setDatePickerDate] = react_1.useState(value ? new Date(value) : new Date());
    const update = () => {
        onChange(dateTimeFunctions_1.dateValueToTimestamp(dateString.current));
        setDatePickerDate(new Date(dateTimeFunctions_1.dateValueToTimestamp(dateString.current)));
    };
    const initialValue = react_1.useRef();
    const initialIdentifier = react_1.useRef();
    react_1.useEffect(() => {
        if (value !== initialValue.current ||
            identifier !== initialIdentifier.current) {
            setDateString(dateTimeFunctions_1.timestampToDateString(dateTimeFunctions_1.dateValueToTimestamp(value)));
            initialValue.current = value;
            initialIdentifier.current = identifier;
        }
    }, [value, identifier]);
    const clear = react_1.useCallback(() => {
        setDateString('');
        onChange(null);
    }, [onChange]);
    const blocks = [
        [0, 2],
        [3, 5],
        [6, 11],
    ];
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
                    react_1.default.createElement(icons_1.Date, { color: { color: 'foreground', tone: 4 } })),
                react_1.default.createElement("div", { style: { width: 28 } })),
            react_1.default.createElement("input", { ref: inputRef, placeholder: "dd/mm/yyyy", style: {
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
                }, onFocus: useOverlay_1.default(DatePickerOverlay_1.DatePickerOverlay, {
                    date: datePickerDate,
                    align: 'flex-end',
                    width: 260,
                    onChange: (newDate) => {
                        setDateString(dateTimeFunctions_1.timestampToDateString(newDate.getTime()));
                        update();
                    },
                }, () => {
                    setFocus(true);
                    return () => {
                        setFocus(false);
                    };
                }), onBlur: (e) => {
                    const { value } = e.target;
                    setFocus(false);
                    const parsedDateString = dateTimeFunctions_1.parseDateString(value);
                    if (parsedDateString.valid) {
                        setDateString(dateTimeFunctions_1.timestampToDateString(parsedDateString.timestamp));
                    }
                }, onChange: react_1.useCallback((e) => {
                    const { value } = e.target;
                    const parsedDateString = dateTimeFunctions_1.parseDateString(value);
                    setDateString(parsedDateString.formatedString);
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
                        'ArrowDown',
                    ].find((k) => useKeyboard_1.matchKeyCode(k, e));
                    if (key) {
                        e.preventDefault();
                        e.stopPropagation();
                        const blockIndex = dateTimeFunctions_1.getSelectionBlockIndex(el, blocks);
                        if (key === 'ArrowLeft' && blockIndex > 0) {
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
                                if ((blockIndex === 0 && newValue > 31) ||
                                    (blockIndex === 1 && newValue > 12)) {
                                    newValue = 1;
                                }
                            }
                            else {
                                newValue = parseInt(value) - 1;
                                if (newValue < 1) {
                                    newValue = blockIndex === 0 ? 31 : blockIndex === 1 ? 12 : 1;
                                }
                            }
                            const post = el.value.substring(blocks[blockIndex][1]);
                            setDateString(pre +
                                ('0' + newValue).slice(blockIndex === 2 ? -4 : -2) +
                                post);
                            update();
                        }
                        el.setSelectionRange(blocks[blockIndex][0], blocks[blockIndex][1]);
                    }
                } }),
            react_1.default.createElement(Clear_1.default, { style: {
                    // @ts-ignore
                    opacity: isHover && dateString ? 1 : 0,
                }, onClick: clear }))));
};
exports.DateInput = DateInput;
//# sourceMappingURL=Date.js.map