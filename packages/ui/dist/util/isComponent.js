"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const isComponent = (children) => typeof children === 'function' || children instanceof react_1.Component;
exports.default = isComponent;
//# sourceMappingURL=isComponent.js.map