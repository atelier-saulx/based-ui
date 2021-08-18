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
exports.Scatter = void 0;
const react_1 = __importStar(require("react"));
const Text_1 = require("../../Text");
const SubText_1 = require("../../Text/SubText");
const Title_1 = require("../../Text/Title");
const theme_1 = require("@based/theme");
const Button_1 = require("../../Button");
const react_virtualized_auto_sizer_1 = __importDefault(require("react-virtualized-auto-sizer"));
const useTooltip_1 = __importDefault(require("../../../hooks/overlay/useTooltip"));
const Label_1 = require("../../Text/Label");
const Slider = ({ width, data, isDragging, setDragging, index, setIndex }) => {
    // use effect for on mouse move
    const ref = react_1.useRef();
    react_1.useEffect(() => {
        let moveHandler;
        let up;
        if (isDragging) {
            up = (e) => {
                setDragging(false);
            };
            moveHandler = (e) => {
                if (isDragging) {
                    // const { x } = e.currentTarget.getBoundingClientRect()
                    const xx = e.pageX -
                        ref.current.x +
                        ref.current.index * ((width - 120) / data.length);
                    const index = Math.min(Math.max(0, Math.floor((xx / (width - 120)) * data.length)), data.length - 1);
                    setIndex(index);
                }
            };
            document.addEventListener('mouseup', up);
            document.addEventListener('mousemove', moveHandler);
        }
        return () => {
            document.removeEventListener('mouseup', up);
            document.removeEventListener('mousemove', moveHandler);
        };
    }, [isDragging, ref]);
    return (react_1.default.createElement("div", { style: {
            width,
            height: 50,
            paddingLeft: 8,
            paddingTop: 20,
        } },
        react_1.default.createElement("div", { style: {
                marginLeft: 90,
                width: width - 100,
                height: 20,
                position: 'relative',
            } },
            react_1.default.createElement("div", { style: {
                    width: '100%',
                    marginTop: 8,
                    position: 'absolute',
                    height: 4,
                    borderRadius: 2,
                    backgroundColor: theme_1.useColor({ color: 'divider' }),
                } }),
            react_1.default.createElement("div", { style: {
                    position: 'absolute',
                    left: 0,
                    transform: `translate3d(${index * ((width - 120) / data.length)}px,0px,0px)`,
                    transitionTimingFunction: 'linear',
                    transition: isDragging ? null : 'transform 1s',
                    top: 0,
                    borderRadius: '50%',
                    width: 20,
                    height: 20,
                    background: theme_1.useColor({ color: 'primary' }),
                }, onMouseDown: (e) => {
                    ref.current = { x: e.pageX, index };
                    setDragging(true);
                } }))));
};
const ScatterInner = ({ data, width, height, header, xLabelFormat, yLabelFormat, info }) => {
    const ref = react_1.useRef();
    let [index, setIndex] = react_1.useState(0);
    const [isDragging, setDragging] = react_1.useState(false);
    if (!data[index]) {
        index = data.length - 1;
    }
    ref.current = index;
    const [isPlaying, setPlay] = react_1.useState(true);
    react_1.useEffect(() => {
        let interval;
        if (isPlaying) {
            interval = setInterval(() => {
                setIndex(ref.current + 1);
            }, 1e3);
        }
        return () => {
            clearInterval(interval);
        };
    }, [isPlaying]);
    let minY;
    let maxY;
    let minX;
    let maxX;
    // if (index === 'last') {
    //   selectedData = data[data.length - 1].points
    // } else {
    const points = data[index].points;
    // }
    for (let i = 0; i < points.length; i++) {
        const d = points[i];
        if (d.y > maxY || maxY === undefined) {
            maxY = d.y;
        }
        if (d.y < minY || minY === undefined) {
            minY = d.y;
        }
        if (d.x > maxX || maxX === undefined) {
            maxX = d.x;
        }
        if (d.x < minX || minX === undefined) {
            minX = d.x;
        }
    }
    const graphHeight = height - 50 - 50 - 24 - 50;
    const graphWidth = width - 100 - 50;
    const pxRatios = [
        1 / ((maxX - minX) / graphWidth),
        1 / ((maxY - minY) / graphHeight),
    ];
    const xLabelsP = [];
    const labelW = 150;
    const labelamount = (graphWidth + 50) / labelW;
    const spread = (maxX - minX) / labelamount;
    for (let i = 0; i < labelamount; i++) {
        // xLabel format
        // yLabel format
        xLabelsP.push(react_1.default.createElement("div", { key: i, style: {
                position: 'absolute',
                transform: `translate3d(${i * labelW}px,0px,0px)`,
            } },
            react_1.default.createElement(SubText_1.SubText, null, { value: spread * i + minX, format: xLabelFormat || 'number-short' })));
    }
    const xLabels = (react_1.default.createElement("div", { style: {
            marginLeft: 100 + 25 + 16,
            marginTop: 8,
            width: graphWidth,
            position: 'relative',
        } }, xLabelsP));
    const yLabelsP = [];
    const labelH = 50;
    const labelYamount = (graphHeight + 50) / labelH;
    const spreadY = (maxY - minY) / labelYamount;
    for (let i = 0; i < labelYamount; i++) {
        // xLabel format
        // yLabel format
        yLabelsP.push(react_1.default.createElement("div", { key: i, style: {
                position: 'absolute',
                transform: `translate3d(0px,${i * labelH}px,0px)`,
                display: 'flex',
                width: 84,
                justifyContent: 'flex-end',
            } },
            react_1.default.createElement(SubText_1.SubText, null, {
                value: maxY - spreadY * i,
                format: yLabelFormat || 'number-short',
            })));
    }
    const yLabels = (react_1.default.createElement("div", { style: {
            marginLeft: 0,
            marginTop: 4,
            position: 'absolute',
        } }, yLabelsP));
    // just make it header
    return (react_1.default.createElement("div", { style: {
            width,
            height,
            // border: '1px solid blue',
        } },
        react_1.default.createElement("div", { style: {
                marginBottom: 16,
            } },
            react_1.default.createElement("div", { style: {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                } },
                react_1.default.createElement(Title_1.Title, { style: {} }, header || ''),
                react_1.default.createElement("div", { style: {
                        display: 'flex',
                        alignItems: 'center',
                    } },
                    react_1.default.createElement(Text_1.Text, null, { value: data[index].time, format: 'date-time-human' }),
                    react_1.default.createElement(Button_1.Button, { style: {
                            marginLeft: 16,
                        }, color: { color: isPlaying ? 'primary' : 'divider' }, icon: 'Expand', onClick: () => {
                            setPlay(!isPlaying);
                        } }))),
            react_1.default.createElement(Slider, { data: data, width: width, isDragging: isDragging, setDragging: setDragging, index: index, setIndex: setIndex })),
        yLabels,
        react_1.default.createElement("div", { style: {
                marginLeft: 100,
                padding: 25,
                width: graphWidth + 50,
                height: graphHeight + 50,
                border: '1px solid ' + theme_1.useColor({ color: 'divider' }),
            } },
            react_1.default.createElement("div", { style: {
                    position: 'relative',
                    width: graphWidth,
                    height: graphHeight,
                    // margin: 100,
                } }, points.map((v, i) => {
                const color = v.color;
                const infoContent = [];
                let tooltip = {};
                if (info) {
                    for (const key in info) {
                        infoContent.push(react_1.default.createElement(Label_1.Label, { key: key, label: info[key].label },
                            react_1.default.createElement(Text_1.Text, null, {
                                format: info[key].format,
                                value: v.info ? v.info[key] : 0,
                            })));
                    }
                    tooltip = useTooltip_1.default(react_1.default.createElement("div", { style: {
                            padding: 24,
                        } }, infoContent), { width: 200 });
                }
                return (react_1.default.createElement("div", { key: v.label, style: {
                        position: 'absolute',
                        transitionTimingFunction: 'linear',
                        transition: isDragging
                            ? 'transform 0.1s, background 0.1s'
                            : 'transform 1s, background 0.15s',
                        transform: `translate3d(${(v.x - minX) * pxRatios[0] - 20}px,${(maxY - v.y) * pxRatios[1] - 20}px,0px)`,
                        top: 0,
                        left: 0,
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        display: 'flex',
                        background: theme_1.useColor(color),
                        boxShadow: '0px 0px 10px ' +
                            theme_1.useColor({ color: 'foreground', opacity: 0.05 }),
                    }, ...tooltip },
                    react_1.default.createElement(Text_1.Text, { noSelect: true, color: {
                            color: color.color !== 'background'
                                ? 'background'
                                : 'foreground',
                        }, weight: "semibold" }, v.label)));
            }))),
        xLabels));
};
const Scatter = (props) => {
    return (react_1.default.createElement(react_virtualized_auto_sizer_1.default, null, ({ height, width }) => {
        return react_1.default.createElement(ScatterInner, { width: width, height: height, ...props });
    }));
};
exports.Scatter = Scatter;
//# sourceMappingURL=index.js.map