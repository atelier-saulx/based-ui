"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const SubText_1 = require("../../Text/SubText");
exports.default = ({ labels, labelHeight, valueFormat }) => {
    return labels.map((v, i) => {
        return (react_1.default.createElement("div", { key: i, style: {
                height: labelHeight,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
            } },
            react_1.default.createElement("div", { style: {
                    display: 'flex',
                    justifyContent: 'flex-end',
                } },
                react_1.default.createElement(SubText_1.SubText, { singleLine: true }, { value: v.label, format: valueFormat }))));
    });
};
//# sourceMappingURL=Labels.js.map