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
exports.ModalTitle = void 0;
const react_1 = __importStar(require("react"));
const theme_1 = require("@based/theme");
const useHover_1 = __importDefault(require("../../hooks/events/useHover"));
const icons_1 = require("@based/icons");
const useInputValue_1 = __importDefault(require("../../hooks/useInputValue"));
const ModalTitle = (props) => {
    const { onEditTitle, value, autoFocus, identifier, placeholder = '' } = props;
    const [hover, isHover] = !onEditTitle ? [{}, false] : useHover_1.default();
    const [isEditing, setEditing] = react_1.useState(false);
    const [inputText] = useInputValue_1.default(value, identifier, isEditing);
    const ref = react_1.useRef(null);
    const editingFix = () => ref.current && ref.current.blur();
    react_1.useEffect(() => {
        window.addEventListener('blur', editingFix);
        return () => {
            window.removeEventListener('blur', editingFix);
        };
    }, []);
    react_1.useEffect(() => {
        if (ref.current && autoFocus) {
            setEditing(true);
            // @ts-ignore
            ref.current.focus();
        }
    }, [autoFocus]);
    return (react_1.default.createElement("div", { ...hover, style: {
            display: 'flex',
            flexGrow: 1,
        } },
        react_1.default.createElement("div", { ref: ref, contentEditable: !!onEditTitle, suppressContentEditableWarning: true, style: {
                minWidth: 20,
                minHeight: 24,
                userSelect: !onEditTitle ? 'none' : null,
                cursor: !onEditTitle ? 'default' : null,
                background: !isEditing && isHover
                    ? theme_1.useColor({ color: 'background', tone: 2 })
                    : null,
                borderRadius: '4px',
                border: isEditing
                    ? '1px solid ' + theme_1.useColor({ color: 'divider' })
                    : null,
                paddingLeft: !isEditing ? 10 : 9,
                paddingRight: !isEditing ? 10 : 9,
                paddingTop: !isEditing ? 1 : null,
                paddingBottom: !isEditing ? 1 : null,
                fontSize: '15px',
                lineHeight: '24px',
                letterSpacing: '-0.015em',
                fontWeight: 600,
                color: theme_1.useColor({ color: 'foreground' }),
                boxShadow: isEditing
                    ? `0px 3px 8px 1px ${theme_1.useColor({
                        color: 'background',
                        tone: 2,
                    })}`
                    : null,
            }, onInput: (event) => {
                const el = event.target;
                const v = el.innerText;
                if (v === '') {
                    el.innerText = '';
                    return;
                }
                onEditTitle(v);
            }, onKeyDown: (e) => {
                if (e.key === 'Enter' || e.key === 'Escape') {
                    e.preventDefault();
                    event.target.blur();
                    setEditing(false);
                }
            }, onBlur: () => {
                setEditing(false);
            }, onClick: (event) => {
                event.stopPropagation();
                if (onEditTitle && !isEditing) {
                    setEditing(true);
                    event.target.focus();
                }
            } }, isEditing ? inputText : inputText || placeholder),
        onEditTitle && !isEditing && isHover ? (react_1.default.createElement(icons_1.EditName, { color: { color: 'foreground' } })) : null));
};
exports.ModalTitle = ModalTitle;
//# sourceMappingURL=ModalTitle.js.map