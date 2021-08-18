"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const utils_1 = require("@saulx/utils");
function useInputValue(value, identifier, noExternalUpdate) {
    const [stateValue, setValue] = react_1.useState(value);
    const identifierRef = react_1.useRef(identifier);
    const initialValue = react_1.useRef(value);
    react_1.useEffect(() => {
        if (!utils_1.deepEqual(value, stateValue) &&
            !utils_1.deepEqual(value, initialValue.current) &&
            !noExternalUpdate) {
            initialValue.current = value;
            setValue(value);
        }
        else if (!utils_1.deepEqual(identifierRef.current, identifier)) {
            identifierRef.current = identifier;
            initialValue.current = value;
            setValue(value);
        }
        else if (!initialValue.current) {
            initialValue.current = value;
            if (stateValue === undefined && value) {
                setValue(value);
            }
        }
    }, [value, noExternalUpdate, identifier]);
    return [stateValue, setValue];
}
exports.default = useInputValue;
//# sourceMappingURL=useInputValue.js.map