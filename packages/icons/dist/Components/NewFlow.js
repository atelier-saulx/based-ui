"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const theme_1 = require("@based/theme");
const NewFlow = ({ color, framed, size, frameColor, }) => {
    return (react_1.default.createElement("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none" },
        framed ? (react_1.default.createElement("rect", { width: "24", height: "24", rx: "4", fill: theme_1.useColor(frameColor) })) : null,
        react_1.default.createElement("path", { d: "M19.5762 16.464H18.1019V17.6325C18.1019 19.2057 17.2991 20 15.6781 20H4.41606C2.8105 20 2 19.2057 2 17.6325V9.90358C2 8.33031 2.8105 7.53604 4.41606 7.53604H5.89811V6.36754C5.89811 4.79427 6.70861 4 8.31416 4H19.5762C21.1972 4 22 4.79427 22 6.36754V14.0964C22 15.6697 21.1972 16.464 19.5762 16.464ZM19.5608 15.2344C20.3327 15.2344 20.7572 14.822 20.7572 14.0277V6.43628C20.7572 5.642 20.3327 5.22959 19.5608 5.22959H8.33732C7.57314 5.22959 7.14087 5.642 7.14087 6.43628V7.53604H15.6781C17.2991 7.53604 18.1019 8.32267 18.1019 9.90358V15.2344H19.5608ZM15.6627 18.7704C16.4346 18.7704 16.8591 18.358 16.8591 17.5637V9.97232C16.8591 9.17804 16.4346 8.76563 15.6627 8.76563H4.43921C3.67503 8.76563 3.24276 9.17804 3.24276 9.97232V17.5637C3.24276 18.358 3.67503 18.7704 4.43921 18.7704H15.6627ZM10.0587 17.1895C9.64184 17.1895 9.40255 16.9146 9.40255 16.4716V14.4095H7.17947C6.7472 14.4095 6.44616 14.1804 6.44616 13.7757C6.44616 13.3632 6.73176 13.1265 7.17947 13.1265H9.40255V10.927C9.40255 10.4764 9.64184 10.2014 10.0587 10.2014C10.4678 10.2014 10.6916 10.4916 10.6916 10.927V13.1265H12.907C13.3624 13.1265 13.648 13.3632 13.648 13.7757C13.648 14.1804 13.3393 14.4095 12.907 14.4095H10.6916V16.4716C10.6916 16.8993 10.4678 17.1895 10.0587 17.1895Z", fill: theme_1.useColor(color) })));
};
exports.default = NewFlow;
//# sourceMappingURL=NewFlow.js.map