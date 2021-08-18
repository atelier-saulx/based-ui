"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
exports.default = (onClick) => {
    const [loading, setLoading] = react_1.useState(false);
    const r = react_1.useRef(false);
    react_1.useEffect(() => {
        return () => {
            r.current = true;
        };
    }, []);
    const handler = react_1.useCallback((e) => {
        if (!r.current) {
            setLoading(true);
        }
        const p = onClick(e);
        if (p instanceof Promise) {
            p.then((v) => {
                if (!r.current) {
                    setLoading(false);
                }
            }).catch((v) => {
                if (!r.current) {
                    setLoading(false);
                }
            });
        }
        else {
            if (!r.current) {
                setLoading(false);
            }
        }
    }, [onClick]);
    return [loading, handler];
};
//# sourceMappingURL=useAsyncClick.js.map