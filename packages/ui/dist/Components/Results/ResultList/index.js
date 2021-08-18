"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResultList = void 0;
const react_1 = __importDefault(require("react"));
const Text_1 = require("../../Text");
const ExpandableList_1 = require("../../Collection/ExpandableList");
const getData_1 = __importDefault(require("../../Collection/getData"));
const defaultItems = {
    items: { path: ['items'] },
    title: { path: ['title'] },
    value: { path: ['value'] },
    id: ['id'],
};
const ExpandListNested = ({ data, itemProps }) => {
    const nestedItemProps = (itemProps.items && itemProps.items.props) || itemProps || defaultItems;
    const items = getItems(data.data, itemProps);
    if (items.length) {
        return (react_1.default.createElement(ExpandableList_1.ExpandableList, { autoSize: false, paddingItemLeft: 24, items: items, isNested: (data) => {
                const items = getItems(data.data, nestedItemProps);
                return items && items.length;
            }, options: {
                children: ({ data }) => {
                    const itemPropsD = itemProps || defaultItems;
                    let value;
                    if (!itemPropsD.value) {
                        value = getData_1.default(data.data, defaultItems.value.path);
                    }
                    else {
                        value = getData_1.default(data.data, itemPropsD.value.path);
                    }
                    return (react_1.default.createElement(Text_1.Text, { weight: "medium" }, { value, format: 'number-short' }));
                },
            }, itemProps: {
                items: itemProps.items || { path: ['items'], props: itemProps },
                ...nestedItemProps,
            } }, ExpandListNested));
    }
    // data time
    return null;
    // return <ExpandableList />
};
const getItems = (data, itemProps) => {
    const itemPropsD = itemProps || defaultItems;
    let items;
    if (!itemPropsD.value) {
        items = getData_1.default(data, defaultItems.items.path);
    }
    else {
        items = getData_1.default(data, itemPropsD.items.path);
    }
    return items;
};
const getTotal = (items, itemProps) => {
    const itemPropsD = itemProps || defaultItems;
    let t = 0;
    for (let i = 0; i < items.length; i++) {
        let value;
        const data = items[i];
        if (!itemPropsD.value) {
            value = getData_1.default(data, defaultItems.value.path);
        }
        else {
            value = getData_1.default(data, itemPropsD.value.path);
        }
        t += value || 0;
    }
    return t;
};
const ResultList = ({ items, itemProps, label, style, value, }) => {
    const t = getTotal(items, itemProps);
    return (react_1.default.createElement(ExpandableList_1.ExpandableList, { style: style, items: items, itemProps: itemProps, header: label || value
            ? {
                weight: 'medium',
                label,
                children: value
                    ? () => {
                        return react_1.default.createElement(Text_1.Text, { weight: "medium" }, value);
                    }
                    : null,
            }
            : null, options: {
            children: ({ data }) => {
                const itemPropsD = itemProps || defaultItems;
                let value;
                if (!itemPropsD.value) {
                    value = getData_1.default(data.data, defaultItems.value.path);
                }
                else {
                    value = getData_1.default(data.data, itemPropsD.value.path);
                }
                return (react_1.default.createElement("div", { style: {
                        display: 'flex',
                    } },
                    react_1.default.createElement(Text_1.Text, { weight: "medium" }, { value, format: 'number-short' }),
                    react_1.default.createElement(Text_1.Text, { weight: "medium", style: {
                            marginLeft: 4,
                        }, color: { color: 'primary' } }, `(${(((value || 0) / t) * 100).toFixed()}%)`)));
            },
        }, isNested: (data) => {
            const items = getItems(data.data, itemProps);
            return !!items.length;
        } }, ExpandListNested));
};
exports.ResultList = ResultList;
//# sourceMappingURL=index.js.map