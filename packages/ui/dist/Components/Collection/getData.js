"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getData = (data, path) => {
    let s = data;
    for (let i = 0; i < path.length; i++) {
        if (typeof s !== 'object' || s === null) {
            return undefined;
        }
        s = s[path[i]];
    }
    return s;
};
exports.default = getData;
//# sourceMappingURL=getData.js.map