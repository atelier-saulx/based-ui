"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const useWindowSize = typeof window !== 'undefined'
    ? () => {
        const [pos, update] = react_1.useState({
            width: global.innerWidth || 0,
            height: global.innerHeight || 0,
        });
        react_1.useEffect(() => {
            const handler = () => {
                update({
                    width: global.innerWidth || 0,
                    height: global.innerHeight || 0,
                });
            };
            global.addEventListener('resize', handler);
            return () => {
                global.removeEventListener('resize', handler);
            };
        }, []);
        return pos;
    }
    : () => {
        return { width: 0, height: 0 };
    };
exports.default = useWindowSize;
//# sourceMappingURL=useWindowSize.js.map