"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BarGraph = void 0;
const react_1 = __importDefault(require("react"));
const Text_1 = require("../../Text");
const theme_1 = require("@based/theme");
const useHover_1 = __importDefault(require("../../../hooks/events/useHover"));
const useMultipleEvents_1 = __importDefault(require("../../../hooks/events/useMultipleEvents"));
const useTooltip_1 = __importDefault(require("../../../hooks/overlay/useTooltip"));
const BarSegment = ({ total, len, value, index, legend, label, left }) => {
    const [hover, isHover] = useHover_1.default();
    const barSegment = (react_1.default.createElement("div", { ...useMultipleEvents_1.default(useTooltip_1.default(react_1.default.createElement("div", { style: {
                paddingTop: 8,
                paddingLeft: 16,
                paddingRight: 16,
                paddingBottom: 8,
            } },
            react_1.default.createElement(Text_1.Text, { weight: "semibold" }, legend ? legend[label] : label),
            react_1.default.createElement("div", { style: {
                    display: 'flex',
                    marginTop: 12,
                    paddingTop: 12,
                    borderTop: '1px solid ' + theme_1.useColor({ color: 'divider' }),
                    justifyContent: 'space-between',
                } },
                react_1.default.createElement(Text_1.Text, null, { value, format: 'number-short' }),
                react_1.default.createElement(Text_1.Text, { color: { color: 'primary' } }, `${(((value || 0) / total) * 100).toFixed()}%`))), { width: 220 }), hover), style: {
            backgroundColor: isHover
                ? theme_1.useColor({ color: 'secondary' })
                : theme_1.useColor({
                    color: 'primary',
                    tone: 2,
                    opacity: (index / len) * 0.3 + 0.7,
                }),
            width: `${((value || 0) / total) * 100}%`,
            top: 0,
            left: `${((left || 0) / total) * 100}%`,
            position: 'absolute',
            bottom: 0,
        } }));
    return barSegment;
};
const BarGraph = ({ data, label, value, legend, }) => {
    let t = 0;
    let high;
    for (let i = 0; i < data.length; i++) {
        let value = 0;
        if (typeof data[i].value === 'object') {
            // @ts-ignore
            for (const k in data[i].value) {
                value += data[i].value[k] || 0;
            }
        }
        else {
            // @ts-ignore
            value = data[i].value || 0;
        }
        t += value;
        if (high === undefined || value > high) {
            high = value;
        }
    }
    return (react_1.default.createElement("div", { style: {
            width: '100%',
        } },
        label || value ? (react_1.default.createElement("div", { style: {
                display: 'flex',
                paddingBottom: 12,
                marginBottom: 20,
                justifyContent: 'space-between',
                borderBottom: '1px solid ' + theme_1.useColor({ color: 'divider' }),
            } },
            react_1.default.createElement(Text_1.Text, { weight: "medium" }, label),
            react_1.default.createElement(Text_1.Text, { weight: "medium" }, value))) : null,
        react_1.default.createElement("div", { style: {
                width: '100%',
                display: 'flex',
            } },
            react_1.default.createElement("div", { style: {
                    paddingRight: 24,
                } }, data.map((v, i) => {
                return (react_1.default.createElement("div", { key: i, style: {
                        marginTop: 8,
                        height: 32,
                        alignContent: 'center',
                        display: 'flex',
                        paddingTop: 2,
                        marginBottom: 8,
                    } },
                    react_1.default.createElement(Text_1.Text, null, v.label)));
            })),
            react_1.default.createElement("div", { style: {
                    flexGrow: 2,
                } }, data.map((v, i) => {
                let value = 0;
                let segments = null;
                if (typeof v.value === 'object') {
                    segments = [];
                    let len = 0;
                    let largest;
                    for (const k in v.value) {
                        len++;
                        value += v.value[k];
                        if (largest === undefined || largest.value < v.value[k]) {
                            largest = {
                                value: v.value[k],
                                key: k,
                            };
                        }
                    }
                    let i = 0;
                    let add = 0;
                    for (const k in v.value) {
                        if (k !== largest.key) {
                            segments.push(react_1.default.createElement(BarSegment, { key: k, label: k, legend: legend, left: add, total: value, index: i, len: len, value: v.value[k] }));
                            add += v.value[k];
                        }
                        i++;
                    }
                    if (largest) {
                        segments.push(react_1.default.createElement(BarSegment, { key: largest.key, label: largest.key, legend: legend, left: add, total: value, index: i, len: len, value: largest.value }));
                    }
                }
                else {
                    value = v.value;
                }
                return (react_1.default.createElement("div", { key: i, style: {
                        minWidth: 75,
                        marginBottom: 8,
                        display: 'flex',
                        position: 'relative',
                        justifyContent: 'flex-end',
                        marginTop: 8,
                        overflow: 'hidden',
                        borderRadius: 4,
                        transition: 'width 0.5s',
                        width: ((value || 0) / high) * 100 + '%',
                        height: 32,
                        backgroundColor: segments
                            ? null
                            : theme_1.useColor({
                                color: 'primary',
                                tone: 2,
                            }),
                    } },
                    segments,
                    react_1.default.createElement(Text_1.Text, { singleLine: true, noSelect: true, weight: "semibold", color: { color: 'background' }, style: {
                            zIndex: 1,
                            marginTop: 4,
                            marginBottom: 4,
                            marginRight: 8,
                        } }, [
                        { format: 'number-short', value: value },
                        ` (${(((value || 0) / t) * 100).toFixed()}%)`,
                    ])));
            })))));
};
exports.BarGraph = BarGraph;
//# sourceMappingURL=index.js.map