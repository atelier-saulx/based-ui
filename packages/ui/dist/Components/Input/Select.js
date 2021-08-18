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
exports.Select = void 0;
const react_1 = __importStar(require("react"));
const theme_1 = require("@based/theme");
const icons_1 = require("@based/icons");
require("./style.css");
const text_1 = require("@based/text");
const useHover_1 = __importDefault(require("../../hooks/events/useHover"));
const Text_1 = require("../Text");
const useDropdown_1 = __importDefault(require("../../hooks/overlay/useDropdown"));
const useInputValue_1 = __importDefault(require("../../hooks/useInputValue"));
const renderChildren_1 = __importDefault(require("../../util/renderChildren"));
const Select = ({ placeholder = '', onChange, items = [], Label, icon, filter, color = { color: 'background', tone: 1 }, multi, weight = 'regular', border, identifier, value = multi ? [] : undefined, style, }) => {
    if (typeof value === 'string') {
        value = { value };
    }
    const [isFocus, setFocus] = react_1.useState(false);
    const [stateValue, setValue] = useInputValue_1.default(value, identifier, isFocus);
    const [hover, isHover] = useHover_1.default();
    const Icon = icon
        ? icons_1.iconFromString(icon)
        : value && !Array.isArray(value) && value.icon
            ? icons_1.iconFromString(value.icon)
            : '';
    const update = react_1.useCallback((value, index) => {
        setValue(value);
        onChange(value, index);
    }, [setValue, onChange]);
    const displayValue = Label
        ? null
        : Array.isArray(stateValue)
            ? stateValue.filter((v) => v.value !== undefined).length === 0
                ? placeholder
                : stateValue
                    .map((v) => 
                // @ts-ignore
                text_1.getTextValue(v.children ? renderChildren_1.default(v.children) : v.value))
                    .join(', ')
            : !stateValue || stateValue.value === undefined
                ? placeholder
                : text_1.getTextValue(
                // @ts-ignore
                stateValue.children
                    ? renderChildren_1.default(stateValue.children)
                    : stateValue.value);
    return (react_1.default.createElement("div", { ...hover, onClick: useDropdown_1.default(items, (value, index) => {
            if (multi) {
                if (index !== undefined) {
                    update(value, index);
                }
            }
            else {
                if (index !== undefined) {
                    update(value, index);
                }
            }
        }, stateValue, {
            multi,
            filter,
            align: 'flex-end',
            x: ({ left }) => left - 15,
            y: ({ top }) => top + 15,
        }, () => {
            setFocus(true);
            return () => {
                setFocus(false);
            };
        }), style: {
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
                display: 'flex',
            } },
            Icon ? (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement("div", { style: {
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    } },
                    react_1.default.createElement(Icon, null)),
                react_1.default.createElement("div", { style: { width: 24, marginRight: 12 } }))) : null,
            Label ? (react_1.default.createElement(Label, { value: stateValue, placeholder: placeholder })) : (react_1.default.createElement(Text_1.Text, { weight: weight, singleLine: true, style: {
                    userSelect: 'none',
                    opacity: displayValue === placeholder ? 0.6 : 1,
                } }, displayValue))),
        react_1.default.createElement(icons_1.Down, null)));
};
exports.Select = Select;
//# sourceMappingURL=Select.js.map