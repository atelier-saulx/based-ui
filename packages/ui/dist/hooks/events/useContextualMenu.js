"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const useContextualMenu = (fn) => {
    const eventHandler = react_1.useCallback((e) => {
        if (e.type === 'contextmenu') {
            e.preventDefault();
            // make this cleaner
            // special value to override using current target in overlay
            e.currentTarget.rect = {
                x: e.pageX,
                y: e.pageY,
                width: 0,
                height: 0,
            };
            fn(e);
        }
    }, []);
    return {
        onClick: eventHandler,
        onContextMenu: eventHandler,
    };
};
exports.default = useContextualMenu;
//# sourceMappingURL=useContextualMenu.js.map