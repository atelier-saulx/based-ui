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
exports.List = void 0;
const react_1 = __importStar(require("react"));
const react_window_1 = require("react-window");
const react_virtualized_auto_sizer_1 = __importDefault(require("react-virtualized-auto-sizer"));
const Header_1 = require("../Header");
const useSelect_1 = require("../../../hooks/useSelect");
const useDragScroll_1 = __importDefault(require("../../../hooks/drag/useDragScroll"));
const ListItem_1 = require("./ListItem");
const theme_1 = require("@based/theme");
const Footer_1 = require("../Footer");
const mem = {};
const getElementType = (paddingTop, paddingBottom) => {
    const padding = paddingTop + paddingBottom;
    if (!(padding in mem)) {
        mem[padding] = react_1.forwardRef(({ style, ...rest }, ref) => {
            return (react_1.default.createElement("div", { ref: ref, style: {
                    ...style,
                    height: `${parseFloat(style.height) + padding}px`,
                }, ...rest }));
        });
    }
    return mem[padding];
};
const List = (props) => {
    let { header, footer, framed, items = [], onClick, paddingRight = 0, paddingLeft = 0, paddingTop = 0, paddingBottom = 0, activeId, forceActive, } = props;
    if (forceActive) {
        forceActive = !activeId && !!items[0];
    }
    react_1.useEffect(() => {
        if (forceActive && items[0]) {
            onClick(null, { index: 0, data: items[0], exportData: props.exportData });
        }
    }, [forceActive]);
    return (react_1.default.createElement(react_virtualized_auto_sizer_1.default, null, ({ height, width }) => {
        const context = props;
        return (react_1.default.createElement(useSelect_1.SelectableCollection, { items: items },
            react_1.default.createElement(react_1.default.Fragment, null,
                header ? (react_1.default.createElement(Header_1.Header, { framed: framed, width: width, ...header, paddingRight: paddingRight, paddingLeft: paddingLeft, items: items })) : null,
                react_1.default.createElement(react_window_1.FixedSizeList, { width: width, style: {
                        paddingTop,
                        paddingBottom,
                        borderBottomLeftRadius: framed && !footer ? 4 : null,
                        borderBottomRightRadius: framed && !footer ? 4 : null,
                        borderLeft: framed
                            ? '1px solid ' + theme_1.useColor({ color: 'divider' })
                            : null,
                        borderRight: framed
                            ? '1px solid ' + theme_1.useColor({ color: 'divider' })
                            : null,
                        borderBottom: framed && !footer
                            ? '1px solid ' + theme_1.useColor({ color: 'divider' })
                            : null,
                    }, innerElementType: paddingTop || paddingBottom
                        ? getElementType(paddingTop, paddingBottom)
                        : null, itemCount: items.length, height: height - (header ? 48 : 0) - (footer ? 48 : 0), itemData: { items, context }, itemSize: 48 + (props.itemProps && props.itemProps.info ? 15 : 0), ...useDragScroll_1.default(true) }, ListItem_1.ListItem),
                footer ? (react_1.default.createElement(Footer_1.Footer, { ...footer, items: items, width: width, framed: framed })) : null)));
    }));
};
exports.List = List;
//# sourceMappingURL=index.js.map