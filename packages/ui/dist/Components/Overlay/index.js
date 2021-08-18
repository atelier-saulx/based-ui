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
Object.defineProperty(exports, "__esModule", { value: true });
exports.notify = exports.removeAllOverlays = exports.removeOverlay = exports.addOverlay = exports.Overlay = void 0;
const react_1 = __importStar(require("react"));
const theme_1 = require("@based/theme");
const useNotifications_1 = require("./useNotifications");
Object.defineProperty(exports, "notify", { enumerable: true, get: function () { return useNotifications_1.notify; } });
let listeners = [];
let overlays = [];
const OverlayItem = ({ children, options, }) => {
    const ref = react_1.useRef();
    const [visible, setVisible] = react_1.useState(false);
    react_1.useEffect(() => {
        setVisible(true);
    }, [setVisible]);
    const hidden = options && options.overlay === false;
    const transparent = options && options.transparent;
    return (react_1.default.createElement("div", { ref: ref, style: {
            opacity: visible ? 1 : 0,
            transition: 'opacity 0.15s',
            // backdropFilter: 'blur(4px)',
            backgroundColor: hidden || transparent
                ? null
                : theme_1.useColor({ color: 'foreground', tone: 4, opacity: 0.5 }),
            width: '100vw',
            position: 'fixed',
            top: 0,
            left: 0,
            height: '100vh',
            pointerEvents: hidden ? 'none' : 'all',
        }, onMouseDown: hidden
            ? null
            : react_1.useCallback((e) => {
                if (e.target === ref.current) {
                    setVisible(false);
                    setTimeout(() => {
                        removeOverlay(children);
                    }, 150);
                }
            }, []) }, children));
};
const Overlay = () => {
    const [, update] = react_1.useReducer((x) => x + 1, 0);
    const notifictions = useNotifications_1.useNotifications({ update });
    react_1.useEffect(() => {
        listeners.push(update);
        const remove = (e) => {
            if (e.code === 'Esc' || e.keyCode === 27) {
                removeOverlay();
            }
        };
        document.addEventListener('keydown', remove);
        return () => {
            document.removeEventListener('keydown', remove);
            listeners = listeners.filter((u) => u !== update);
        };
    }, []);
    return (react_1.default.createElement("div", { style: {
            position: 'fixed',
            zIndex: 1,
            top: 0,
            left: 0,
        } },
        overlays.map((c, i) => {
            return (react_1.default.createElement(OverlayItem, { key: i, options: c[2] }, c[0]));
        }),
        notifictions));
};
exports.Overlay = Overlay;
const addOverlay = (overlay, onClose = () => { }, options) => {
    overlays.push([overlay, onClose, options]);
    listeners.forEach((update) => update());
};
exports.addOverlay = addOverlay;
const removeAllOverlays = () => {
    overlays.forEach(([, onClose]) => {
        if (onClose) {
            onClose();
        }
    });
    overlays = [];
    listeners.forEach((update) => update());
};
exports.removeAllOverlays = removeAllOverlays;
const removeOverlay = (overlay) => {
    if (!overlay) {
        if (overlays.length) {
            const [, onClose] = overlays.pop();
            if (onClose) {
                onClose();
            }
        }
    }
    else {
        const index = overlays.findIndex((o) => o[0] === overlay);
        if (index !== -1) {
            const [, onClose] = overlays[index];
            if (onClose) {
                onClose();
            }
            overlays.splice(index, 1);
        }
    }
    listeners.forEach((update) => update());
};
exports.removeOverlay = removeOverlay;
//# sourceMappingURL=index.js.map