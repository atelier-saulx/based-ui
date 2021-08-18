"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProgressContext = exports.ProgressContext = void 0;
const react_1 = require("react");
const cache = {};
exports.ProgressContext = react_1.createContext(null);
const createProgressContext = ({ url, service, }) => {
    if (!url && !service) {
        throw new Error('Upload context needs an url or service ');
    }
    const key = `${url}-${service}`;
    if (!(key in cache)) {
        cache[key] = {
            service,
            url,
            listeners: new Set(),
            items: {},
            inProgress: false,
        };
    }
    return cache[key];
};
exports.createProgressContext = createProgressContext;
//# sourceMappingURL=ProgressContext.js.map