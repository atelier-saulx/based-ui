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
const useHover_1 = __importDefault(require("../../../hooks/events/useHover"));
const useThrottledCallback_1 = __importDefault(require("../../../hooks/useThrottledCallback"));
const Shared_1 = require("../../Overlay/Shared");
const SubText_1 = require("../../Text/SubText");
const Text_1 = require("../../Text");
const _1 = require(".");
const OverlayNested = ({ isHover, x, xInfo, p, selected, legend, isStacked, valueFormat, }) => {
    let extraInfo = null;
    if (isStacked) {
        const [selectedKey, setSelected] = react_1.useState('');
        const ctx = react_1.useContext(_1.GraphContext);
        ctx.hover = setSelected;
        extraInfo = (react_1.default.createElement("div", { style: {
                marginTop: 10,
            } }, selectedKey ? (react_1.default.createElement("div", { style: {
                marginTop: 12,
                paddingTop: 12,
                borderTop: '1px solid ' + theme_1.useColor({ color: 'divider' }),
            } },
            react_1.default.createElement(Text_1.Text, { weight: "semibold" }, legend ? legend[selectedKey] : selectedKey),
            react_1.default.createElement("div", { style: {
                    display: 'flex',
                    justifyContent: 'space-between',
                } },
                react_1.default.createElement(Text_1.Text, null, {
                    value: selected.segments[selectedKey],
                    format: valueFormat || 'number-short',
                }),
                react_1.default.createElement(Text_1.Text, { color: { color: 'primary' } },
                    Math.round((selected.segments[selectedKey] / selected.y) * 100),
                    "%")))) : null));
    }
    return (react_1.default.createElement("div", { style: {
            opacity: x && isHover ? 1 : 0,
            transition: 'opacity 0.5s',
            transform: x
                ? `translate3d(${p.x}px,0px,0px)`
                : 'translate3d(0px,0px,0px)',
            width: '1px',
            height: '100%',
            backgroundColor: theme_1.useColor({ color: 'foreground' }),
        } },
        react_1.default.createElement("div", { style: {
                position: 'relative',
                transform: `translate3d(${-7.5}px, ${p.y - 7.5}px, 0px)`,
            } },
            react_1.default.createElement("div", { style: {
                    borderRadius: '50%',
                    width: 15,
                    border: '2px solid ' + theme_1.useColor({ color: 'foreground' }),
                    backgroundColor: theme_1.useColor({ color: 'background' }),
                    height: 15,
                } }),
            react_1.default.createElement(Shared_1.InnerShared, { style: {
                    position: 'absolute',
                    left: 24,
                    top: -30,
                    minWidth: isStacked && extraInfo ? 175 : 100,
                }, width: "auto" },
                react_1.default.createElement("div", { style: {
                        paddingLeft: 10,
                        paddingRight: 10,
                        paddingTop: 5,
                        paddingBottom: 5,
                    } },
                    react_1.default.createElement(SubText_1.SubText, { singleLine: true }, xInfo),
                    react_1.default.createElement(Text_1.Text, { weight: "semibold" }, { value: selected.y, format: valueFormat || 'number-short' }),
                    extraInfo)))));
};
const getY = (x, width, r, isHover, data, format, isStacked, legend, valueFormat) => {
    let u = x / width;
    const s = Math.floor(u * data.length);
    if (u < 0) {
        return null;
    }
    const selected = data[s];
    let curve = r.current.curve;
    if (!curve) {
        for (let i = 0; i < r.current.children.length; i++) {
            const c = r.current.children[i];
            if (c.getAttribute('data') === 'line') {
                curve = c;
                r.current.curve = c;
                break;
            }
        }
    }
    if (curve && selected) {
        const totalLength = curve.getTotalLength();
        if (!totalLength) {
            return null;
        }
        let tries = 4;
        let p;
        while (tries) {
            p = curve.getPointAtLength(u * totalLength);
            if (p.x < x) {
                u = u * (x / p.x);
            }
            else if (p.x > x) {
                u = u * (x / p.x);
            }
            tries--;
        }
        let xInfo;
        if (format === 'date' || format === 'date-time-human') {
            xInfo = [
                { value: selected.x, format: 'time-precise' },
                ' - ',
                { value: selected.x, format: 'date' },
            ];
        }
        else {
            xInfo = 'x: ' + selected.x;
        }
        return (react_1.default.createElement(OverlayNested, { legend: legend, isStacked: isStacked, isHover: isHover, x: x, p: p, xInfo: xInfo, selected: selected, valueFormat: valueFormat }));
    }
    return null;
};
const Overlay = ({ isHover, x, width, data, r, format, isStacked, legend, valueFormat, }) => {
    return (react_1.default.createElement("div", { style: {
            pointerEvents: 'none',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
        } }, x
        ? getY(x, width, r, isHover, data, format, isStacked, legend, valueFormat)
        : null));
};
exports.default = ({ width, height, labelHeight, labels, children, data, isStacked, legend, valueFormat, format, }) => {
    // need format
    const [x, setCoord] = react_1.useState();
    const [hover, isHover] = useHover_1.default();
    const ref = react_1.useRef();
    return (react_1.default.createElement("div", { style: {
            width,
            height,
            position: 'relative',
        }, 
        // @ts-ignore
        onMouseMove: useThrottledCallback_1.default((e) => {
            const { x } = e.currentTarget.getBoundingClientRect();
            // @ts-ignore
            setCoord(e.pageX - x);
        }, []), ...hover },
        react_1.default.createElement("svg", { ref: ref, viewBox: `0 0 ${width} ${height}`, width: width, height: height, style: {
                borderBottom: '2px solid ' + theme_1.useColor({ color: 'primary', tone: 5 }),
            } },
            labels.map((v, i) => {
                const y = (i + 1) * labelHeight - 9;
                return (react_1.default.createElement("path", { key: i, d: `M0,${y}L${width},${y}`, stroke: theme_1.useColor({
                        color: 'divider',
                    }) }));
            }),
            children),
        react_1.default.createElement(Overlay, { valueFormat: valueFormat, isStacked: isStacked, legend: legend, format: format, isHover: isHover, x: x, width: width, data: data, r: ref })));
};
//# sourceMappingURL=OverlayWrapper.js.map