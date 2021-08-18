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
exports.ExpandableTextInput = void 0;
const react_1 = __importStar(require("react"));
const theme_1 = require("@based/theme");
const icons_1 = require("@based/icons");
require("./style.css");
const Text_1 = require("./Text");
const useHover_1 = __importDefault(require("../../hooks/events/useHover"));
const useDrag_1 = __importDefault(require("../../hooks/drag/useDrag"));
const useDrop_1 = __importDefault(require("../../hooks/drag/useDrop"));
const Toggle_1 = require("./Toggle");
const r = (x) => !x;
const ExpandableTextInput = ({ style, children, optionsIcon, onOptions, draggable, onDrop, expandAllOnShift, data, checkbox, ...props }) => {
    const [isExpanded, setExpanded] = react_1.useReducer(r, false);
    const [hover, isHover] = useHover_1.default();
    const Icon = optionsIcon ? icons_1.iconFromString(optionsIcon) : null;
    const ref = react_1.useRef();
    const [drag, isDragging] = useDrag_1.default({ data }, ref);
    // let hub
    if (expandAllOnShift) {
        console.warn('shift functionality does not work currently (after removing @saulx/hub)');
        // hub = useHub()
        // useEffect(() => {
        //   const flap = (x) => {
        //     setExpanded()
        //   }
        //   hub.on('device.expandAll', flap)
        //   return () => {
        //     hub.removeEventListener('device.expandAll', flap)
        //   }
        // }, [])
    }
    let drop, isDragOver;
    if (onDrop) {
        // @ts-ignore
        ;
        [drop, isDragOver] = useDrop_1.default(onDrop);
    }
    return (react_1.default.createElement("div", { style: {
            ...style,
            position: 'relative',
            borderRadius: '4px',
            background: theme_1.useColor({
                color: 'background',
                tone: isDragging ? 5 : 2,
                opacity: 0.75,
            }),
        }, ...hover, ...drop },
        onDrop ? (react_1.default.createElement("div", { style: {
                position: 'absolute',
                top: -7,
                left: 0,
                right: 0,
                opacity: isDragOver ? 1 : 0,
                transition: 'opacity 0.1s',
                borderBottom: '2px solid ' + theme_1.useColor({ color: 'divider' }),
            } })) : null,
        react_1.default.createElement("div", { style: {
                display: 'flex',
                alignItems: 'center',
                paddingLeft: 10,
            }, ref: ref },
            react_1.default.createElement(icons_1.Expand, { style: {
                    transition: 'transform 0.1s',
                    transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
                }, color: { color: 'foreground' }, onClick: expandAllOnShift
                    ? (e) => {
                        // if (e.shiftKey) {
                        //   // hub.emit('device.expandAll', !isExpanded)
                        // } else {
                        setExpanded();
                        // }
                    }
                    : setExpanded }),
            checkbox ? react_1.default.createElement(Toggle_1.CheckBox, { ...checkbox }) : null,
            react_1.default.createElement(Text_1.Input, { noClear: true, style: {
                    marginLeft: -5,
                }, noBackground: true, noBorder: true, weight: "medium", ...props }),
            Icon ? (react_1.default.createElement(Icon, { color: { color: 'foreground' }, style: { marginRight: 12, opacity: isHover ? 1 : 0 }, onClick: onOptions })) : null,
            draggable ? (react_1.default.createElement(icons_1.Drag, { ...drag, color: { color: 'foreground', tone: 1 }, style: { marginRight: 5, cursor: 'grab', opacity: isHover ? 1 : 0 } })) : null),
        isExpanded ? children || null : null));
};
exports.ExpandableTextInput = ExpandableTextInput;
//# sourceMappingURL=ExpandableTextInput.js.map