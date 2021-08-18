"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const SubText_1 = require("../../Text/SubText");
const XAxis = ({ maxX, minX, format, width }) => {
    const d = maxX - minX;
    const amount = Math.floor(width / 150);
    const rW = width / amount;
    const c = [];
    for (let i = 0; i < amount; i++) {
        if (format === 'date-time-human') {
            const x = (d * (i + 1)) / amount + minX;
            c.push({ value: x, format: 'date-time-human' });
        }
        else if (format === 'date') {
            // (d * i) / amount
            const x = (d * (i + 1)) / amount + minX;
            c.push([
                { value: x, format: 'time-precise' },
                ' - ',
                { value: x, format: 'date' },
            ]);
        }
        else {
            c.push({ value: (d * (i + 1)) / amount + minX, format: 'number-short' });
        }
    }
    return (react_1.default.createElement("div", { style: {
            display: 'flex',
        } }, c.map((v, i) => {
        return (react_1.default.createElement("div", { key: i, style: {
                minWidth: rW,
                display: 'flex',
                justifyContent: 'flex-start',
                paddingTop: 15,
            } },
            react_1.default.createElement(SubText_1.SubText, null, v)));
    })));
};
exports.default = XAxis;
//# sourceMappingURL=XAxis.js.map