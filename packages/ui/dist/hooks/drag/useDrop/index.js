"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const useSelect_1 = require("../../useSelect");
const readFiles_1 = __importDefault(require("./readFiles"));
const utils_1 = require("@saulx/utils");
const preventDefault = (e) => e.preventDefault();
const defValidate = () => true;
const useDrop = (onDrop, props = {}) => {
    const [isDragOver, setDragOver] = react_1.useState(false);
    const ref = react_1.useRef(null);
    const ref2 = react_1.useRef(null);
    const [isDropLoading, setDropLoading] = react_1.useState(false);
    if (!props.validate) {
        props.validate = defValidate;
    }
    return [
        {
            onDragEnter: react_1.useCallback((e) => {
                if (!ref.current) {
                    ref.current = 0;
                }
                ref.current++;
                if (props.validate(e)) {
                    setDragOver(true);
                }
            }, []),
            onDragLeave: react_1.useCallback((e) => {
                ref.current--;
                if (ref.current === 0) {
                    setDragOver(false);
                }
            }, []),
            onDragOver: preventDefault,
            onDrop: react_1.useCallback((e) => {
                if (ref2.current === e.nativeEvent) {
                    // do nothing
                }
                else {
                    e.preventDefault();
                    const ev = e.nativeEvent;
                    ref2.current = ev;
                    const t = e.target;
                    if (props.validate(e)) {
                        ref.current = 0;
                        setDragOver(false);
                        if (onDrop) {
                            const dx = e.dataTransfer.getData('application/based');
                            let d;
                            let data;
                            if (dx) {
                                d = JSON.parse(dx);
                                const s = useSelect_1.getSelection();
                                const useSelection = s.find((ds) => utils_1.deepEqual(ds.data, d.data));
                                if (useSelection) {
                                    data = s;
                                    useSelect_1.clearSelection();
                                }
                                else {
                                    data = [d];
                                }
                            }
                            let p;
                            setDropLoading(true);
                            if (props.readFiles) {
                                e.stopPropagation();
                                readFiles_1.default(e.dataTransfer).then((files) => {
                                    if (data) {
                                        p = onDrop(e, { files, data });
                                    }
                                    else {
                                        p = onDrop(e, { files });
                                    }
                                    if (p instanceof Promise) {
                                        p.then((v) => {
                                            setDropLoading(false);
                                            global.requestAnimationFrame(() => {
                                                t.dispatchEvent(ev);
                                            });
                                        });
                                    }
                                    else {
                                        setDropLoading(false);
                                        global.requestAnimationFrame(() => {
                                            t.dispatchEvent(ev);
                                        });
                                    }
                                });
                            }
                            else {
                                if (data) {
                                    p = onDrop(e, { data, files: [] });
                                }
                                else {
                                    p = onDrop(e, { files: [] });
                                }
                                if (p instanceof Promise) {
                                    e.stopPropagation();
                                    p.then((v) => {
                                        setDropLoading(false);
                                        global.requestAnimationFrame(() => {
                                            t.dispatchEvent(ev);
                                        });
                                    });
                                }
                                else {
                                    setDropLoading(false);
                                }
                            }
                        }
                    }
                }
            }, [onDrop]),
        },
        isDragOver,
        isDropLoading,
    ];
};
exports.default = useDrop;
//# sourceMappingURL=index.js.map