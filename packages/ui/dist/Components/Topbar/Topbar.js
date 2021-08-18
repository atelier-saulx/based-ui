"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Topbar = void 0;
const react_1 = __importDefault(require("react"));
const theme_1 = require("@based/theme");
const renderChildren_1 = __importDefault(require("../../util/renderChildren"));
const Topbar = ({ children, style }) => {
    return (react_1.default.createElement("div", { style: {
            paddingTop: 12.5,
            paddingBottom: 12.5,
            paddingLeft: 15,
            paddingRight: 15,
            height: 60,
            minHeight: 60,
            maxHeight: 60,
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'space-between',
            borderBottom: '1px solid ' + theme_1.useColor({ color: 'divider' }),
            ...style,
        } }, renderChildren_1.default(children, {})));
};
exports.Topbar = Topbar;
//# sourceMappingURL=Topbar.js.map