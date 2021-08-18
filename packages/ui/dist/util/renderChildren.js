"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const isComponent_1 = __importDefault(require("./isComponent"));
function renderChildren(children, props) {
    if (children === undefined) {
        return null;
    }
    const Component = isComponent_1.default(children) ? children : null;
    // @ts-ignore
    return Component ? react_1.default.createElement(Component, { ...props }) : children;
}
exports.default = renderChildren;
//# sourceMappingURL=renderChildren.js.map