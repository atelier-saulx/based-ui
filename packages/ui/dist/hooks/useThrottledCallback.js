"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const isEventCheck = (e) => {
    return !!e;
    // return (
    //   (e &&
    //     (e.constructor.name === 'SyntheticBaseEvent' ||
    //       e.constructor.name === 'SyntheticEvent')) ||
    //   e instanceof Event
    // )
};
exports.default = (fn, refs = [], frames = 1) => {
    const ref = react_1.useRef(null);
    react_1.useEffect(frames > 1
        ? () => () => {
            if (ref.current) {
                global.cancelAnimationFrame(ref.current.timer);
                ref.current = false;
            }
        }
        : () => () => {
            if (ref.current) {
                global.cancelAnimationFrame(ref.current);
                ref.current = false;
            }
        });
    const throttledFn = react_1.useCallback(frames > 1
        ? (e, data, t) => {
            let isEvent = false;
            if (isEventCheck(e)) {
                if (!t)
                    t = e.currentTarget;
                if (e.persists) {
                    e.persist();
                }
                isEvent = true;
            }
            if (!ref.current) {
                const throttle = () => {
                    ref.current.frames--;
                    if (ref.current.frames === 0) {
                        if (isEvent) {
                            e.currentTarget = t;
                        }
                        ref.current = false;
                        fn(e, data);
                    }
                    else {
                        ref.current.timer = global.requestAnimationFrame(throttle);
                    }
                };
                ref.current = {
                    timer: global.requestAnimationFrame(throttle),
                    frames,
                };
            }
        }
        : (e, data) => {
            let isEvent = false;
            let t;
            if (isEventCheck(e)) {
                isEvent = true;
                t = e.currentTarget;
                if (e.persists) {
                    e.persist();
                }
            }
            if (!ref.current) {
                ref.current = global.requestAnimationFrame(() => {
                    ref.current = false;
                    if (isEvent) {
                        e.currentTarget = t;
                    }
                    fn(e, data);
                });
            }
        }, refs);
    return throttledFn;
};
//# sourceMappingURL=useThrottledCallback.js.map