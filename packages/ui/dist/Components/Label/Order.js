"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderLabel = void 0;
const react_1 = __importDefault(require("react"));
const Title_1 = require("../Text/Title");
const theme_1 = require("@based/theme");
// Subtitle
const OrderLabel = ({ style, index, children, color = { color: 'primary' }, Icon, }) => {
    return (react_1.default.createElement("div", { style: {
            display: 'flex',
            ...style,
        } },
        react_1.default.createElement("div", { style: {
                backgroundColor: theme_1.useColor(color),
                paddingLeft: 8,
                paddingRight: 7,
                paddingTop: 6,
                paddingBottom: 6,
                borderRadius: 4,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                position: 'relative',
            } },
            react_1.default.createElement("div", { style: {
                    width: 20,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    position: 'absolute',
                    left: 7.5,
                    top: 0,
                    bottom: 0,
                } },
                react_1.default.createElement(Icon, { color: color })),
            react_1.default.createElement("div", { style: { width: 23 } }),
            react_1.default.createElement(Title_1.Title, { size: "small", color: color }, children || index + 1))));
};
exports.OrderLabel = OrderLabel;
//# sourceMappingURL=Order.js.map