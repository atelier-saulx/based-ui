"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateTimeInput = void 0;
const react_1 = __importStar(require("react"));
const Date_1 = require("./Date");
const Time_1 = require("./Time");
const DateTimeInput = ({ identifier, value, color, onChange, border, style, useSeconds, }) => {
    const parsedValue = react_1.useMemo(() => value && new Date(value), [value]);
    // TODO: confusing amount of hooks
    const [s, update] = react_1.useReducer((state, action) => {
        if (action.type === 'reset') {
            return action.value;
        }
        else if (action.type === 'time') {
            if (!state) {
                state = new Date();
            }
            if (!action.value) {
                onChange(state.getTime());
                return state;
            }
            const timeInputDate = new Date(action.value);
            state.setHours(timeInputDate.getUTCHours(), timeInputDate.getUTCMinutes(), useSeconds ? timeInputDate.getUTCSeconds() : null);
            onChange(state.getTime());
        }
        else if (action.type === 'date') {
            if (!state) {
                state = new Date();
            }
            if (!action.value) {
                onChange(state.getTime());
                return state;
            }
            const dateInputDate = new Date(action.value);
            state.setDate(dateInputDate.getDate());
            state.setMonth(dateInputDate.getMonth());
            state.setFullYear(dateInputDate.getFullYear());
            onChange(state.getTime());
        }
        return state;
    }, parsedValue);
    const identifierRef = react_1.useRef(identifier);
    const initialValue = react_1.useRef(value);
    react_1.useEffect(() => {
        if (value !== Number(s) && value !== initialValue.current) {
            initialValue.current = value;
            update({ type: 'reset', value: new Date(value) });
        }
        else if (identifierRef.current !== identifier) {
            identifierRef.current = identifier;
            update({ type: 'reset', value: new Date(value) });
        }
        else if (!initialValue.current) {
            initialValue.current = value;
            if (s === undefined && value) {
                update({ type: 'reset', value: new Date(value) });
            }
        }
    }, [value, identifier]);
    if (identifierRef.current !== identifier) {
        identifierRef.current = identifier;
        update({ type: 'reset', value: new Date(value) });
    }
    return (react_1.default.createElement("div", { style: {
            display: 'flex',
            alignItems: 'center',
            ...style,
        } },
        react_1.default.createElement("div", { style: {
                width: 200,
            } },
            react_1.default.createElement(Date_1.DateInput, { color: color, value: s && s.getTime(), style: { marginRight: 20 }, identifier: identifier, border: border, onChange: (value) => {
                    update({
                        // @ts-ignore
                        type: 'date',
                        value,
                    });
                } })),
        react_1.default.createElement("div", { style: {
                width: 135,
            } },
            react_1.default.createElement(Time_1.TimeInput, { color: color, value: s
                    ? new Date().setUTCHours(s.getHours(), s.getMinutes(), s.getSeconds())
                    : null, identifier: identifier, border: border, useSeconds: useSeconds, onChange: (value) => {
                    update({
                        // @ts-ignore
                        type: 'time',
                        value,
                    });
                } }))));
};
exports.DateTimeInput = DateTimeInput;
//# sourceMappingURL=DateTime.js.map