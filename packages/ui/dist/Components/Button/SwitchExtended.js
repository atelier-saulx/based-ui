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
exports.SwitchExtended = void 0;
const react_1 = __importStar(require("react"));
const theme_1 = require("@based/theme");
const useInputValue_1 = __importDefault(require("../../hooks/useInputValue"));
const Text_1 = require("../Text");
const SubText_1 = require("../Text/SubText");
const Switch_1 = require("./Switch");
const SwitchExtended = ({ label, info, onChange, noBorder, identifier, value, color, style, }) => {
    const [enabled, setValue] = useInputValue_1.default(value, identifier, false);
    return (react_1.default.createElement("div", { style: {
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'space-between',
            paddingTop: 16,
            paddingBottom: 8,
            marginTop: noBorder ? 0 : 8,
            borderTop: noBorder
                ? null
                : '1px solid ' + theme_1.useColor({ color: 'divider' }),
            ...style,
        }, onClick: (e) => {
            e.stopPropagation();
            const v = !enabled;
            setValue(v);
            onChange(v);
        } },
        react_1.default.createElement("div", { style: {
                flexGrow: 1,
            } },
            react_1.default.createElement(Text_1.Text, { weight: "semibold", singleLine: true, noSelect: true, style: {
                    marginBottom: 4,
                } }, label),
            react_1.default.createElement(SubText_1.SubText, { noSelect: true }, info)),
        react_1.default.createElement("div", { style: {
                display: 'flex',
                alignItems: 'center',
            } },
            react_1.default.createElement(Switch_1.Switch, { color: color, value: enabled, ignoreInternal: true, onChange: react_1.useCallback((v) => {
                    setValue(v);
                    onChange(v);
                }, [onChange]) }))));
};
exports.SwitchExtended = SwitchExtended;
//# sourceMappingURL=SwitchExtended.js.map