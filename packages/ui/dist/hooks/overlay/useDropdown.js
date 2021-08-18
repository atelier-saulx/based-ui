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
const Dropdown_1 = require("../../Components/Overlay/Dropdown");
const react_1 = __importStar(require("react"));
const useOverlayProps_1 = require("./useOverlayProps");
const findOptionIndex = (options, option) => {
    return options.findIndex((o) => {
        return Dropdown_1.dropdownOptionIsEqual(option, o);
    });
};
exports.default = (items, onSelect, value, props = {}, handler) => {
    const ctx = useOverlayProps_1.createOverlayContextRef({
        value,
        items,
        ...props,
    });
    return react_1.useCallback((e, extraProps) => {
        e.preventDefault();
        e.stopPropagation();
        const cancel = handler && handler();
        const dropdown = (react_1.default.createElement(useOverlayProps_1.OverlayContext.Provider, { value: ctx },
            react_1.default.createElement(Dropdown_1.Dropdown, { filter: props.filter, value: value, 
                // @ts-ignore
                target: e.currentTarget, items: items, onChange: (option, index) => {
                    if (ctx.current.props.multi) {
                        let value = ctx.current.props.value;
                        if (!Array.isArray(value)) {
                            value = [];
                        }
                        const index = findOptionIndex(value, option);
                        value = [...value];
                        if (index !== -1) {
                            value.splice(index, 1);
                        }
                        else {
                            value.push(option);
                        }
                        onSelect(value, value.map((v) => findOptionIndex(ctx.current.props.items, v)));
                        ctx.current.update({ ...ctx.current.props, value });
                    }
                    else {
                        Overlay_1.removeOverlay(dropdown);
                        ctx.current.update({ ...ctx.current.props, value: option });
                        onSelect(option, index);
                    }
                }, ...props, ...extraProps })));
        Overlay_1.addOverlay(dropdown, cancel, { transparent: true });
        return true;
    }, [ctx]);
};
//# sourceMappingURL=useDropdown.js.map