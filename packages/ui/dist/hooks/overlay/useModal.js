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
const Overlay_1 = require("../../Components/Overlay");
const Modal_1 = require("../../Components/Overlay/Modal");
const useOverlayProps_1 = require("./useOverlayProps");
const react_1 = __importStar(require("react"));
exports.default = (children, props = {}) => {
    const ctx = useOverlayProps_1.createOverlayContextRef({ children, ...props });
    react_1.useEffect(() => {
        if (ctx.current.timer) {
            clearTimeout(ctx.current.timer);
        }
    }, []);
    return react_1.useCallback((e, extraProps) => {
        e.preventDefault();
        e.stopPropagation();
        const modal = (react_1.default.createElement(useOverlayProps_1.OverlayContext.Provider, { value: ctx },
            react_1.default.createElement(Modal_1.Modal, { ...props, ...extraProps, onClose: () => {
                    Overlay_1.removeOverlay(modal);
                    if (props.onClose)
                        props.onClose();
                } }, children)));
        Overlay_1.addOverlay(modal, () => {
            if (props.onClose)
                props.onClose();
        });
        return true;
    }, [ctx]);
};
//# sourceMappingURL=useModal.js.map