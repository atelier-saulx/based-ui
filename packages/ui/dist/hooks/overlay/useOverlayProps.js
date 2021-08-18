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
exports.createOverlayContextRef = exports.OverlayContext = exports.OverlayCtx = void 0;
const react_1 = __importStar(require("react"));
const utils_1 = require("@saulx/utils");
const isComponent_1 = __importDefault(require("../../util/isComponent"));
class OverlayCtx {
    constructor() {
        this.listeners = new Set();
    }
    update(props) {
        const children = props.children;
        if (utils_1.deepEqual(children, this.props && this.props.children)) {
            if (this.props &&
                this.props.children &&
                isComponent_1.default(this.props.children)) {
                if (children.toString() === this.props.children.toString()) {
                    props.children = this.props.children;
                }
            }
        }
        if (!utils_1.deepEqual(this.props, props)) {
            this.props = props;
            global.requestAnimationFrame(() => {
                this.listeners.forEach((v) => {
                    v(props);
                });
            });
        }
    }
    merge(props) {
        this.props = { ...this.props, ...props };
        global.requestAnimationFrame(() => {
            this.listeners.forEach((v) => {
                v(this.props);
            });
        });
    }
}
exports.OverlayCtx = OverlayCtx;
const def = { current: new OverlayCtx() };
exports.OverlayContext = react_1.default.createContext(def);
function createOverlayContextRef(props) {
    const ctx = react_1.useRef(react_1.useMemo(() => {
        return new OverlayCtx();
    }, []));
    if (props) {
        ctx.current.update(props);
    }
    return ctx;
}
exports.createOverlayContextRef = createOverlayContextRef;
function useOverlayProps(p) {
    const ctx = react_1.useContext(exports.OverlayContext);
    if (!ctx || !ctx.current) {
        throw new Error('Cannot useOverlayProps outside of an overlay (missing overlay context)');
    }
    const [props, update] = react_1.useState(ctx.current.props);
    react_1.useEffect(() => {
        ctx.current.listeners.add(update);
        return () => {
            ctx.current.listeners.delete(update);
        };
    }, [update]);
    if (p) {
        return { ...p, ...props };
    }
    return props;
}
exports.default = useOverlayProps;
//# sourceMappingURL=useOverlayProps.js.map