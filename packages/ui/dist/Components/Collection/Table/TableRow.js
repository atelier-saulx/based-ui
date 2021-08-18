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
const useHover_1 = __importDefault(require("../../../hooks/events/useHover"));
const icons_1 = require("@based/icons");
const useSelect_1 = require("../../../hooks/useSelect");
const useMultipleEvents_1 = __importDefault(require("../../../hooks/events/useMultipleEvents"));
const useDrag_1 = __importDefault(require("../../../hooks/drag/useDrag"));
const useContextualMenu_1 = __importDefault(require("../../../hooks/events/useContextualMenu"));
const RowField_1 = __importDefault(require("./RowField"));
const modifyImageElement = (el) => {
    while (el.children[4]) {
        el.removeChild(el.children[4]);
    }
};
const TableRow = (props) => {
    const context = props.data.context;
    const { index, data } = props;
    const itemData = data.items[index];
    const [hover, isHover] = useHover_1.default();
    const ref = react_1.useRef();
    const wrappedData = {
        index,
        data: itemData,
        exportData: context.exportData,
    };
    let drag;
    if (context.draggable) {
        ;
        [drag] = useDrag_1.default(wrappedData, ref, {
            style: {
                maxWidth: 500,
                backgroundColor: theme_1.useColor({ color: 'background' }),
            },
            modifyImageElement,
        });
    }
    const [select, isSelected] = useSelect_1.useSelect(wrappedData);
    let optionsRef;
    if (context.onOptions) {
        optionsRef = react_1.useRef();
    }
    const OptionsIcon = context.optionsIcon
        ? icons_1.iconFromString(context.optionsIcon)
        : icons_1.More;
    return (react_1.default.createElement("div", { ...useMultipleEvents_1.default(hover, select, context.contextualMenu
            ? useContextualMenu_1.default(react_1.useCallback((e) => {
                context.onOptions(e, wrappedData);
            }, [context.onOptions, wrappedData]))
            : undefined, context.onClick
            ? {
                onClick: useSelect_1.useClick((e) => {
                    context.onClick(e, wrappedData);
                }, [context.onClick, wrappedData]),
            }
            : undefined), style: {
            paddingTop: context.isLarge ? 10 : 5,
            cursor: context.onClick ? 'pointer' : 'default',
            height: context.isLarge ? 80 : 60,
            ...props.style,
        } },
        react_1.default.createElement("div", { ref: ref, style: {
                display: 'flex',
                alignItems: 'center',
                height: context.isLarge ? 70 : 55,
                paddingLeft: 8,
                paddingRight: 8,
                borderRadius: 4,
                backgroundColor: isSelected
                    ? theme_1.useColor({ color: 'background', tone: 3 })
                    : isHover
                        ? theme_1.useColor({ color: 'background', tone: 2 })
                        : null,
            }, ...drag },
            context.itemProps.fields.map((field, index) => {
                return (react_1.default.createElement(RowField_1.default, { isHover: isHover, data: data.items[props.index], field: field, isLarge: context.large, key: index }));
            }),
            context.onOptions ? (react_1.default.createElement("div", { ref: optionsRef, style: {
                    minWidth: 35,
                    display: 'flex',
                    justifyContent: 'flex-end',
                } },
                react_1.default.createElement(OptionsIcon, { onClick: react_1.useCallback((e) => context.onOptions(e, wrappedData), [
                        wrappedData,
                    ]), style: { minWidth: 35 } }))) : null)));
};
exports.default = TableRow;
//# sourceMappingURL=TableRow.js.map