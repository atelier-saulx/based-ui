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
exports.Dropdown = exports.dropdownOptionIsEqual = void 0;
const react_1 = __importStar(require("react"));
const useOverlayPosition_1 = __importDefault(require("../../hooks/overlay/useOverlayPosition"));
const useOverlayProps_1 = __importDefault(require("../../hooks/overlay/useOverlayProps"));
const theme_1 = require("@based/theme");
const icons_1 = require("@based/icons");
const Text_1 = require("../Text");
const useHover_1 = __importDefault(require("../../hooks/events/useHover"));
const Shared_1 = __importDefault(require("./Shared"));
const text_1 = require("@based/text");
const utils_1 = require("@saulx/utils");
const Text_2 = require("../Input/Text");
const Option = (props) => {
    let { option, isActive, onChange, index } = props;
    const [hover, isHover] = useHover_1.default();
    const Icon = icons_1.iconFromString(option.icon);
    let isSelectNone;
    if (option.value === undefined) {
        isActive = false;
        isSelectNone = true;
    }
    let label = isSelectNone ? { en: 'Select none' } : option.value;
    const children = option.children;
    let body;
    if (children) {
        if (text_1.isTextValue(children)) {
            label = children;
        }
        else {
            body = react_1.default.createElement(children, props);
        }
    }
    if (!body) {
        body = isActive ? (react_1.default.createElement("div", { style: {
                marginRight: 16,
                position: 'relative',
            } },
            react_1.default.createElement(Text_1.Text, { singleLine: true, noSelect: true, weight: "semibold", style: {
                    position: 'absolute',
                } }, label),
            react_1.default.createElement(Text_1.Text, { singleLine: true, noSelect: true, style: {
                    opacity: 0,
                } }, label))) : (react_1.default.createElement(Text_1.Text, { style: { marginRight: 16 }, singleLine: true, noSelect: true }, label));
    }
    return (react_1.default.createElement("div", { ...hover, style: {
            opacity: isSelectNone ? 0.5 : 1,
            width: '100%',
            paddingTop: option.action ? 0 : 5,
            paddingBottom: option.action ? 0 : 5,
            paddingLeft: option.action ? 0 : Icon ? 8 : 16,
            paddingRight: option.action ? 0 : 8,
            display: 'flex',
            cursor: 'pointer',
            backgroundColor: !option.action && isHover ? theme_1.useColor({ color: 'divider' }) : null,
        }, onClick: () => {
            if (!option.action) {
                onChange(option, index);
            }
        } },
        Icon ? react_1.default.createElement(Icon, { style: { marginRight: 8 }, framed: option.framed }) : null,
        react_1.default.createElement("div", { style: {
                width: '100%',
                display: 'flex',
                alignContent: 'center',
                justifyContent: 'space-between',
            } },
            body,
            !option.action ? (react_1.default.createElement(icons_1.Checked, { style: { opacity: isActive ? 1 : 0, marginLeft: 16 }, color: {
                    color: isActive ? 'primary' : 'foreground',
                    opacity: isActive ? 1 : 0,
                } })) : null)));
};
const dropdownOptionIsEqual = (a, b) => {
    return (a.value === b.value ||
        (typeof b.value === 'object' && utils_1.deepEqual(b.value, a.value)));
};
exports.dropdownOptionIsEqual = dropdownOptionIsEqual;
const filterFunction = (v, filterValue) => {
    if (text_1.getStringValue(v.value).toLowerCase().indexOf(filterValue) !== -1) {
        return true;
    }
    if (text_1.isTextValue(v.children) &&
        text_1.getStringValue(v.children).toLowerCase().indexOf(filterValue) !== -1) {
        return true;
    }
    return false;
};
const Dropdown = (initialProps) => {
    const props = useOverlayProps_1.default(initialProps);
    const { align, value, onChange, items, filter } = props;
    const [filterValue, setFilter] = react_1.useState();
    const [elementRef, position] = useOverlayPosition_1.default(props);
    const minWidth = position && position.elementRect && position.elementRect.width;
    return (react_1.default.createElement(Shared_1.default, { width: typeof props.width !== 'function' ? props.width : null, position: position, align: align, ref: elementRef, style: {
            minWidth: filterValue ? minWidth : null,
        } },
        filter ? (react_1.default.createElement("div", { style: {
                marginTop: -12,
                paddingTop: 2,
                background: theme_1.useColor({
                    color: 'background',
                    tone: 2,
                }),
                marginBottom: 8,
                paddingBottom: 2,
                borderBottom: '1px solid ' + theme_1.useColor({ color: 'divider' }),
            } },
            react_1.default.createElement(Text_2.Input, { iconColor: { color: 'foreground' }, type: "search", noBackground: true, onChange: (v) => {
                    setFilter(v ? String(v) : '');
                }, noBorder: true, noBordeRadius: true, placeholder: "Filter" }))) : null,
        (filterValue
            ? items.filter((v) => filterFunction(v, filterValue))
            : items).map((option, index) => {
            return (react_1.default.createElement(Option, { key: index, option: option, index: index, isActive: !option.action
                    ? Array.isArray(value)
                        ? value.findIndex((o) => exports.dropdownOptionIsEqual(option, o)) !==
                            -1
                        : value && exports.dropdownOptionIsEqual(option, value)
                    : false, onChange: onChange }));
        })));
};
exports.Dropdown = Dropdown;
//# sourceMappingURL=Dropdown.js.map