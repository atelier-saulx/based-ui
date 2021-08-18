"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const text_1 = require("@based/text");
const timeUpdaters = new Set();
let timer;
let smallest;
const setTimer = () => {
    // const d = Date.now()
    const v = smallest;
    const next = v < 60e3 ? 500 : v < 60e3 * 60 ? 30e3 : 60 * 30e3;
    timer = setTimeout(() => {
        const d = Date.now();
        timeUpdaters.forEach((v) => {
            const v2 = d - v.val;
            const next2 = v2 < 60e3 ? 1e3 : v2 < 60e3 * 60 ? 60e3 : 60 * 60e3;
            if (d - v.lastUpdatedTime > next2) {
                v.lastUpdatedTime = d;
                v.fn();
            }
        });
        setTimer();
    }, next);
};
const start = (value) => {
    value = Date.now() - value;
    if (smallest === undefined || value < smallest) {
        smallest = value;
        clearTimeout(timer);
        setTimer();
    }
};
const stop = () => {
    if (timeUpdaters.size === 0) {
        clearTimeout(timer);
        smallest = undefined;
    }
};
exports.default = (children) => {
    let d;
    if (text_1.isTextFormat(children) &&
        children.format === 'date-time-human' &&
        (children.value < (d = Date.now()) + 60 * 60 * 24 || !children.value)) {
        const [, forceUpdate] = react_1.useReducer((x) => x + 1, 0);
        react_1.useEffect(() => {
            let timeUpdater;
            if (text_1.isTextFormat(children) && children.format === 'date-time-human') {
                timeUpdater = {
                    fn: forceUpdate,
                    lastUpdatedTime: d,
                    val: children.value,
                };
                timeUpdaters.add(timeUpdater);
                start(Number(children.value));
            }
            return () => {
                timeUpdaters.delete(timeUpdater);
                stop();
            };
        }, [children]);
    }
};
//# sourceMappingURL=useDate.js.map