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
exports.RadioButton = exports.CheckBox = void 0;
const react_1 = __importStar(require("react"));
const CheckBox_1 = require("../Button/CheckBox");
const Radio_1 = require("../Button/Radio");
const Text_1 = require("../Text");
const icons_1 = require("@based/icons");
const useInputValue_1 = __importDefault(require("../../hooks/useInputValue"));
const theme_1 = require("@based/theme");
const CheckBox = ({ style, children, onChange, identifier, border, icon, value = false, ...rest }) => {
    const [stateValue, setValue] = useInputValue_1.default(value, identifier, false);
    const Icon = icon ? icons_1.iconFromString(icon) : null;
    return (react_1.default.createElement("div", { style: {
            border: border ? '1px solid ' + theme_1.useColor({ color: 'divider' }) : null,
            borderRadius: 4,
            paddingLeft: 12,
            paddingRight: 12,
            paddingTop: 7.5,
            paddingBottom: 7.5,
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            justifyContent: 'space-between',
            ...style,
        }, onClick: react_1.useCallback(() => {
            const v = !stateValue;
            if (onChange) {
                onChange(v);
            }
            setValue(v);
        }, [onChange, stateValue]) },
        react_1.default.createElement("div", { style: {
                display: 'flex',
                alignItems: 'center',
            } },
            react_1.default.createElement(CheckBox_1.Check, { ...rest, overrideValue: stateValue }),
            react_1.default.createElement(Text_1.Text, { noSelect: true, style: {
                    marginLeft: 15,
                } }, children)),
        Icon ? react_1.default.createElement(Icon, null) : null));
};
exports.CheckBox = CheckBox;
const RadioButton = ({ style, children, onChange, icon, border, identifier, value = false, ...rest }) => {
    const [stateValue, setValue] = useInputValue_1.default(value, identifier, false);
    const Icon = icon ? icons_1.iconFromString(icon) : null;
    return (react_1.default.createElement("div", { style: {
            display: 'flex',
            border: border ? '1px solid ' + theme_1.useColor({ color: 'divider' }) : null,
            alignItems: 'center',
            cursor: 'pointer',
            paddingLeft: 12,
            paddingRight: 12,
            paddingTop: 7.5,
            paddingBottom: 7.5,
            justifyContent: 'space-between',
            ...style,
        }, onClick: react_1.useCallback(() => {
            const v = !stateValue;
            if (onChange) {
                onChange(v);
            }
            setValue(v);
        }, [onChange, stateValue]) },
        react_1.default.createElement("div", { style: {
                display: 'flex',
                alignItems: 'center',
            } },
            react_1.default.createElement(Radio_1.Radio, { overrideValue: stateValue, ...rest }),
            react_1.default.createElement(Text_1.Text, { noSelect: true, style: {
                    marginLeft: 15,
                } }, children)),
        Icon ? react_1.default.createElement(Icon, null) : null));
};
exports.RadioButton = RadioButton;
//# sourceMappingURL=Toggle.js.map