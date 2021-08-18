"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useKeyDown = exports.useKeyUp = exports.matchKeyCode = void 0;
const react_1 = require("react");
const keyMap = {
    Enter: 13,
    Esc: 27,
    ArrowUp: 38,
    ArrowDown: 40,
    ArrowLeft: 37,
    ArrowRight: 39,
    Tab: 61,
};
class TempEvent {
    constructor(target) {
        this.current = target;
        this.currentTarget = target;
    }
    preventDefault() { }
    stopPropagation() { }
}
const matchKeyCode = (k, e) => {
    const code = e.code || e.key;
    const numberCode = e.keyCode || e.which;
    return (code === k ||
        k === numberCode ||
        (typeof k === 'string' && keyMap[k] === numberCode));
};
exports.matchKeyCode = matchKeyCode;
const useKeyUp = (handler, ref, keycodes) => {
    react_1.useEffect(() => {
        const keyHandler = (e) => {
            if (!keycodes || keycodes.find((k) => exports.matchKeyCode(k, e))) {
                e.preventDefault();
                e.stopPropagation();
                const event = new TempEvent(ref ? ref.current : e.target);
                handler(event);
            }
        };
        document.addEventListener('keyup', keyHandler);
        return () => {
            document.removeEventListener('keyup', keyHandler);
        };
    }, [handler, ref]);
};
exports.useKeyUp = useKeyUp;
const useKeyDown = (handler, ref, keycodes) => {
    react_1.useEffect(() => {
        const keyHandler = (e) => {
            if (!keycodes || keycodes.find((k) => exports.matchKeyCode(k, e))) {
                e.preventDefault();
                e.stopPropagation();
                const event = new TempEvent(ref ? ref.current : e.target);
                handler(event);
            }
        };
        document.addEventListener('keydown', keyHandler);
        return () => {
            document.removeEventListener('keydown', keyHandler);
        };
    }, [handler]);
};
exports.useKeyDown = useKeyDown;
//# sourceMappingURL=useKeyboard.js.map