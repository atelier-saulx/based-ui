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
exports.Menu = exports.ContextualMenuItem = void 0;
const react_1 = __importStar(require("react"));
const useOverlayPosition_1 = __importDefault(require("../../hooks/overlay/useOverlayPosition"));
const useOverlayProps_1 = __importStar(require("../../hooks/overlay/useOverlayProps"));
const theme_1 = require("@based/theme");
const icons_1 = require("@based/icons");
const Text_1 = require("../Text");
const useHover_1 = __importDefault(require("../../hooks/events/useHover"));
const Shared_1 = __importDefault(require("./Shared"));
const index_1 = require("./index");
const renderChildren_1 = __importDefault(require("../../util/renderChildren"));
const Next = ({ label, children }) => {
    const [hover, isHover] = useHover_1.default();
    const ctx = react_1.useContext(useOverlayProps_1.OverlayContext);
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("div", { ...hover, onClick: react_1.useCallback(() => {
                ctx.current.merge({ content: undefined });
            }, []), style: {
                display: 'flex',
                paddingTop: 5,
                paddingBottom: 5,
                paddingLeft: 15,
                paddingRight: 15,
                width: '100%',
                alignItems: 'center',
                cursor: 'pointer',
                backgroundColor: isHover
                    ? theme_1.useColor({ color: 'foreground', opacity: 0.05 })
                    : null,
            } },
            react_1.default.createElement(icons_1.ChevronLeft, null),
            react_1.default.createElement(Text_1.Text, { weight: "medium", singleLine: true, noSelect: true, style: {
                    marginLeft: 4,
                } }, label)),
        renderChildren_1.default(children, {})));
};
const ContextualMenuItem = ({ icon, label, weight, color, children, onClick, style, iconProps, optionsIcon, onOptions, border, Icon = icon ? icons_1.iconFromString(icon) : null, }) => {
    const [hover, isHover] = useHover_1.default();
    const ctx = react_1.useContext(useOverlayProps_1.OverlayContext);
    const click = react_1.useCallback((e) => {
        if (onClick) {
            if (!onClick(e)) {
                index_1.removeOverlay();
            }
        }
        else {
            ctx.current.merge({
                content: react_1.default.createElement(Next, { label: label }, children),
            });
        }
    }, [onClick, children, ctx]);
    return (react_1.default.createElement("div", { style: {
            paddingTop: border ? 7.5 : 0,
            marginTop: border ? 7.5 : 0,
            borderColor: theme_1.useColor({
                color: 'foreground',
                tone: 5,
                opacity: 0.33,
            }),
            borderStyle: 'solid',
            borderWidth: 0,
            borderTopWidth: border ? 1 : null,
        } },
        react_1.default.createElement("div", { ...hover, onClick: click, style: {
                display: 'flex',
                paddingTop: 5,
                paddingBottom: 5,
                paddingLeft: 8,
                paddingRight: 8,
                width: '100%',
                justifyContent: 'space-between',
                alignItems: 'center',
                cursor: 'pointer',
                backgroundColor: isHover ? theme_1.useColor({ color: 'divider' }) : null,
                ...style,
            } },
            react_1.default.createElement("div", { style: {
                    display: 'flex',
                } },
                Icon ? (react_1.default.createElement(Icon, { color: color || { color: 'foreground', tone: 1 }, ...iconProps })) : null,
                react_1.default.createElement(Text_1.Text, { color: color, style: {
                        marginLeft: !Icon ? 8 + 24 : 8,
                        marginRight: 8,
                    }, weight: weight, singleLine: true, noSelect: true }, label)),
            onOptions
                ? react_1.default.createElement(icons_1.iconFromString(optionsIcon || 'more'), {
                    onClick: (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onOptions(e);
                    },
                })
                : null,
            children && !onClick && !onOptions ? (react_1.default.createElement(icons_1.ChevronRight, { color: { color: 'foreground', tone: 3 } })) : null)));
};
exports.ContextualMenuItem = ContextualMenuItem;
const Menu = (initialProps) => {
    const props = useOverlayProps_1.default(initialProps);
    const { align, target, selectTarget, width = 256, y, x, maxY, maxX } = props;
    const [elementRef, position, resize] = useOverlayPosition_1.default({
        align,
        y,
        x,
        target,
        selectTarget,
        width,
        maxY,
        maxX,
    });
    const ctx = react_1.useContext(useOverlayProps_1.OverlayContext);
    react_1.useEffect(() => {
        const x = () => {
            resize();
            setTimeout(() => resize, 200);
        };
        ctx.current.listeners.add(x);
        return () => {
            ctx.current.listeners.delete(x);
        };
    }, [ctx, resize]);
    const content = props.content;
    return (react_1.default.createElement(Shared_1.default, { width: props.width, ref: elementRef, position: position, align: align },
        react_1.default.createElement("div", { style: {
                display: 'flex',
                transition: 'transform 0.15s',
                transform: content
                    ? 'translate3d(-100%,0px,0px)'
                    : `translate3d(0px,0px,0px)`,
            } },
            react_1.default.createElement("div", { style: {
                    minWidth: '100%',
                } }, react_1.default.createElement(props.Component, {
                resize,
                position,
                ...props,
            })),
            react_1.default.createElement("div", { style: {
                    minWidth: '100%',
                } }, content))));
};
exports.Menu = Menu;
//# sourceMappingURL=Menu.js.map