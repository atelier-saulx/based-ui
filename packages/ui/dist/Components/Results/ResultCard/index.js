"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResultCard = void 0;
const react_1 = __importDefault(require("react"));
const Text_1 = require("../../Text");
const Title_1 = require("../../Text/Title");
const theme_1 = require("@based/theme");
const ResultCard = ({ style, label, value, }) => {
    return (react_1.default.createElement("div", { style: {
            width: 212,
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex',
            flexDirection: 'column',
            padding: 10,
            height: 116,
            border: '1px solid ' + theme_1.useColor({ color: 'divider' }),
            ...style,
        } },
        react_1.default.createElement("div", { style: {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            } },
            react_1.default.createElement(Text_1.Text, { singleLine: true, noSelect: true, style: {
                    marginTop: 16,
                    marginBottom: 4,
                } }, label),
            react_1.default.createElement(Title_1.Title, { singleLine: true, noSelect: true, style: {
                    marginBottom: 20,
                }, size: "large" }, { value, format: 'number-short' }))));
};
exports.ResultCard = ResultCard;
//# sourceMappingURL=index.js.map