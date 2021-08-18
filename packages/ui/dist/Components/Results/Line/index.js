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
exports.LineGraph = exports.GraphContext = void 0;
const react_1 = __importStar(require("react"));
const react_virtualized_auto_sizer_1 = __importDefault(require("react-virtualized-auto-sizer"));
const Graph_1 = __importDefault(require("./Graph"));
const StackedGraph_1 = __importDefault(require("./StackedGraph"));
const defCtx = {
    hover: (a) => { },
};
exports.GraphContext = react_1.createContext(defCtx);
exports.GraphContext.displayName = 'GraphContext';
// multi line
const LineGraph = ({ data, label, spread = true, format = 'number', valueFormat = 'number-short', legend, }) => {
    const isStacked = data && typeof data === 'object' && !Array.isArray(data);
    return (react_1.default.createElement(react_virtualized_auto_sizer_1.default, null, ({ height, width }) => {
        return isStacked ? (react_1.default.createElement(exports.GraphContext.Provider, { value: {} },
            react_1.default.createElement(StackedGraph_1.default, { format: format, spread: spread, label: label, legend: legend, data: data, height: height, width: width, valueFormat: valueFormat }))) : (react_1.default.createElement(Graph_1.default, { format: format, spread: spread, label: label, data: data, height: height, width: width, valueFormat: valueFormat }));
    }));
};
exports.LineGraph = LineGraph;
//# sourceMappingURL=index.js.map