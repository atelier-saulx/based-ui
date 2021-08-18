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
exports.isDragging = void 0;
const theme_1 = require("@based/theme");
const react_1 = __importStar(require("react"));
const useSelect_1 = require("../../useSelect");
const Title_1 = require("../../../Components/Text/Title");
const icons_1 = require("@based/icons");
const react_dom_1 = require("react-dom");
const isSafari_1 = __importDefault(require("../../../util/isSafari"));
const dragScroll_1 = __importDefault(require("./dragScroll"));
const setData_1 = __importDefault(require("./setData"));
const utils_1 = require("@saulx/utils");
const drag = {
    cnt: 0,
};
const MultiDragInfo = () => {
    return (react_1.default.createElement("div", { style: {
            borderRadius: 8,
            padding: 25,
            display: 'flex',
            backgroundColor: theme_1.useColor({ color: 'background', tone: 1 }),
        } },
        react_1.default.createElement(icons_1.Add, { style: { marginRight: 10 } }),
        react_1.default.createElement(Title_1.Title, null, "x")));
};
const isDragging = () => {
    if (drag.cnt) {
        return true;
    }
    return false;
};
exports.isDragging = isDragging;
function useDrag(data, ref, props = {}) {
    const [isDrag, setDrag] = react_1.useState(false);
    const endListener = react_1.useRef();
    const isRemoved = react_1.useRef();
    if (!props.style) {
        props.style = {
            // transform does not work on drag image
            backgroundColor: theme_1.useColor({ color: 'background' }),
            maxWidth: '550px',
            border: '1px solid ' +
                theme_1.useColor({ color: 'foreground', tone: 5, opacity: 0.33 }),
        };
    }
    let addRef = false;
    // need this else the ref is removed in this use effect...
    const extraRef = react_1.useRef();
    if (!ref) {
        addRef = true;
        ref = react_1.useRef();
    }
    react_1.useEffect(() => {
        extraRef.current = ref.current;
        return () => {
            if (endListener.current) {
                // nessecary when an item gets removed (else the drag event stops working)
                const el = ref.current || extraRef.current;
                isRemoved.current = el;
                global.requestAnimationFrame(() => {
                    el.style.display = 'none';
                    document.body.appendChild(el);
                });
            }
        };
    }, []);
    const events = {
        draggable: true,
        current: null,
        onDragStart: react_1.useCallback((e) => {
            setDrag(true);
            const t = ref ? ref.current : e.currentTarget;
            const { width, height } = t.getBoundingClientRect();
            drag.cnt++;
            const s = useSelect_1.getSelection();
            const holder = document.createElement('div');
            holder.style.position = 'fixed';
            document.body.appendChild(holder);
            holder.style.top = '0px';
            holder.style.left = '0px';
            let cp;
            if (s.length > 1) {
                react_dom_1.render(react_1.default.createElement(MultiDragInfo, null), holder);
                cp = holder.firstChild;
                cp.children[1].innerHTML = `${s.length} items`;
            }
            else {
                cp = t.cloneNode(true);
                cp.style.position = 'absolute';
                cp.style.width = width;
                cp.style.zIndex = 1000;
                cp.style.height = height;
                cp.style.pointerEvents = 'none';
                if (props.style) {
                    for (const style in props.style) {
                        cp.style[style] = props.style[style];
                    }
                }
                if (props.modifyImageElement) {
                    props.modifyImageElement(cp);
                }
                holder.appendChild(cp);
            }
            // remove the sneaky copy
            global.requestAnimationFrame(() => {
                document.body.removeChild(holder);
            });
            // allow adding file data for example for images
            e.dataTransfer.setDragImage(cp, 0, 0);
            e.dataTransfer.setData('application/based', JSON.stringify(data));
            // need to check to use selection or not
            const useSelection = s.find((ds) => utils_1.deepEqual(ds.data, data.data));
            Promise.all(useSelection
                ? s.filter((s) => !!s.exportData).map((s) => s.exportData(s))
                : [
                    data.exportData
                        ? data.exportData(data)
                        : { text: JSON.stringify(data.data) },
                ]).then(async (v) => {
                await setData_1.default(e.dataTransfer, v);
            });
            let cancelDragScroll;
            if (isSafari_1.default()) {
                cancelDragScroll = dragScroll_1.default(t);
            }
            const end = () => {
                drag.cnt--;
                endListener.current = null;
                document.body.removeEventListener('dragend', end);
                if (!isRemoved.current) {
                    setDrag(false);
                }
                else {
                    document.body.removeChild(isRemoved.current);
                }
                if (cancelDragScroll) {
                    cancelDragScroll();
                }
            };
            endListener.current = true;
            document.body.addEventListener('dragend', end);
        }, [data]),
    };
    if (addRef) {
        events.ref = ref;
    }
    return [events, isDrag];
}
exports.default = useDrag;
//# sourceMappingURL=index.js.map