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
exports.useSelect = exports.useClick = exports.clearSelection = exports.useSelection = exports.getSelection = exports.selection = exports.SelectableCollection = exports.SelectionContext = void 0;
const react_1 = __importStar(require("react"));
const addListeners = () => {
    document.addEventListener('click', (e) => {
        if (!e.shiftKey) {
            exports.clearSelection();
        }
    });
    document.addEventListener('keyup', (e) => {
        if (e.code === 'Esc' || e.keyCode === 27) {
            exports.clearSelection();
        }
    });
};
if (typeof window !== 'undefined') {
    addListeners();
}
const defCtx = {
    data: [],
    children: {},
    selection: new Set(),
};
exports.SelectionContext = react_1.createContext(defCtx);
exports.SelectionContext.displayName = 'SelectionContext';
const SelectableCollection = ({ children, items }) => {
    // @ts-ignore
    return (react_1.default.createElement(exports.SelectionContext.Provider, { value: {
            data: items,
            children: {},
            selection: new Set(),
        } }, children));
};
exports.SelectableCollection = SelectableCollection;
exports.selection = new Map();
const getSelection = () => {
    return [...exports.selection.keys()];
};
exports.getSelection = getSelection;
const selectListeners = new Set();
const useSelection = () => {
    const [s, setSelection] = react_1.useState(exports.getSelection());
    react_1.useEffect(() => {
        const listener = (s) => {
            setSelection(s);
        };
        selectListeners.add(listener);
        return () => {
            selectListeners.delete(listener);
        };
    }, []);
    return s;
};
exports.useSelection = useSelection;
const clearSelection = () => {
    let doit = false;
    exports.selection.forEach((s, data) => {
        if (s.length > 2) {
            for (let i = 0; i < s.length - 1; i += 2) {
                const selectionContext = s[i];
                const index = s[i + 1];
                if (selectionContext) {
                    // find with the id
                    selectionContext.selection.delete(data);
                    doit = true;
                    if (selectionContext.children[index]) {
                        selectionContext.children[index](false);
                    }
                }
            }
        }
        else {
            const selectionContext = s[0];
            const index = s[1];
            if (selectionContext) {
                doit = true;
                if (selectionContext.children[index]) {
                    selectionContext.children[index](false);
                }
            }
        }
        exports.selection.delete(data);
    });
    if (doit) {
        const s = exports.getSelection();
        selectListeners.forEach((fn) => fn(s));
    }
};
exports.clearSelection = clearSelection;
const useClick = (onClick, refs = []) => {
    return react_1.useCallback((e) => {
        if (!e.shiftKey) {
            onClick(e);
        }
    }, refs);
};
exports.useClick = useClick;
function useSelect(data) {
    const selectionContext = react_1.useContext(exports.SelectionContext);
    let isSelected, setSelected;
    if (selectionContext) {
        ;
        [isSelected, setSelected] = react_1.useState(selectionContext.selection.has(data));
        selectionContext.children[data.index] = setSelected;
        react_1.useEffect(() => {
            return () => {
                delete selectionContext.children[data.index];
            };
        }, []);
    }
    else {
        ;
        [isSelected, setSelected] = react_1.useState(false);
    }
    return [
        {
            onMouseDown: react_1.useCallback((e) => {
                // @ts-ignore
                if (e.shiftKey) {
                    const s = exports.selection.get(data);
                    if (data.data.id) {
                        exports.selection.forEach((v, k) => {
                            if (s !== v) {
                                if (k.data.id === data.data.id) {
                                    console.info('delete');
                                    exports.selection.delete(k);
                                }
                            }
                        });
                    }
                    if (isSelected) {
                        setSelected(false);
                        if (s && s.length > 2) {
                            for (let i = 0; i < s.length - 1; i += 2) {
                                if (s[i] === selectionContext) {
                                    s.splice(i, 2);
                                }
                            }
                        }
                        else {
                            exports.selection.delete(data);
                            exports.selection.forEach((v, k) => {
                                if (k.data.id === data.data.id) {
                                    exports.selection.delete(k);
                                }
                            });
                        }
                        if (selectionContext) {
                            selectionContext.selection.delete(data);
                            if (data.data.id) {
                                selectionContext.selection.forEach((d) => {
                                    if (d.data.id === data.data.id) {
                                        selectionContext.selection.delete(d);
                                    }
                                });
                            }
                        }
                    }
                    else {
                        if (s) {
                            if (!s.find((v) => v === selectionContext)) {
                                s.push(selectionContext, data.index);
                            }
                        }
                        else {
                            exports.selection.set(data, [selectionContext, data.index]);
                        }
                        if (selectionContext) {
                            selectionContext.selection.add(data);
                            // Needs to be improved!
                            selectionContext.selection.forEach((d) => {
                                const s = exports.selection.get(d);
                                if (!s) {
                                    console.warn('Cannot find selection and it exists on context');
                                    if (data.data.id) {
                                        const x = {};
                                        exports.selection.forEach((v, k) => {
                                            if (!x[k.data.id]) {
                                                x[k.data.id] = 1;
                                            }
                                            else {
                                                exports.selection.delete(k);
                                            }
                                        });
                                    }
                                    return;
                                }
                                const nIndex = s[1];
                                if (nIndex > data.index) {
                                    for (let i = data.index + 1; i < nIndex; i++) {
                                        const newItemData = {
                                            index: i,
                                            data: selectionContext.data[i],
                                        };
                                        selectionContext.selection.add(newItemData);
                                        exports.selection.set(newItemData, [selectionContext, i]);
                                        if (selectionContext.children[i]) {
                                            selectionContext.children[i](true);
                                        }
                                    }
                                }
                                else if (nIndex < data.index) {
                                    for (let i = data.index - 1; i > nIndex; i--) {
                                        const newItemData = {
                                            index: i,
                                            data: selectionContext.data[i],
                                        };
                                        selectionContext.selection.add(newItemData);
                                        exports.selection.set(newItemData, [selectionContext, i]);
                                        if (selectionContext.children[i]) {
                                            selectionContext.children[i](true);
                                        }
                                    }
                                }
                            });
                        }
                        if (data.data.id) {
                            const x = {};
                            exports.selection.forEach((v, k) => {
                                if (!x[k.data.id]) {
                                    x[k.data.id] = 1;
                                }
                                else {
                                    exports.selection.delete(k);
                                }
                            });
                        }
                        setSelected(true);
                    }
                    if (selectListeners.size > 0) {
                        const s = exports.getSelection();
                        selectListeners.forEach((fn) => fn(s));
                    }
                }
            }, [isSelected, data]),
        },
        isSelected,
    ];
}
exports.useSelect = useSelect;
//# sourceMappingURL=useSelect.js.map