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
const Title_1 = require("../../Text/Title");
const genPath_1 = __importDefault(require("./genPath"));
const genLabels_1 = __importDefault(require("./genLabels"));
const XAxis_1 = __importDefault(require("./XAxis"));
const OverlayWrapper_1 = __importDefault(require("./OverlayWrapper"));
const Labels_1 = __importDefault(require("./Labels"));
const StackedGraph = ({ width, height, data, format, label, spread, legend, valueFormat, }) => {
    const ref = react_1.useRef();
    let maxY, minY;
    let maxX, minX;
    const [xWidth, updateW] = react_1.useState(0);
    const dataStacked = [];
    for (const key in data) {
        const s = data[key];
        for (let i = 0; i < s.length; i++) {
            if (dataStacked[i]) {
                dataStacked[i].y += s[i].y;
                dataStacked[i].segments[key] = s[i].y;
            }
            else {
                dataStacked.push({
                    x: s[i].x,
                    y: s[i].y,
                    segments: {
                        [key]: s[i].y,
                    },
                });
            }
        }
    }
    for (let i = 0; i < dataStacked.length; i++) {
        const { x, y, segments } = dataStacked[i];
        if (maxY === undefined || y > maxY) {
            maxY = y;
        }
        if (minY === undefined || y < minY) {
            minY = y;
        }
        if (maxX === undefined || x > maxX) {
            maxX = x;
        }
        if (minX === undefined || x < minX) {
            minX = x;
        }
        for (const key in segments) {
            const y = segments[key];
            if (maxY === undefined || y > maxY) {
                maxY = y;
            }
            if (minY === undefined || y < minY) {
                minY = y;
            }
        }
    }
    const svgWidth = width - xWidth;
    const svgHeight = height - 50 - (label ? 36 : 0);
    const ySpread = maxY - minY;
    react_1.useEffect(() => {
        updateW(ref.current.getBoundingClientRect().width);
    }, [ySpread]);
    const { labels, labelHeight } = genLabels_1.default(svgHeight, ySpread, maxY);
    const [paths] = dataStacked.length < 2
        ? []
        : xWidth
            ? genPath_1.default(svgWidth, svgHeight, dataStacked, minY, ySpread, spread, true, legend)
            : [null, []];
    return (react_1.default.createElement("div", { style: {
            width,
            height,
        } },
        label ? (react_1.default.createElement(Title_1.Title, { size: "small", style: {
                marginBottom: 16,
            } }, label)) : null,
        react_1.default.createElement("div", { style: {
                width,
                height: svgHeight,
                display: 'flex',
            } },
            react_1.default.createElement("div", { ref: ref, style: {
                    paddingRight: 24,
                } },
                react_1.default.createElement(Labels_1.default, { valueFormat: valueFormat, labels: labels, labelHeight: labelHeight })),
            react_1.default.createElement(OverlayWrapper_1.default, { valueFormat: valueFormat, width: svgWidth, height: svgHeight, labelHeight: labelHeight, labels: labels, data: dataStacked, isStacked: true, legend: legend, format: format }, paths)),
        react_1.default.createElement("div", { style: {
                paddingLeft: xWidth + 'px',
            } },
            react_1.default.createElement(XAxis_1.default, { maxX: maxX, minX: minX, format: format, width: svgWidth }))));
};
exports.default = StackedGraph;
//# sourceMappingURL=StackedGraph.js.map