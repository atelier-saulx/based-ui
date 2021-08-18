"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const theme_1 = require("@based/theme");
const Dashboard = ({ color, framed, size, frameColor, }) => {
    return (react_1.default.createElement("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none" },
        framed ? (react_1.default.createElement("rect", { width: "24", height: "24", rx: "4", fill: theme_1.useColor(frameColor) })) : null,
        react_1.default.createElement("path", { d: "M17.3438 6C17.6979 6 18.0104 6.13542 18.2812 6.40625C18.5521 6.67708 18.6875 6.98958 18.6875 7.34375V16.6562C18.6875 17.0104 18.5521 17.3229 18.2812 17.5938C18.0104 17.8646 17.6979 18 17.3438 18H7.34375C6.98958 18 6.67708 17.8646 6.40625 17.5938C6.13542 17.3229 6 17.0104 6 16.6562V7.34375C6 6.98958 6.13542 6.67708 6.40625 6.40625C6.67708 6.13542 6.98958 6 7.34375 6H17.3438ZM17.3438 16.7188V7.34375H7.34375V16.7188H17.3438ZM15.6875 15.3438H14.3438V12.6562H15.6875V15.3438ZM13 15.3438H11.6875V8.65625H13V15.3438ZM10.3438 15.3438H9V10.6562H10.3438V15.3438Z", fill: theme_1.useColor(color) })));
};
exports.default = Dashboard;
//# sourceMappingURL=Dashboard.js.map