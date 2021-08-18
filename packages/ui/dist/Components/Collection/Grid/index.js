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
exports.Grid = void 0;
const react_1 = __importStar(require("react"));
const react_window_1 = require("react-window");
const react_virtualized_auto_sizer_1 = __importDefault(require("react-virtualized-auto-sizer"));
const useSelect_1 = require("../../../hooks/useSelect");
const useDragScroll_1 = __importDefault(require("../../../hooks/drag/useDragScroll"));
const Header_1 = require("../Header");
const Footer_1 = require("../Footer");
const theme_1 = require("@based/theme");
const GridItem_1 = __importDefault(require("./GridItem"));
const Grid = (props) => {
    const { items = [], large, onClick, onOptions, optionsIcon, header, footer, framed, activeId, } = props;
    let { forceActive } = props;
    if (forceActive) {
        forceActive = !activeId && !!items[0];
    }
    react_1.useEffect(() => {
        if (forceActive) {
            onClick(null, { index: 0, data: items[0], exportData: props.exportData });
        }
    }, [forceActive]);
    return (react_1.default.createElement("div", { style: {
            width: '100%',
            height: '100%',
        } },
        react_1.default.createElement(react_virtualized_auto_sizer_1.default, null, ({ height, width }) => {
            const ratio = 220 / 232;
            let w = (large ? 440 : 220) + 16;
            const columnCount = Math.floor(width / w);
            // - 4 for scrollbar
            w = Math.floor((width - 16) / columnCount) - 4 / columnCount;
            const h = w * ratio + 16;
            const context = {
                onOptions,
                optionsIcon,
                onClick,
                large,
                width: w - 16,
                height: h - 16,
                columnCount,
                ...props,
            };
            return (react_1.default.createElement(useSelect_1.SelectableCollection, { items: items },
                header ? (react_1.default.createElement(Header_1.Header, { framed: framed, width: width, ...header, items: items })) : null,
                react_1.default.createElement("div", { style: {
                        paddingTop: 8,
                        paddingLeft: 8,
                        paddingRight: 8,
                        width,
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
                    } },
                    react_1.default.createElement(react_window_1.FixedSizeGrid, { width: width - 9, columnCount: context.columnCount, rowCount: Math.ceil(items.length / context.columnCount), height: height - 10 - (header ? 48 : 0) - (footer ? 48 : 0), itemData: { items, context }, rowHeight: h, columnWidth: w, ...useDragScroll_1.default(true), style: {
                            paddingBottom: 8,
                        } }, GridItem_1.default)),
                footer ? (react_1.default.createElement(Footer_1.Footer, { ...footer, items: items, width: width, framed: framed })) : null));
        })));
};
exports.Grid = Grid;
//# sourceMappingURL=index.js.map