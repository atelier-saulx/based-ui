"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenericOverlay = void 0;
const react_1 = __importDefault(require("react"));
const useOverlayPosition_1 = __importDefault(require("../../hooks/overlay/useOverlayPosition"));
const useOverlayProps_1 = __importDefault(require("../../hooks/overlay/useOverlayProps"));
const Shared_1 = __importDefault(require("./Shared"));
const Text_1 = require("../Text");
const GenericOverlay = ({ Component, ...selectionProps }) => {
    const props = useOverlayProps_1.default(selectionProps);
    const [elementRef, position, resize] = useOverlayPosition_1.default(props);
    let body;
    if (!Component) {
        const type = typeof props.children;
        if (type === 'string' || type === 'number') {
            body = (react_1.default.createElement("div", { style: {
                    width: '100%',
                    paddingLeft: 15,
                    paddingRight: 15,
                } },
                react_1.default.createElement(Text_1.Text, { weight: "medium", singleLine: true }, props.children)));
        }
        else {
            body = props.children;
        }
    }
    else {
        body = react_1.default.createElement(Component, {
            resize,
            position,
            ...props,
        });
    }
    return (react_1.default.createElement(Shared_1.default, { width: typeof props.width !== 'function' ? props.width : null, ref: elementRef, position: position, align: props.align }, body));
};
exports.GenericOverlay = GenericOverlay;
//# sourceMappingURL=GenericOverlay.js.map