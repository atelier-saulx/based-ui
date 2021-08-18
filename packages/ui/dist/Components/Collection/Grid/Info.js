"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const __1 = require("../../..");
exports.default = ({ data }) => {
    const values = [].concat(data);
    return (react_1.default.createElement("div", { style: { display: 'flex', alignItems: 'center', marginTop: 5 } }, values.map((value, index) => {
        return (react_1.default.createElement(__1.SubText, { key: index, singleLine: true, style: {
                marginRight: 5,
            }, color: { color: 'foreground', tone: 2 } }, value));
    })));
};
//# sourceMappingURL=Info.js.map