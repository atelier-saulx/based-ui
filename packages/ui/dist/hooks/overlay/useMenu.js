"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Menu_1 = require("../../Components/Overlay/Menu");
const useOverlay_1 = __importDefault(require("./useOverlay"));
function useMenu(component, props, handler) {
    return useOverlay_1.default(component, props, handler, Menu_1.Menu);
}
exports.default = useMenu;
//# sourceMappingURL=useMenu.js.map