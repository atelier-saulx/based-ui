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
exports.ListItem = void 0;
const react_1 = __importStar(require("react"));
const Text_1 = require("../../Text");
const useHover_1 = __importDefault(require("../../../hooks/events/useHover"));
const useMultipleEvents_1 = __importDefault(require("../../../hooks/events/useMultipleEvents"));
const icons_1 = require("@based/icons");
const theme_1 = require("@based/theme");
const useDrag_1 = __importDefault(require("../../../hooks/drag/useDrag"));
const useDrop_1 = __importDefault(require("../../../hooks/drag/useDrop"));
const useSelect_1 = require("../../../hooks/useSelect");
const useContextualMenu_1 = __importDefault(require("../../../hooks/events/useContextualMenu"));
const Loader_1 = require("../../Loader/Loader");
const getData_1 = __importDefault(require("../getData"));
const renderChildren_1 = __importDefault(require("../../../util/renderChildren"));
const Img = ({ src, size }) => {
    return (react_1.default.createElement("div", { style: {
            width: size,
            height: size,
            backgroundImage: `url(${src})`,
            backgroundSize: 'cover',
            borderRadius: 4,
            border: '1px solid ' + theme_1.useColor({ color: 'divider' }),
        } }));
};
const Action = ({ icon, onClick, isHover }) => {
    const [clicky, setClicky] = react_1.useState(false);
    const ref = react_1.useRef();
    react_1.useEffect(() => {
        return () => {
            clearTimeout(ref.current);
        };
    }, []);
    const ActionIcon = icons_1.iconFromString(icon);
    return (react_1.default.createElement("div", { style: {
            marginLeft: 16,
            opacity: isHover ? 0.75 : 0,
            transition: 'transform 0.15s',
            transform: clicky ? 'scale(1.3)' : 'scale(1)',
        }, onClick: (e) => {
            setClicky(true);
            ref.current = setTimeout(() => {
                setClicky(false);
            }, 150);
            onClick(e);
        } },
        react_1.default.createElement(ActionIcon, null)));
};
const defaultitemProps = {
    title: {
        path: ['title'],
    },
};
const ListItem = ({ index, data: { items, context }, style: itemStyle = undefined, styleOverride, }) => {
    let { onClick, activeId, onOptions, children, actionIcon, itemProps, onAction, Actions, optionsIcon, contextualMenu, onDrop, paddingRight = 0, paddingLeft = 0, paddingTop = 0, exportData, draggable = true, showIndex, isActive: isActiveFn, } = context;
    if (!itemProps) {
        itemProps = defaultitemProps;
    }
    const style = {
        height: 48,
        paddingLeft: paddingLeft,
        paddingRight: paddingRight,
    };
    const x = Object.assign(style, itemStyle);
    x.top = `${parseFloat(x.top) + paddingTop}px`;
    const ref = react_1.useRef();
    const itemData = items[index];
    const titleProps = itemProps.title || defaultitemProps.title;
    const iconDef = itemProps.icon && getData_1.default(itemData, itemProps.icon.path);
    const img = itemProps.img && getData_1.default(itemData, itemProps.img.path);
    const title = titleProps.format
        ? {
            format: titleProps.format,
            value: getData_1.default(itemData, titleProps.path),
        }
        : getData_1.default(itemData, titleProps.path);
    const info = itemProps.info &&
        (itemProps.info.format
            ? {
                format: itemProps.info.format,
                value: getData_1.default(itemData, itemProps.info.path),
            }
            : getData_1.default(itemData, itemProps.info.path));
    const id = itemProps.id ? getData_1.default(itemData, itemProps.id) : index;
    const inActive = itemProps.inActive
        ? getData_1.default(itemData, itemProps.inActive)
        : false;
    const wrappedData = {
        index,
        data: itemData,
        exportData,
    };
    let iconName, iconProps;
    if (iconDef && typeof iconDef === 'object') {
        iconName = iconDef.name;
        iconProps = iconDef;
    }
    else if (iconDef) {
        iconName = iconDef;
        iconProps = itemProps.icon;
    }
    const isActive = isActiveFn ? isActiveFn(wrappedData) : activeId === id;
    const [hover, isHover] = useHover_1.default();
    const [drop, isDragOver, isDropLoading] = useDrop_1.default(react_1.useCallback((e, { files, data }) => {
        if (onDrop) {
            if (data && data.length) {
                return onDrop(e, {
                    targetIndex: index,
                    data,
                });
            }
            else if (files) {
                return onDrop(e, { files, targetIndex: index });
            }
        }
    }, [index, items]), { readFiles: true });
    const [drag, isDragging] = draggable ? useDrag_1.default(wrappedData, ref) : [{}, false];
    const [select, isSelected] = useSelect_1.useSelect(wrappedData);
    if (onDrop) {
        react_1.useEffect(() => {
            if (isDragOver || isDropLoading) {
                if (!ref.current || !ref.current.dragLayerActive) {
                    const el = ref.current;
                    const p = el.parentNode;
                    const holder = p.parentNode;
                    let foundP = false;
                    holder.isDrop = el;
                    for (let i = 0; i < holder.children.length; i++) {
                        const c = holder.children[i];
                        if (c === p) {
                            foundP = true;
                        }
                        if (!foundP) {
                            c.children[1].style.transform = 'translate3d(0px, 0px, 0px)';
                        }
                        else {
                            c.children[1].style.transform = 'translate3d(0px, 40px, 0px)';
                        }
                    }
                    ref.current.dragLayerActive = true;
                }
            }
            else if (ref.current && ref.current.dragLayerActive) {
                ref.current.dragLayerActive = false;
                const el = ref.current;
                const p = el.parentNode;
                const holder = p.parentNode;
                if (holder.isDrop === el) {
                    for (let i = 0; i < holder.children.length; i++) {
                        const c = holder.children[i];
                        c.children[1].style.transform = 'translate3d(0px, 0px, 0px)';
                    }
                    holder.isDrop = false;
                }
            }
        }, [isDragOver, onDrop, isDropLoading]);
    }
    const Icon = iconName ? icons_1.iconFromString(iconName) : null;
    const OptionsIcon = optionsIcon ? icons_1.iconFromString(optionsIcon) : icons_1.Settings;
    return (react_1.default.createElement("div", { style: styleOverride || x, ...drop },
        onDrop ? (react_1.default.createElement("div", null,
            react_1.default.createElement("div", { style: {
                    position: 'absolute',
                    left: 0,
                    top: 23,
                    pointerEvents: 'none',
                    opacity: isDragOver ? 1 : 0,
                    transition: 'opacity 0.2s',
                    width: '100%',
                    borderTop: '2px solid ' + theme_1.useColor({ color: 'primary' }),
                } }),
            isDropLoading ? (react_1.default.createElement("div", { style: {
                    position: 'absolute',
                    height: 0,
                    left: 15,
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    top: 23,
                } },
                react_1.default.createElement(Loader_1.Loader, { color: { color: 'primary' } }))) : null)) : null,
        react_1.default.createElement("div", { ref: ref, style: {
                height: 48 + (itemProps.info ? 15 : 0),
                opacity: inActive || isDragging ? 0.5 : 1,
                alignItems: 'center',
                display: 'flex',
                cursor: onClick ? 'pointer' : 'default',
                transition: 'border 0.1s, background-color 0.15s, transform 0.2s',
                borderLeft: isActive
                    ? `2px solid ` + theme_1.useColor({ color: 'primary' })
                    : null,
                borderBottom: index !== items.length - 1
                    ? '1px solid ' + theme_1.useColor({ color: 'divider' })
                    : null,
                padding: 15,
                backgroundColor: isSelected
                    ? theme_1.useColor({
                        color: 'background',
                        tone: 3,
                    })
                    : isHover
                        ? theme_1.useColor({ color: 'background', tone: 2 })
                        : null,
            }, ...useMultipleEvents_1.default(drag, select, hover, onClick
                ? {
                    onClick: useSelect_1.useClick((e) => {
                        onClick(e, wrappedData);
                    }, [onClick, wrappedData]),
                }
                : undefined, contextualMenu
                ? useContextualMenu_1.default(react_1.useCallback((e) => {
                    onOptions(e, wrappedData);
                }, [onOptions, wrappedData]))
                : undefined) },
            img ? (react_1.default.createElement(Img, { src: img, size: 24 + (itemProps.info ? 15 : 0) })) : Icon ? (react_1.default.createElement(Icon, { ...iconProps })) : null,
            react_1.default.createElement("div", { style: {
                    overflow: 'hidden',
                    marginLeft: 15,
                } },
                react_1.default.createElement(Text_1.Text, { noSelect: true, weight: "medium", singleLine: true }, showIndex ? `${index + 1}. ${title}` : title),
                info ? (react_1.default.createElement(Text_1.Text, { singleLine: true, noSelect: true, weight: "regular", color: { color: 'foreground', tone: 3 }, style: {
                        marginTop: -4,
                    } }, info)) : null),
            Actions ? (react_1.default.createElement(Actions, { isHover: isHover, isDragging: isDragging, isDragOver: isDragOver, isSelected: isSelected, isActive: isActive, onOptions: onOptions, onClick: onClick, data: wrappedData, items: items })) : actionIcon ? (react_1.default.createElement(Action, { isHover: isHover, icon: actionIcon, onClick: react_1.useCallback((e) => {
                    e.stopPropagation();
                    if (onAction) {
                        onAction(e, wrappedData);
                    }
                }, [itemData]) })) : null,
            react_1.default.createElement("div", { style: {
                    flexGrow: 1,
                    display: 'flex',
                    justifyContent: 'flex-end',
                } },
                onOptions || children || !draggable ? null : (react_1.default.createElement(icons_1.Drag, { style: {
                        opacity: isHover ? 0.4 : 0,
                        transition: 'opacity 0.15s',
                        cursor: 'grab',
                    }, color: { color: 'foreground' } })),
                onOptions ? (react_1.default.createElement(OptionsIcon, { color: { color: 'foreground', opacity: isHover ? 0.5 : 0 }, onClick: react_1.useCallback((e) => {
                        e.stopPropagation();
                        onOptions(e, wrappedData);
                    }, [wrappedData]), style: {
                        width: 35,
                        paddingLeft: 7.5,
                    } })) : null,
                children
                    ? renderChildren_1.default(children, {
                        isHover,
                        isDragging,
                        isDragOver,
                        isSelected,
                        isActive,
                        onOptions,
                        onClick,
                        data: wrappedData,
                        items,
                    })
                    : null))));
};
exports.ListItem = ListItem;
//# sourceMappingURL=ListItem.js.map