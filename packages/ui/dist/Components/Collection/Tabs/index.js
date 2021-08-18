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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tabs = void 0;
const react_1 = __importStar(require("react"));
const theme_1 = require("@based/theme");
const Text_1 = require("../../Text");
const use_location_1 = __importDefault(require("wouter/use-location"));
// import { useHub } from '@saulx/hub'
const Tab = ({ tab, onClick, activeTab, index, tabSizes, noIndicator, }) => {
    const isActive = activeTab === index;
    const [, setLocation] = use_location_1.default();
    // const hub = useHub()
    return (react_1.default.createElement("div", { style: {
            marginRight: tab.border ? 40 : 30,
            cursor: 'pointer',
            display: 'flex',
            position: 'relative',
            width: tabSizes ? tabSizes[index].width : null,
        }, onClick: react_1.useCallback(() => {
            if (tab.to) {
                setLocation(tab.to);
                // hub.set('device.history', tab.to)
            }
            if (onClick) {
                // @ts-ignore
                onClick(tab, index);
            }
        }, [tab]) },
        react_1.default.createElement(Text_1.Text, { noSelect: true, 
            // singleLine
            weight: isActive ? 'semibold' : noIndicator ? 'regular' : 'medium', style: {
                marginLeft: isActive && tabSizes
                    ? -tabSizes[index].width * (noIndicator ? 0.015 : 0.012)
                    : null,
                // fontWeight: isActive ? 650 : 500,
            } }, tab.title),
        react_1.default.createElement("div", { style: {
                position: 'absolute',
                right: -21,
                height: 24,
                borderRight: tab.border
                    ? '1px solid ' + theme_1.useColor({ color: 'divider' })
                    : null,
            } })));
};
const Tabs = ({ onChange, active, tabs = [], noIndicator, style, noBorder, indicatorMargin = 0, color = { color: 'primary' }, }) => {
    const [activeTab, setActive] = react_1.useState(active);
    const [tabSizes, setTabsizes] = react_1.useState();
    const ref = react_1.useRef();
    const onClick = react_1.useCallback((active, index) => {
        setActive(index);
        if (tabs[index].onClick) {
            // @ts-ignore
            tabs[index].onClick();
        }
        if (onChange) {
            global.requestAnimationFrame(() => {
                onChange(active, index);
            });
        }
    }, [onChange]);
    react_1.useEffect(() => {
        global.requestAnimationFrame(() => {
            if (ref.current) {
                const current = ref.current || {};
                const children = current.childNodes;
                const tabSizes = [];
                const xTop = current.getBoundingClientRect && current.getBoundingClientRect().x;
                for (let i = 0; i < children.length - 1; i++) {
                    const { x, width } = children[i].getBoundingClientRect();
                    tabSizes.push({
                        width: width,
                        x: x - xTop,
                    });
                }
                setTabsizes(tabSizes);
            }
        });
    }, [tabs, ref.current]);
    return (react_1.default.createElement("div", { ref: ref, style: {
            display: 'flex',
            position: 'relative',
            opacity: tabSizes ? 1 : 0,
            transition: 'opacity 0.1s',
            paddingBottom: noBorder ? null : 10,
            borderBottom: noBorder
                ? null
                : '1px solid ' + theme_1.useColor({ color: 'divider' }),
            ...style,
        } },
        tabs.map((tab, index) => {
            return (react_1.default.createElement(Tab, { key: index, tab: tab, onClick: onClick, noIndicator: noIndicator, activeTab: activeTab, index: index, tabSizes: tabSizes, indicatorMargin: indicatorMargin }));
        }),
        react_1.default.createElement("div", { style: {
                opacity: noIndicator ? 0 : 1,
                position: 'absolute',
                bottom: -1 * indicatorMargin,
                width: tabSizes ? tabSizes[activeTab].width * 1.05 : 0,
                left: 0,
                transition: 'width 0.25s, transform 0.2s ease-in-out',
                transform: `translate3d(${tabSizes ? tabSizes[activeTab].x : 0}px,0px,0px)`,
                height: 4,
                backgroundColor: theme_1.useColor(color),
            } })));
};
exports.Tabs = Tabs;
//# sourceMappingURL=index.js.map