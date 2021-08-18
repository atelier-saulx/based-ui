"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const selectSelf = (t) => t;
// @ts-ignore
const xCalculation = ({ left, x }) => {
    return left === undefined ? x : left;
};
// @ts-ignore
const yCalculation = ({ top, height, y }) => (top === undefined ? y : top) + height + 10;
const maxYCalculation = (y, elem) => {
    const maxH = global.innerHeight - 30;
    if (y + elem.height > maxH) {
        const over = y + elem.height - maxH;
        return y - over;
    }
    return y;
};
const maxXCalculation = (x, elem, align, _rect, pos) => {
    let w = elem.width;
    if (typeof pos.width === 'number') {
        w = pos.width;
    }
    const maxW = global.innerWidth - 30;
    if (align === 'flex-end') {
        const diff = pos.containerWidth - w;
        if (x + diff < 15) {
            x = -1 * diff + 15;
        }
    }
    else if (align === 'center') {
        const diff = pos.containerWidth - w;
        if (x + diff < 15) {
            x = (-1 * diff) / 2 + 15;
        }
        const actualW = (-1 * diff) / 2 + pos.containerWidth;
        if (x + actualW > maxW) {
            const over = x + actualW - maxW;
            x = x - over + 12.5;
        }
    }
    else {
        if (x + w > maxW) {
            const over = x + w - maxW;
            x = x - over + 12.5;
        }
    }
    if (x < 15) {
        return 15;
    }
    return x;
};
const getTargetRect = (target, selectTarget) => {
    const t = selectTarget(target);
    // @ts-ignore
    if (t.getBoundingClientRect) {
        // @ts-ignore
        return t.getBoundingClientRect();
    }
    return { left: 0, top: 0, height: 0, width: 0, bottom: 0, right: 0 };
};
exports.default = ({ target, selectTarget = selectSelf, width = 'auto', x = xCalculation, y = yCalculation, maxY = maxYCalculation, maxX = maxXCalculation, align = 'center', }) => {
    const elementRef = react_1.useRef();
    const [position, setPosition] = react_1.useState();
    const [sizeForceUpdate, resize] = react_1.useReducer((x) => x + 1, 0);
    react_1.useEffect(() => {
        const calcSize = () => {
            const rect = target.rect || getTargetRect(target, selectTarget);
            const elementRect = elementRef.current.getBoundingClientRect();
            const pos = {};
            pos.elementRect = elementRect;
            pos.targetRect = rect;
            pos.width =
                typeof width === 'function' ? width(rect, elementRect, align) : width;
            pos.containerWidth = rect.width;
            const calcedX = typeof x === 'function' ? x(rect, elementRect, align) : x;
            const calcedY = typeof y === 'function' ? y(rect, elementRect, align) : y;
            pos.x =
                typeof maxX === 'function'
                    ? maxX(calcedX, elementRect, align, rect, pos)
                    : Math.min(maxX, calcedX);
            pos.y =
                typeof maxY === 'function'
                    ? maxY(calcedY, elementRect, align, rect, pos)
                    : Math.min(maxY, calcedY);
            pos.bottom = null;
            if (pos.y < rect.top) {
                pos.spaceOnTop = true;
                const windowHeight = global.innerHeight;
                if (15 + elementRef.current.scrollHeight > rect.top) {
                    if (elementRect.height > windowHeight - 40) {
                        pos.bottom = null;
                    }
                }
                else {
                    pos.bottom = windowHeight - rect.top + 15;
                }
                pos.y = 15;
            }
            else {
                pos.spaceOnTop = false;
            }
            setPosition(pos);
        };
        calcSize();
        global.addEventListener('resize', calcSize);
        return () => {
            global.removeEventListener('resize', calcSize);
        };
    }, [target, sizeForceUpdate]);
    return [elementRef, position, resize];
};
//# sourceMappingURL=useOverlayPosition.js.map