"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Label = void 0;
const react_1 = __importDefault(require("react"));
const _1 = require("./");
const Label = ({ children, label, }) => {
    return (react_1.default.createElement("div", { style: {
            marginBottom: 24,
        } },
        react_1.default.createElement(_1.Text, { style: {
                marginBottom: 8,
            }, weight: "semibold" }, label),
        children));
};
exports.Label = Label;
//# sourceMappingURL=Label.js.map