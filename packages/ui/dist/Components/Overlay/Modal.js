"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Modal = exports.ModalHeader = void 0;
const react_1 = __importDefault(require("react"));
const theme_1 = require("@based/theme");
const icons_1 = require("@based/icons");
const Button_1 = require("../Button");
const useOverlayProps_1 = __importDefault(require("../../hooks/overlay/useOverlayProps"));
const renderChildren_1 = __importDefault(require("../../util/renderChildren"));
const ModalTitle_1 = require("./ModalTitle");
const ModalHeader = ({ closeButton, title, onEditTitle, noBorder, children, icon, framed, onClose, }) => {
    const Icon = icon ? icons_1.iconFromString(icon) : null;
    return (react_1.default.createElement("div", { style: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '10px 25px 10px 25px',
            borderBottom: `1px solid ${theme_1.useColor({
                color: 'divider',
            })}`,
        } },
        react_1.default.createElement("div", { style: {
                display: 'flex',
                alignItems: 'center',
                flexGrow: 1,
            } },
            Icon ? (react_1.default.createElement(Icon, { framed: framed, style: {
                    marginRight: framed ? 15 : 10,
                    marginLeft: framed ? '0px' : '-5px',
                } })) : null,
            title ? (react_1.default.createElement(ModalTitle_1.ModalTitle, { onEditTitle: onEditTitle, value: title })) : (react_1.default.createElement("div", null))),
        react_1.default.createElement("div", { style: {
                display: 'flex',
                alignItems: 'center',
            } },
            children,
            closeButton ? (react_1.default.createElement(icons_1.Close, { style: { marginRight: '-4px', marginLeft: '16px' }, onClick: onClose })) : null)));
};
exports.ModalHeader = ModalHeader;
// let cnt = 0
const Modal = (initialProps) => {
    const props = useOverlayProps_1.default(initialProps);
    let { onClose, confirmButton, children, header } = props;
    if (typeof header === 'function') {
        // @ts-ignore
        header = header(props);
    }
    if (typeof confirmButton === 'function') {
        // @ts-ignore
        confirmButton = confirmButton(props);
    }
    return (react_1.default.createElement("div", { style: {
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
            pointerEvents: 'none',
            width: '100%',
            height: '100%',
        } },
        react_1.default.createElement("div", { style: {
                height: props.height || null,
                pointerEvents: 'all',
                background: theme_1.useColor({ color: 'background' }),
                borderRadius: '2px',
                width: props.width || 910,
                maxWidth: 'calc(100% - 30px)',
                boxShadow: `0px 8px 16px 1px ${theme_1.useColor({
                    color: 'foreground',
                    tone: 2,
                    opacity: 0.33,
                })}`,
            } },
            header ? react_1.default.createElement(exports.ModalHeader, { onClose: onClose, ...header }) : null,
            react_1.default.createElement("div", { style: {
                    minHeight: 180,
                    paddingBottom: header ? 40 : 60,
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    position: 'relative',
                    maxHeight: 'calc(100% - 50px)',
                } },
                react_1.default.createElement("div", { style: {
                        marginTop: header ? 32 : 60,
                        paddingLeft: 64,
                        paddingRight: 64,
                        display: 'flex',
                        flexDirection: 'column',
                    } }, renderChildren_1.default(children, props)),
                confirmButton ? (react_1.default.createElement("div", { style: {
                        display: 'flex',
                        justifyContent: 'flex-end',
                        marginTop: 32,
                        marginRight: 80,
                    } },
                    react_1.default.createElement(Button_1.Button, { ...confirmButton, onClick: (e) => {
                            // @ts-ignore
                            confirmButton.onClick(e, props);
                            onClose();
                        }, color: confirmButton.color || { color: 'primary' }, icon: confirmButton.icon }, confirmButton.children))) : null))));
};
exports.Modal = Modal;
//# sourceMappingURL=Modal.js.map