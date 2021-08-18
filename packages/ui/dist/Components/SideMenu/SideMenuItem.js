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
exports.SideMenuItem = void 0;
const react_1 = __importStar(require("react"));
const theme_1 = require("@based/theme");
const Text_1 = require("../Text");
const icons_1 = require("@based/icons");
const useHover_1 = __importDefault(require("../../hooks/events/useHover"));
// import { useHub } from '@saulx/hub'
const use_location_1 = __importDefault(require("wouter/use-location"));
const useTooltip_1 = __importDefault(require("../../hooks/overlay/useTooltip"));
const useMultipleEvents_1 = __importDefault(require("../../hooks/events/useMultipleEvents"));
const SideMenuItem = ({ title, icon, style, items, onClick, isSmall, to, active, data, }) => {
    const [hover, isHover] = useHover_1.default();
    const [expanded, toggleExpand] = react_1.useReducer((v) => !v, false);
    const [, setLocation] = use_location_1.default();
    const ItemIcon = items ? icons_1.Expand : icon ? icons_1.iconFromString(icon) : null;
    // const hub = useHub()
    const tooltip = useTooltip_1.default(isSmall ? title : null);
    return (react_1.default.createElement("div", { style: {
            ...style,
        } },
        react_1.default.createElement("div", { ...useMultipleEvents_1.default(hover, tooltip), onClick: react_1.useCallback((e) => {
                if (to) {
                    setLocation(to);
                }
                if (items) {
                    toggleExpand();
                }
                if (onClick) {
                    onClick(e, data);
                }
            }, []), style: {
                paddingLeft: isSmall ? 9 : 14,
                paddingRight: isSmall ? 9 : 14,
                paddingTop: 4,
                paddingBottom: 4,
                display: 'flex',
                marginBottom: 8,
                cursor: 'pointer',
                alignItems: 'center',
                borderRadius: 4,
                transition: 'background 0.15s',
                backgroundColor: isHover
                    ? theme_1.useColor({ color: 'background', tone: 3 })
                    : active
                        ? theme_1.useColor({ color: 'background', tone: 4 })
                        : null,
            } },
            ItemIcon ? (react_1.default.createElement(ItemIcon, { color: active
                    ? { color: 'foreground' }
                    : { color: 'foreground', tone: 2 }, style: {
                    marginRight: 8,
                    transform: expanded ? 'rotate(90deg)' : '',
                } })) : null,
            isSmall ? null : (react_1.default.createElement(Text_1.Text, { weight: "medium", singleLine: true, noSelect: true, color: active
                    ? { color: 'foreground' }
                    : { color: 'foreground', tone: 2 } }, title))),
        expanded && items ? (react_1.default.createElement("div", { style: { marginLeft: 14 } }, items.map((v, i) => (react_1.default.createElement(exports.SideMenuItem, { key: i, ...v }))))) : null));
};
exports.SideMenuItem = SideMenuItem;
//# sourceMappingURL=SideMenuItem.js.map