"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const useDrag_1 = require("../drag/useDrag");
const useHover = (onHover) => {
    const [isHover, setHover] = react_1.useState(false);
    const [isActive, setActive] = react_1.useState(false);
    const handleMouseOver = react_1.useCallback((e) => {
        if (!useDrag_1.isDragging()) {
            setHover(true);
            if (onHover) {
                onHover(e);
            }
        }
    }, []);
    const handleMouseOut = react_1.useCallback(() => setHover(false), []);
    const handleDown = react_1.useCallback(() => setActive(true), []);
    const handleUp = react_1.useCallback(() => setActive(false), []);
    return [
        {
            onMouseDown: handleDown,
            onMouseUp: handleUp,
            onMouseEnter: handleMouseOver,
            onMouseLeave: handleMouseOut,
            onDragStart: handleMouseOut,
        },
        isHover,
        isActive,
    ];
};
exports.default = useHover;
//# sourceMappingURL=useHover.js.map