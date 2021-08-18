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
const react_1 = __importStar(require("react"));
const theme_1 = require("@based/theme");
const Text_1 = require("../../Text");
const useHover_1 = __importDefault(require("../../../hooks/events/useHover"));
const icons_1 = require("@based/icons");
const SortableField = ({ sort, width, sortable, onChange, path, label, type, correction, }) => {
    const [hover, isHover] = useHover_1.default();
    // from the top
    if (sortable === true) {
        sortable = 'asc';
    }
    return (react_1.default.createElement("div", { ...hover, style: {
            width: width,
            display: 'flex',
            cursor: 'pointer',
            position: 'relative',
        }, onClick: react_1.useCallback(() => {
            const n = sort ? (sort === 'asc' ? 'desc' : 'asc') : sortable;
            // setSort(n)
            onChange(n, path);
        }, [sort, path]) },
        react_1.default.createElement("div", { style: {
                position: 'absolute',
                left: -27.5 - correction,
                opacity: sort || isHover ? 1 : 0,
                transition: 'opacity 0.2s',
            } },
            react_1.default.createElement(icons_1.Down, { size: 18, color: { color: 'foreground' }, style: {
                    marginTop: 3,
                    transition: 'transform 0.15s',
                    transform: sort === 'asc' || (!sort && sortable === 'asc')
                        ? 'rotate(180deg)'
                        : 'rotate(0deg)',
                } })),
        react_1.default.createElement(Text_1.Text, { noSelect: true, weight: "regular", color: {
                color: 'foreground',
                tone: isHover ? 1 : 2,
            }, singleLine: true, style: {
                marginLeft: -correction,
                textTransform: !label ? 'capitalize' : null,
            } }, label || (type !== 'img' && type !== 'icon' ? path[0] : ''))));
};
const Field = ({ path, width, type, label, sortable, sort, onChange, correction, }) => {
    const children = label === false ||
        (label === undefined && (type === 'img' || type === 'icon')) ? (react_1.default.createElement("div", { style: { minWidth: width } })) : sortable ? (react_1.default.createElement(SortableField, { path: path, label: label, type: type, correction: correction, sort: sort, width: width, onChange: onChange, sortable: true })) : (react_1.default.createElement("div", { style: {
            display: 'flex',
            width: width,
        } },
        react_1.default.createElement(Text_1.Text, { noSelect: true, weight: "regular", color: {
                color: 'foreground',
                tone: 2,
            }, singleLine: true, style: {
                marginLeft: -correction,
                textTransform: !label ? 'capitalize' : null,
            } }, label || (type !== 'img' && type !== 'icon' ? path[0] : ''))));
    return children;
};
const Fields = ({ onChange, width, context }) => {
    const options = context.onOptions;
    return (react_1.default.createElement("div", { style: {
            width,
            display: 'flex',
            paddingTop: 12,
            paddingBottom: 12,
            alignItems: 'center',
            borderBottom: '1px solid ' + theme_1.useColor({ color: 'divider' }),
        } },
        context.itemProps.fields.map((field, index) => {
            let correction = 0;
            if (index === 1 &&
                (context.itemProps.fields[0].type === 'img' ||
                    context.itemProps.fields[0].type === 'icon')) {
                correction = context.itemProps.fields[0].width;
            }
            return (react_1.default.createElement(Field, { ...field, correction: correction, key: index, onChange: onChange }));
        }),
        options ? react_1.default.createElement("div", { style: { minWidth: 35 } }) : null));
};
exports.default = Fields;
//# sourceMappingURL=Fields.js.map