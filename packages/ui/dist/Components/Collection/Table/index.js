"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Table = void 0;
const react_1 = __importDefault(require("react"));
const react_window_1 = require("react-window");
const react_virtualized_auto_sizer_1 = __importDefault(require("react-virtualized-auto-sizer"));
const useSelect_1 = require("../../../hooks/useSelect");
const useDragScroll_1 = __importDefault(require("../../../hooks/drag/useDragScroll"));
const TableRow_1 = __importDefault(require("./TableRow"));
const Fields_1 = __importDefault(require("./Fields"));
const getFieldSizes_1 = __importDefault(require("./getFieldSizes"));
const Table = (props) => {
    return (react_1.default.createElement("div", { style: {
            width: '100%',
            paddingLeft: props.paddingLeft === undefined ? 40 : props.paddingLeft,
            paddingRight: props.paddingRight === undefined ? 40 : props.paddingRight,
            height: '100%',
        } },
        react_1.default.createElement(react_virtualized_auto_sizer_1.default, null, ({ height, width }) => {
            const itemProps = getFieldSizes_1.default(width, props.itemProps, props.onOptions, true);
            const context = { ...props, itemProps };
            return (react_1.default.createElement(useSelect_1.SelectableCollection, { items: props.items },
                react_1.default.createElement(Fields_1.default, { onChange: props.onChange, width: width, context: context }),
                react_1.default.createElement(react_window_1.FixedSizeList, { width: width, itemCount: props.items ? props.items.length : 0, height: height - 49, itemData: { context, items: props.items }, itemSize: props.large ? 80 : 60, ...useDragScroll_1.default(true), onScroll: props.onScroll ? (e) => props.onScroll(e, height) : null }, TableRow_1.default)));
        })));
};
exports.Table = Table;
//# sourceMappingURL=index.js.map