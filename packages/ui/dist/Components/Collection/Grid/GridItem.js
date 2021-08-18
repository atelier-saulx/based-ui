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
const Info_1 = __importDefault(require("./Info"));
const icons_1 = require("@based/icons");
const useDrag_1 = __importDefault(require("../../../hooks/drag/useDrag"));
const useDrop_1 = __importDefault(require("../../../hooks/drag/useDrop"));
const useSelect_1 = require("../../../hooks/useSelect");
const useMultipleEvents_1 = __importDefault(require("../../../hooks/events/useMultipleEvents"));
const useContextualMenu_1 = __importDefault(require("../../../hooks/events/useContextualMenu"));
const getData_1 = __importDefault(require("../getData"));
const Image_1 = require("./Image");
const Title_1 = require("../../Text/Title");
const defaultitemProps = {
    title: {
        path: ['title'],
    },
};
const GridItem = ({ style, columnIndex, rowIndex, data: { items, context }, }) => {
    let { columnCount, onClick, height, optionsIcon, width, exportData, Graphic, onDrop, onOptions, large, itemProps, activeId, } = context;
    const index = columnIndex + rowIndex * columnCount;
    const itemData = items[index];
    if (!itemData) {
        return null;
    }
    if (!itemProps) {
        itemProps = defaultitemProps;
    }
    const textProps = itemProps.text;
    const titleProps = itemProps.title || defaultitemProps.title;
    const iconName = itemProps.icon && getData_1.default(itemData, itemProps.icon.path);
    const img = itemProps.img && getData_1.default(itemData, itemProps.img.path);
    const title = titleProps.format
        ? {
            format: titleProps.format,
            value: getData_1.default(itemData, titleProps.path),
        }
        : getData_1.default(itemData, titleProps.path);
    const text = textProps
        ? textProps.format
            ? {
                format: textProps.format,
                value: getData_1.default(itemData, textProps.path),
            }
            : getData_1.default(itemData, textProps.path)
        : undefined;
    const info = itemProps.info &&
        (itemProps.info.format
            ? {
                format: itemProps.info.format,
                value: getData_1.default(itemData, itemProps.info.path),
            }
            : getData_1.default(itemData, itemProps.info.path));
    const id = itemProps.id ? getData_1.default(itemData, itemProps.id) : index;
    const wrappedData = {
        index,
        data: itemData,
        exportData,
    };
    const isActive = activeId === id;
    const TextComponent = large ? Title_1.Title : Text_1.Text;
    const hasGraphic = itemProps.img || Graphic;
    const [hover, isHover] = useHover_1.default();
    const ref = react_1.useRef();
    const [drag, isDragging] = useDrag_1.default(wrappedData, ref);
    const [select, isSelected] = useSelect_1.useSelect(wrappedData);
    const [drop, isDragOver] = useDrop_1.default(react_1.useCallback((e, { files, data }) => {
        if (onDrop) {
            if (data && data.length) {
                const oldIndex = data[0].index;
                const newIndex = index > oldIndex ? index - 1 : index;
                return onDrop(e, {
                    targetIndex: newIndex || index,
                    data,
                });
            }
            else if (files) {
                return onDrop(e, { files, targetIndex: index });
            }
        }
    }, [index, items]), { readFiles: true });
    // isDragOver
    const Icon = iconName ? icons_1.iconFromString(iconName) : null;
    const OptionsIcon = optionsIcon ? icons_1.iconFromString(optionsIcon) : icons_1.Settings;
    return (react_1.default.createElement("div", { style: {
            padding: 8,
            ...style,
        } },
        react_1.default.createElement("div", { ref: ref, style: {
                height,
                opacity: isDragging ? 0.5 : 1,
                width,
                display: 'flex',
                transform: isDragOver
                    ? large
                        ? 'scale(0.98)'
                        : 'scale(0.96)'
                    : 'scale(1.0)',
                flexDirection: 'column',
                cursor: 'pointer',
                transition: 'transform 0.15s',
                border: '1px solid ' +
                    theme_1.useColor({
                        tone: isHover ? 3 : 1,
                        color: isSelected || isActive
                            ? 'primary'
                            : isHover
                                ? 'foreground'
                                : 'divider',
                    }),
                borderRadius: 4,
            }, ...useMultipleEvents_1.default(drop, hover, drag, select, onClick
                ? {
                    onClick: useSelect_1.useClick((e) => {
                        onClick(e, wrappedData);
                    }, [onClick, itemData, index]),
                }
                : undefined, onOptions && context.contextualMenu
                ? useContextualMenu_1.default(react_1.useCallback((e) => {
                    onOptions(e, wrappedData);
                }, [wrappedData]))
                : undefined) },
            react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement("div", { style: {
                        flex: hasGraphic ? 1 : 0,
                        display: 'flex',
                        position: 'relative',
                        justifyContent: 'center',
                        alignItems: 'center',
                    } },
                    Graphic ? (react_1.default.createElement(Graphic, { isHover: isHover, isDragging: isDragging, isDragOver: isDragOver, isSelected: isSelected, isActive: isActive, onOptions: onOptions, onClick: onClick, data: wrappedData, items: items })) : itemProps.img ? (react_1.default.createElement(Image_1.Image, { src: img })) : null,
                    onOptions ? (react_1.default.createElement(OptionsIcon, { color: {
                            color: 'foreground',
                        }, onClick: react_1.useCallback((e) => onOptions(e, wrappedData), [
                            itemData,
                            index,
                        ]), style: {
                            opacity: isHover ? 1 : 0,
                            transition: 'opacity 0.15s',
                            position: 'absolute',
                            top: 10,
                            right: 15,
                        } })) : null),
                react_1.default.createElement("div", { style: {
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                        // justifyContent: hasGraphic ? 'flex-end' : 'flex-start',
                        padding: 16,
                    } },
                    react_1.default.createElement("div", { style: {
                            display: 'flex',
                            alignItems: 'center',
                            marginBottom: itemProps.icon && itemProps.icon.framed ? 5 : 0,
                        } },
                        Icon ? (react_1.default.createElement(Icon, { ...itemProps.icon, style: {
                                marginRight: itemProps.icon.framed ? 12 : 8,
                                marginLeft: itemProps.icon.framed ? 0 : -3,
                            } })) : null,
                        react_1.default.createElement(TextComponent, { weight: "medium", noSelect: true }, title)),
                    itemProps.info ? react_1.default.createElement(Info_1.default, { data: info }) : null,
                    !hasGraphic && itemProps.text ? (react_1.default.createElement("div", { style: {
                            // height: '100%',
                            marginTop: 8,
                            marginBottom: 8,
                        } },
                        react_1.default.createElement(Text_1.Text, null, text && text.length > 1e3
                            ? text.slice(0, 1000) + '...'
                            : text))) : null)))));
};
exports.default = GridItem;
//# sourceMappingURL=GridItem.js.map