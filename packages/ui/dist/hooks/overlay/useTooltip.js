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
const useOverlayProps_1 = require("./useOverlayProps");
const GenericOverlay_1 = require("../../Components/Overlay/GenericOverlay");
const react_1 = __importStar(require("react"));
function useTooltip(children, props = {}, handler) {
    const ctx = useOverlayProps_1.createOverlayContextRef({ children, ...props });
    react_1.useEffect(() => {
        if (ctx.current.timer) {
            clearTimeout(ctx.current.timer);
        }
    }, []);
    return {
        onMouseEnter: react_1.useCallback((e, data) => {
            // @ts-ignore
            if (ctx.children === null) {
                return null;
            }
            let cancel;
            let tooltip;
            if (handler) {
                cancel = handler(e);
            }
            const target = e.currentTarget;
            const removeListeners = () => {
                clearTimeout(ctx.current.timer);
                target.removeEventListener('mouseleave', leave);
                target.removeEventListener('click', leave);
            };
            const leave = () => {
                removeListeners();
                clearTimeout(ctx.current.timer);
                if (tooltip)
                    Overlay_1.removeOverlay(tooltip);
            };
            target.addEventListener('mouseleave', leave);
            target.addEventListener('click', leave);
            ctx.current.timer = setTimeout(() => {
                tooltip = (react_1.default.createElement(useOverlayProps_1.OverlayContext.Provider, { value: ctx },
                    react_1.default.createElement(GenericOverlay_1.GenericOverlay, { target: target, ...props, ...data }, children)));
                Overlay_1.addOverlay(tooltip, () => {
                    removeListeners();
                    if (cancel)
                        cancel();
                }, { overlay: false });
            }, props.initialTimer || 500);
        }, [ctx]),
    };
}
exports.default = useTooltip;
//# sourceMappingURL=useTooltip.js.map