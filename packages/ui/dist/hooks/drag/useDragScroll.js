"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const isSafari_1 = __importDefault(require("../../util/isSafari"));
const setData = (t) => {
    if (t) {
        t.setAttribute('data-dragscroll', 'true');
    }
};
exports.default = isSafari_1.default
    ? (isReactWindow) => {
        if (isReactWindow) {
            return {
                outerRef: setData,
            };
        }
        return {
            dataDragscroll: true,
        };
    }
    : () => { };
//# sourceMappingURL=useDragScroll.js.map