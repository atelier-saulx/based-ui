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
exports.ExpandableList = exports.ExpandableItem = void 0;
const react_1 = __importStar(require("react"));
const Text_1 = require("../../Text");
const theme_1 = require("@based/theme");
const react_virtualized_auto_sizer_1 = __importDefault(require("react-virtualized-auto-sizer"));
const Header_1 = require("../Header");
const icons_1 = require("@based/icons");
const getData_1 = __importDefault(require("../getData"));
const useHover_1 = __importDefault(require("../../../hooks/events/useHover"));
const renderChildren_1 = __importDefault(require("../../../util/renderChildren"));
const defaultitemProps = {
    title: {
        path: ['title'],
    },
};
const ExpandableItem = ({ context, paddingItemLeft, item, index }) => {
    const itemProps = context.itemProps || defaultitemProps;
    const [hover, isHover] = useHover_1.default();
    const [isExpanded, setExpanded] = react_1.useReducer((x) => !x, false);
    const { onOptions, options, optionsIcon, items, isNested, onClick } = context;
    const wrappedData = {
        data: item,
        index,
    };
    const iconDef = itemProps.icon && getData_1.default(item, itemProps.icon.path);
    const titleProps = itemProps.title || defaultitemProps.title;
    const title = titleProps.format
        ? {
            format: titleProps.format,
            value: getData_1.default(item, titleProps.path),
        }
        : getData_1.default(item, titleProps.path);
    let iconName, iconProps;
    if (iconDef && typeof iconDef === 'object') {
        iconName = iconDef.name;
        iconProps = iconDef;
    }
    else if (iconDef) {
        iconName = iconDef;
        iconProps = itemProps.icon;
    }
    const Icon = iconName ? icons_1.iconFromString(iconName) : null;
    const OptionsIcon = optionsIcon ? icons_1.iconFromString(optionsIcon) : icons_1.Settings;
    const hasExpand = !isNested || isNested(wrappedData);
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("div", { ...hover, style: {
                height: 56,
                display: 'flex',
                cursor: 'pointer',
                alignItems: 'center',
                paddingTop: 16,
                paddingLeft: paddingItemLeft,
                paddingBottom: 16,
                borderBottom: '1px solid ' + theme_1.useColor({ color: 'divider' }),
                backgroundColor: isHover
                    ? theme_1.useColor({ color: 'background', tone: 2 })
                    : null,
            }, onClick: (e) => {
                if (!isNested || isNested(wrappedData)) {
                    setExpanded();
                }
                else if (onClick) {
                    onClick(e, wrappedData);
                }
            } },
            hasExpand ? (react_1.default.createElement(icons_1.Expand, { style: {
                    transition: 'transform 0.1s',
                    transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
                }, color: { color: 'foreground' } })) : (react_1.default.createElement("div", { style: { width: 24 } })),
            Icon ? react_1.default.createElement(Icon, { style: { marginLeft: 20 }, ...iconProps }) : null,
            react_1.default.createElement(Text_1.Text, { noSelect: true, weight: isExpanded ? 'medium' : itemProps.title.weight || 'medium', singleLine: true, style: {
                    marginLeft: 16,
                } }, title),
            react_1.default.createElement("div", { style: {
                    flexGrow: 1,
                    paddingRight: 15,
                    display: 'flex',
                    justifyContent: 'flex-end',
                } },
                onOptions ? (react_1.default.createElement(OptionsIcon, { color: { color: 'foreground', opacity: isHover ? 0.5 : 0 }, onClick: react_1.useCallback((e) => {
                        e.stopPropagation();
                        onOptions(e, wrappedData);
                    }, [wrappedData]), style: {
                        width: 35,
                        paddingLeft: 7.5,
                    } })) : null,
                options && options.children
                    ? renderChildren_1.default(options.children, {
                        isHover,
                        isDragging: false,
                        isDragOver: false,
                        isSelected: false,
                        isActive: false,
                        onOptions: onOptions,
                        data: wrappedData,
                        items,
                    })
                    : null)),
        isExpanded
            ? renderChildren_1.default(context.children, {
                data: wrappedData,
                ...context,
            })
            : null));
};
exports.ExpandableItem = ExpandableItem;
const ExpandableList = (props) => {
    const { header, items, framed, className, style, paddingRight, paddingLeft, autoSize = true, } = props;
    return autoSize ? (react_1.default.createElement(react_virtualized_auto_sizer_1.default, null, ({ height, width }) => {
        return (react_1.default.createElement("div", { style: {
                paddingLeft,
                width,
                height,
                ...style,
            } },
            header ? (react_1.default.createElement(Header_1.Header, { framed: framed, width: width, ...header, paddingRight: paddingRight, paddingLeft: paddingLeft, items: items })) : null,
            react_1.default.createElement("div", { style: {
                    width,
                    height: height - (header ? 48 : 0),
                    overflowY: 'auto',
                    overflowX: 'hidden',
                } }, items.map((d, i) => {
                return (react_1.default.createElement(exports.ExpandableItem, { paddingItemLeft: props.paddingItemLeft, key: i, context: props, item: d, index: i }));
            }))));
    })) : (react_1.default.createElement("div", { style: { paddingLeft, ...style }, className: className },
        header ? (react_1.default.createElement(Header_1.Header, { framed: framed, width: "100%", ...header, paddingRight: paddingRight, paddingLeft: paddingLeft, items: items })) : null,
        items.map((d, i) => {
            return (react_1.default.createElement(exports.ExpandableItem, { paddingItemLeft: props.paddingItemLeft, key: i, context: props, item: d, index: i }));
        })));
};
exports.ExpandableList = ExpandableList;
//# sourceMappingURL=index.js.map