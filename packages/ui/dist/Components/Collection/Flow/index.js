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
exports.Flow = void 0;
const react_1 = __importStar(require("react"));
const react_window_1 = require("react-window");
const react_virtualized_auto_sizer_1 = __importDefault(require("react-virtualized-auto-sizer"));
const useDragScroll_1 = __importDefault(require("../../../hooks/drag/useDragScroll"));
const useSelect_1 = require("../../../hooks/useSelect");
const Footer_1 = require("../Footer");
const ListItem_1 = require("../List/ListItem");
const Header_1 = require("../Header");
const useDrop_1 = __importDefault(require("../../../hooks/drag/useDrop"));
const useDrag_1 = __importDefault(require("../../../hooks/drag/useDrag"));
const useMultipleEvents_1 = __importDefault(require("../../../hooks/events/useMultipleEvents"));
const theme_1 = require("@based/theme");
const useHover_1 = __importDefault(require("../../../hooks/events/useHover"));
const Loader_1 = require("../../Loader/Loader");
const getData_1 = __importDefault(require("../getData"));
const FooterBottom = ({ context, seqItems, isDragOver, isDragOverSeq, isDropLoading, index, wrappedData, }) => {
    const [drop, isFooterDragOver, isFooterLoading] = useDrop_1.default(react_1.useCallback((e, { files, data }) => {
        const index = wrappedData.data.items.length;
        if (data && data.length) {
            const oldIndex = data[0].index;
            const newIndex = index > oldIndex ? index - 1 : index;
            return context.onDrop(e, {
                targetIndex: newIndex || index,
                data,
            });
        }
        else if (files) {
            return context.onDrop(e, { files, targetIndex: index });
        }
    }, [context.onDrop, seqItems, wrappedData]), { readFiles: true });
    const footer = { ...context.stepFooter };
    if (context.expandable) {
        if (context.stepFooter.onClick) {
            footer.onClick = (...args) => {
                if (context.expanded[index]) {
                    context.updateExpandList(index);
                }
                context.stepFooter.onClick(...args);
            };
        }
    }
    return (react_1.default.createElement("div", { ...drop, style: {
            position: 'relative',
        } },
        react_1.default.createElement("div", { style: {
                top: 0,
                paddingTop: 15,
                borderLeft: '1px solid ' + theme_1.useColor({ color: 'divider' }),
                borderRight: '1px solid ' + theme_1.useColor({ color: 'divider' }),
                left: 0,
                right: 0,
                position: 'absolute',
                borderBottom: isFooterDragOver ? '2px solid blue' : null,
            } }),
        react_1.default.createElement(Footer_1.Footer, { framed: true, items: seqItems, ...footer, data: wrappedData, style: {
                opacity: isDragOver || isFooterDragOver ? 0 : 1,
                transition: 'opacity 0.15s, transform 0.2s',
                transform: isDragOverSeq ||
                    isDropLoading ||
                    isFooterDragOver ||
                    isFooterLoading
                    ? 'translate3d(0px, 20px, 0px)'
                    : isDragOver
                        ? 'translate3d(0px, 40px, 0px)'
                        : 'translate3d(0px, 0px, 0px)',
            } })));
};
const DragSeqLine = ({ index, width, onDropSequence, context }) => {
    if (onDropSequence) {
        const [dropSeq, isDragOverSeq, isDropLoading] = useDrop_1.default(react_1.useCallback((e, { files, data }) => {
            if (data[0]) {
                index = index + 1;
                return onDropSequence(e, {
                    // todo clean
                    targetIndex: index,
                    data,
                    files,
                    items: context.items,
                });
            }
        }, [index, onDropSequence]));
        return (react_1.default.createElement("div", { style: {
                top: 0,
                left: 0,
                paddingLeft: 10,
                paddingRight: 15,
                width: width - (context.paddingLeft || 0) - (context.paddingRight || 0),
                position: 'absolute',
                height: 35,
            }, ...dropSeq },
            react_1.default.createElement("div", { style: {
                    pointerEvents: 'none',
                    marginTop: 16.5,
                    opacity: isDragOverSeq ? 1 : 0,
                    transition: 'opacity 0.2s',
                    width: '100%',
                    borderTop: '2px solid ' + theme_1.useColor({ color: 'primary' }),
                } }),
            isDropLoading ? (react_1.default.createElement("div", { style: {
                    position: 'absolute',
                    height: 0,
                    left: 0,
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    top: 16,
                } },
                react_1.default.createElement(Loader_1.Loader, { size: 18, color: { color: 'primary' } }))) : null));
    }
    return null;
};
const defaultItemProps = {
    title: { path: ['title'] },
    items: { path: ['items'] },
};
const Sequence = ({ style, data: { items, context, width }, index }) => {
    const itemData = items[index];
    if (!itemData) {
        return null;
    }
    if (itemData['@@newSequence']) {
        let onClick = context.footer.onClick;
        if (context.footer.onClick &&
            context.header &&
            context.header.onEditTitle) {
            onClick = async (e, data) => {
                // allow expand in here
                // maybe add on autofocus ref
                context.autoFocusRef.current = true;
                // where to put this...
                setTimeout(() => {
                    context.autoFocusRef.current = false;
                }, 500);
                await context.footer.onClick(e, data);
            };
        }
        return (react_1.default.createElement("div", { style: {
                ...style,
                paddingLeft: context.paddingLeft,
                paddingRight: context.paddingRight,
                paddingBottom: 35,
                paddingTop: index === 0 ? context.paddingTop : 0,
            } },
            react_1.default.createElement(Footer_1.Footer, { framed: true, floating: true, items: items, data: { data: { items: items.slice(0, -1) } }, ...context.footer, onClick: onClick })));
    }
    else {
        const [hover, isHover] = useHover_1.default();
        const wrappedData = {
            exportData: context.exportDataSequence,
            index,
            data: itemData,
        };
        if (context.onDrop) {
            const onDrop = context.onDrop;
            context = {
                ...context,
                onDrop: react_1.useCallback((e, d) => {
                    return onDrop(e, { ...d, targetData: itemData });
                }, [onDrop, itemData]),
            };
        }
        const [drag, isDragging] = context.draggable !== false ? useDrag_1.default(wrappedData) : [{}, false];
        const [drop, isDragOver] = context.draggable !== false ? useDrop_1.default() : [{}, false];
        let dropSeq, isDragOverSeq, isDropLoading;
        if (index === 0 && context.onDropSequence && context.draggable !== false) {
            ;
            [dropSeq, isDragOverSeq, isDropLoading] = useDrop_1.default(react_1.useCallback((e, { files, data }) => {
                return context.onDropSequence(e, {
                    targetIndex: 0,
                    data,
                    files,
                    items,
                });
            }, [index, context.onDropSequence]));
        }
        const itemProps = context.seqItemProps || defaultItemProps;
        const titleProps = itemProps.title || defaultItemProps.title;
        const nestedItemProps = itemProps.items || defaultItemProps.items;
        const iconName = itemProps.icon && getData_1.default(itemData, itemProps.icon.path);
        const title = titleProps.format
            ? {
                format: titleProps.format,
                value: getData_1.default(itemData, titleProps.path),
            }
            : getData_1.default(itemData, titleProps.path);
        // const id = itemProps.id ? getData(itemData, itemProps.id) : index
        const isExpanded = !context.expandable ||
            (context.expandable
                ? context.defaultIsExpanded
                    ? !context.expanded[wrappedData.index]
                    : context.expanded[wrappedData.index]
                : null);
        const seqItems = getData_1.default(itemData, nestedItemProps.path) || [];
        // console.log('--', JSON.stringify(itemData, null, 2))
        const isLast = index === items.length - 2;
        const useAutoFocus = itemData.name === 'New sequence' ||
            (context.autoFocusRef.current === true && isLast);
        return (react_1.default.createElement("div", { style: {
                ...style,
                paddingLeft: context.paddingLeft,
                paddingRight: context.paddingRight,
            }, ...hover },
            react_1.default.createElement("div", { style: {
                    paddingTop: index === 0 ? context.paddingTop : 0,
                    height: style.height - 35 - 48,
                } },
                react_1.default.createElement("div", { ...useMultipleEvents_1.default(drag, dropSeq), style: {
                        position: 'relative',
                    } },
                    dropSeq ? (react_1.default.createElement("div", { style: {
                            position: 'relative',
                            width: '100%',
                        } },
                        react_1.default.createElement("div", { style: {
                                position: 'absolute',
                                pointerEvents: 'none',
                                opacity: isDragOverSeq ? 1 : 0,
                                transition: 'opacity 0.2s',
                                width: '100%',
                                borderTop: '2px solid ' + theme_1.useColor({ color: 'primary' }),
                            } }),
                        isDropLoading ? (react_1.default.createElement("div", { style: {
                                position: 'absolute',
                                height: 0,
                                left: 0,
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                top: 0,
                            } },
                            react_1.default.createElement(Loader_1.Loader, { size: 18, color: { color: 'primary' } }))) : null)) : null,
                    react_1.default.createElement("div", { style: {
                            opacity: isDragging ? 0.5 : 1,
                            height: 48,
                            transition: 'opacity 0.15s, transform 0.2s',
                            transform: isDragOverSeq || isDropLoading
                                ? 'translate3d(0px, 20px, 0px)'
                                : 'translate3d(0px, 0px, 0px)',
                        } },
                        react_1.default.createElement(Header_1.Header, { ...context.header, 
                            // how do i know if something is just created...
                            data: wrappedData, items: items, framed: true, indicator: context.indicator ? `${index + 1}.` : '', label: itemData.name === 'New sequence' ? '' : title, isExpanded: isExpanded, onExpand: context.expandable
                                ? react_1.useCallback(() => {
                                    context.updateExpandList(index);
                                }, [index])
                                : null, icon: iconName || 'newFlow', isHover: isHover, autoFocusTitle: useAutoFocus, noBorderBottom: wrappedData.data &&
                                wrappedData.data.items &&
                                wrappedData.data.items.length === 0 }))),
                react_1.default.createElement("div", { style: {
                        transform: isDragOverSeq || isDropLoading
                            ? 'translate3d(0px, 20px, 0px)'
                            : 'translate3d(0px, 0px, 0px)',
                        transition: 'opacity 0.15s, transform 0.2s',
                        borderLeft: '1px solid ' + theme_1.useColor({ color: 'divider' }),
                        borderRight: '1px solid ' + theme_1.useColor({ color: 'divider' }),
                        borderBottom: context.stepFooter
                            ? null
                            : '1px solid ' + theme_1.useColor({ color: 'divider' }),
                        borderBottomLeftRadius: context.stepFooter ? null : '4px',
                        borderBottomRightRadius: context.stepFooter ? null : '4px',
                    }, ...drop }, isExpanded ? (react_1.default.createElement(useSelect_1.SelectableCollection, { items: seqItems }, itemData.items &&
                    itemData.items.map((_data, index) => {
                        const s = {
                            position: 'relative',
                        };
                        return (react_1.default.createElement(ListItem_1.ListItem, { key: index, data: { items: seqItems, context }, index: index, styleOverride: s }));
                    }))) : null)),
            context.stepFooter ? (react_1.default.createElement(FooterBottom, { index: index, context: context, seqItems: seqItems, isDragOver: isDragOver, isDragOverSeq: isDragOverSeq, isDropLoading: isDropLoading, wrappedData: wrappedData })) : null,
            context.draggable !== false ? (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement("div", { style: {
                        position: 'relative',
                    } },
                    react_1.default.createElement(DragSeqLine, { onDropSequence: context.onDropSequence, index: index, context: context, width: width })))) : null));
    }
};
const Flow = (props) => {
    const { items = [], footer, paddingTop = 0, paddingBottom = 0 } = props;
    // make a ref...
    const autoFocusRef = react_1.useRef();
    const itemsWithNew = footer
        ? [
            ...items,
            {
                '@@newSequence': true,
            },
        ]
        : items;
    const listRef = react_1.useRef();
    react_1.useEffect(() => {
        if (listRef.current) {
            listRef.current.resetAfterIndex(0);
        }
    }, [items]);
    const expandedRef = react_1.useRef({ cnt: (~~(1000 * Math.random())).toString(16) });
    const updateExpandList = (action) => {
        expandedRef.current[action] = !expandedRef.current[action];
        listRef.current.resetAfterIndex(action);
    };
    const expanded = expandedRef.current;
    return (react_1.default.createElement(react_virtualized_auto_sizer_1.default, null, ({ height, width }) => {
        return (react_1.default.createElement(react_window_1.VariableSizeList, { ref: listRef, width: width, style: {
                paddingTop,
                paddingBottom,
                overflowX: 'hidden',
            }, itemCount: itemsWithNew.length, height: height, itemData: {
                items: itemsWithNew,
                context: {
                    autoFocusRef,
                    showIndex: true,
                    ...props,
                    updateExpandList,
                    expanded,
                    seqItemProps: props.itemProps,
                    itemProps: props.itemProps
                        ? props.itemProps.items
                            ? props.itemProps.items.props
                            : undefined
                        : undefined,
                },
                width,
            }, itemSize: (index) => {
                let x = 0;
                if (index === 0 && paddingTop) {
                    x += paddingTop;
                }
                const data = itemsWithNew[index];
                if (index === itemsWithNew.length - 1) {
                    x += paddingBottom;
                }
                if (data['@@newSequence']) {
                    return 48 + 35 + x;
                }
                if (props.stepFooter) {
                    x += 48;
                }
                if (props.sequenceSpacing) {
                    x += props.sequenceSpacing;
                }
                const selectItems = (props.itemProps && props.itemProps.items) ||
                    defaultItemProps.items;
                const items = getData_1.default(data, selectItems.path);
                if (!props.expandable ||
                    (props.defaultIsExpanded ? !expanded[index] : expanded[index])) {
                    return (items ? items.length : 0) * 48 + 48 + 35 + x;
                }
                return 48 + 35 + x;
            }, ...useDragScroll_1.default(true) }, Sequence));
    }));
};
exports.Flow = Flow;
//# sourceMappingURL=index.js.map