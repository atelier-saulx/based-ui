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
const GenericOverlay_1 = require("../../Components/Overlay/GenericOverlay");
const react_1 = __importStar(require("react"));
const useOverlayProps_1 = require("./useOverlayProps");
function useOverlay(component, props, handler, Overlay = GenericOverlay_1.GenericOverlay, options = { transparent: true }) {
    const ctx = useOverlayProps_1.createOverlayContextRef(props);
    return react_1.useCallback((e, selectionProps) => {
        e.stopPropagation();
        e.preventDefault();
        let cancel;
        if (handler) {
            cancel = handler(e);
        }
        const reactNode = (react_1.default.createElement(useOverlayProps_1.OverlayContext.Provider, { value: ctx },
            react_1.default.createElement(Overlay, { Component: component, target: e.currentTarget, ...selectionProps })));
        Overlay_1.addOverlay(reactNode, () => {
            if (cancel)
                cancel();
        }, options);
    }, [ctx]);
}
exports.default = useOverlay;
//# sourceMappingURL=useOverlay.js.map