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
exports.Button = void 0;
const react_1 = __importStar(require("react"));
const theme_1 = require("@based/theme");
const text_1 = require("@based/text");
const icons_1 = require("@based/icons");
const useHover_1 = __importDefault(require("../../hooks/events/useHover"));
const Text_1 = require("../Text");
const useKeyboard_1 = require("../../hooks/events/useKeyboard");
const Loader_1 = require("../Loader/Loader");
const useAsyncClick_1 = __importDefault(require("./useAsyncClick"));
const loadFile = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => resolve(String(event.target.result));
    reader.onerror = (error) => reject(error);
    reader.readAsText(file);
});
const UploadOverlay = ({ onSelectFile }) => {
    return (react_1.default.createElement("input", { type: "file", multiple: true, onChange: react_1.useCallback(async (e) => {
            const files = e.target.files;
            const x = await Promise.all([...files].map((f) => loadFile(f)));
            onSelectFile({ fileList: files, files: x });
            e.target.value = '';
        }, []), style: {
            position: 'absolute',
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            opacity: 0,
            cursor: 'pointer',
        } }));
};
const Button = ({ children, style, onSelectFile, foregroundColor, color = { color: 'primary' }, onHover, icon, iconColor, actionKeys, onClick, onMouseEnter, onContextMenu, fullWidth, centered, border, borderColor, }) => {
    const [hover, isHover, isActive] = useHover_1.default(onHover || onMouseEnter);
    let ref;
    const [isLoading, handler] = useAsyncClick_1.default(onClick);
    if (actionKeys && onClick) {
        ref = react_1.useRef();
        const timeRef = react_1.useRef();
        react_1.useEffect(() => {
            return () => {
                clearTimeout(timeRef.current);
            };
        }, []);
        const onKeyUp = react_1.useCallback((x) => {
            if (hover.onMouseDown) {
                hover.onMouseDown(x);
                timeRef.current = setTimeout(() => {
                    hover.onMouseUp(x);
                }, 100);
            }
            handler(x);
        }, [handler, timeRef]);
        useKeyboard_1.useKeyUp(onKeyUp, ref, actionKeys);
    }
    const c = color.color;
    if (!foregroundColor) {
        if (c === 'primary' || c === 'secondary') {
            foregroundColor = { color: 'background' };
        }
        else if (c === 'primaryAccent') {
            foregroundColor = { color: 'primary' };
        }
        else if (c === 'foreground') {
            foregroundColor = { color: 'background' };
        }
        else if (c === 'secondaryAccent') {
            foregroundColor = { color: 'secondary' };
        }
    }
    else if (typeof foregroundColor !== 'object') {
        foregroundColor = { color: foregroundColor };
    }
    if (!color.tone) {
        color.tone = 1;
    }
    if (isHover &&
        typeof foregroundColor === 'object' &&
        foregroundColor.tone > 1) {
        foregroundColor = {
            ...foregroundColor,
            tone: Math.max(1, foregroundColor.tone - (isActive ? 2 : isHover ? 1 : 0)),
        };
    }
    const Icon = icon && icons_1.iconFromString(icon);
    return (react_1.default.createElement("div", { style: { display: 'flex', ...style, position: 'relative' } },
        react_1.default.createElement("div", { ref: ref, style: {
                display: 'flex',
                transition: 'width 0.15s',
                width: 'auto',
                flexDirection: 'row',
                flexGrow: fullWidth ? 1 : null,
                justifyContent: centered ? 'center' : null,
                cursor: 'pointer',
                alignItems: centered ? 'center' : 'flex-start',
                padding: children && icon ? '4px 8px 4px 4px' : '4px 8px',
                borderRadius: '4px',
                borderStyle: border ? 'solid' : null,
                borderWidth: border ? 1 : null,
                borderColor: borderColor
                    ? theme_1.useColor(borderColor)
                    : theme_1.useColor({ color: 'divider' }),
                backgroundColor: theme_1.useColor({
                    color: color.color,
                    opacity: color.opacity,
                    tone: isActive
                        ? color.tone + 2
                        : isHover
                            ? color.tone + 1
                            : color.tone,
                }),
            }, onClick: isLoading ? null : handler, ...hover, onContextMenu: onContextMenu },
            isLoading ? (react_1.default.createElement("div", { style: {
                    width: 24,
                    height: 24,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: !children ? 0 : 4,
                } },
                react_1.default.createElement(Loader_1.Loader, { color: foregroundColor, size: 18 }))) : Icon ? (react_1.default.createElement(Icon, { style: { marginRight: !children ? 0 : 4 }, color: iconColor || foregroundColor })) : null,
            children ? (react_1.default.createElement(Text_1.Text, { noSelect: true, singleLine: true, weight: "medium", color: foregroundColor }, text_1.getTextValue(children))) : null),
        onSelectFile ? react_1.default.createElement(UploadOverlay, { onSelectFile: onSelectFile }) : null));
};
exports.Button = Button;
//# sourceMappingURL=index.js.map