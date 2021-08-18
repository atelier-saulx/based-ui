"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const theme_1 = require("@based/theme");
const WaitingScreen = ({ color, framed, size, frameColor, }) => {
    return (react_1.default.createElement("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none" },
        framed ? (react_1.default.createElement("rect", { width: "24", height: "24", rx: "4", fill: theme_1.useColor(frameColor) })) : null,
        react_1.default.createElement("path", { d: "M8.19472 19H15.7277C16.5267 19 16.9922 18.5741 17 17.7529V17.5551C17.0077 15.4563 14.7191 13.7529 13.7261 12.8251C13.4468 12.5665 13.2994 12.3308 13.2994 11.9886C13.2994 11.6464 13.4391 11.4183 13.7261 11.1521C14.7191 10.2091 17 8.61217 17 6.42966V6.24715C17 5.42586 16.5267 5 15.7277 5H8.19472C7.42669 5 7 5.42586 7 6.17871V6.42966C7 8.61217 9.28083 10.2091 10.2738 11.1521C10.5609 11.4183 10.7005 11.6464 10.7005 11.9886C10.7005 12.3308 10.5609 12.5665 10.2738 12.8251C9.28083 13.7529 7 15.4563 7 17.5551V17.8213C7 18.5741 7.42669 19 8.19472 19ZM9.00155 17.9582C8.63692 17.9582 8.52056 17.5551 8.87742 17.289L11.5384 15.3498C11.6237 15.2814 11.6703 15.2357 11.6703 15.1217V11.4639C11.6703 11.0532 11.5772 10.8479 11.2901 10.6046C10.8402 10.2395 10.0101 9.6616 9.62218 9.13688C9.46702 8.92395 9.4903 8.74905 9.68425 8.74905H14.3157C14.5097 8.74905 14.5252 8.92395 14.37 9.13688C13.9899 9.6616 13.152 10.2395 12.7098 10.6046C12.4073 10.8479 12.3297 11.0532 12.3297 11.4639V15.1217C12.3297 15.2357 12.3763 15.2814 12.4616 15.3498L15.1148 17.289C15.4794 17.5551 15.3631 17.9582 14.9907 17.9582H9.00155Z", fill: theme_1.useColor(color) })));
};
exports.default = WaitingScreen;
//# sourceMappingURL=WaitingScreen.js.map