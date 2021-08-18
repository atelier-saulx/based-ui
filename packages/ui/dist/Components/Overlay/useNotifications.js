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
exports.useNotifications = exports.notify = void 0;
const react_1 = __importStar(require("react"));
const theme_1 = require("@based/theme");
const Text_1 = require("../Text");
const NOTIFICATION_HEIGHT = 68 + 12 + 16;
const NOTIFICATION_SPACING = 16;
let notificationCount = 0;
const notifictionObject = {
    listeners: new Set(),
};
const notify = (payload) => {
    if (notifictionObject.listeners) {
        notifictionObject.listeners.forEach((fn) => fn(payload));
    }
};
exports.notify = notify;
const updateNotificationsY = (notifications) => {
    notifications
        // .filter((v) => !v.deleting)
        .forEach((n, i) => {
        n.y = i * (NOTIFICATION_HEIGHT + NOTIFICATION_SPACING);
    });
};
const useNotifications = ({ update }) => {
    const notifictionsRef = react_1.useRef([]);
    react_1.useEffect(() => {
        const timers = new Set();
        const listener = (notification) => {
            const id = ++notificationCount;
            const notificationValue = {
                ...notification,
                y: notifictionsRef.current.length * NOTIFICATION_HEIGHT,
                id,
                starting: true,
            };
            notifictionsRef.current.push(notificationValue);
            updateNotificationsY(notifictionsRef.current);
            update();
            const animate = () => {
                const t0 = setTimeout(() => {
                    notificationValue.starting = false;
                    update();
                }, 20);
                timers.add(t0);
                const t = setTimeout(() => {
                    const i = notifictionsRef.current.findIndex((v) => v.id === id);
                    notificationValue.deleting = true;
                    updateNotificationsY(notifictionsRef.current);
                    update();
                    if (i !== -1) {
                        const t2 = setTimeout(() => {
                            const i = notifictionsRef.current.findIndex((v) => v.id === id);
                            notifictionsRef.current.splice(i, 1);
                            updateNotificationsY(notifictionsRef.current);
                            update();
                        }, 510);
                        timers.add(t2);
                    }
                }, 5000);
                timers.add(t);
            };
            animate();
        };
        notifictionObject.listeners.add(listener);
        return () => {
            notifictionObject.listeners.delete(listener);
            timers.forEach((t) => clearTimeout(t));
        };
    }, [notifictionsRef]);
    return (react_1.default.createElement("div", { style: {
            position: 'fixed',
            zIndex: 1,
            right: 16,
            top: 16,
        } }, notifictionsRef.current.map((v, i) => (react_1.default.createElement(Notification, { i: i, key: v.id, value: v })))));
};
exports.useNotifications = useNotifications;
const Notification = ({ value, i }) => {
    // const y = Math.cos(value.id) * window.innerHeight + window.innerHeight / 2
    // const x = Math.sin(value.id) * window.innerWidth + window.innerWidth / 2 + 200
    return (react_1.default.createElement("div", { style: {
            color: theme_1.useColor({ color: 'foreground', tone: 2 }),
            boxShadow: `0px 3px 16px 1px ${theme_1.useColor({
                color: 'foreground',
                tone: 2,
                opacity: 0.1,
            })}`,
            borderRadius: 8,
            padding: 24,
            backgroundColor: theme_1.useColor({
                color: 'background',
                opacity: 0.9,
            }),
            backdropFilter: 'blur(6px)',
            position: 'absolute',
            marginBottom: NOTIFICATION_SPACING,
            top: 0,
            right: 0,
            width: 400,
            height: NOTIFICATION_HEIGHT + 'px',
            overflow: 'hidden',
            transition: 'transform 0.5s, opacity 0.5s',
            transform: value.deleting || value.starting
                ? `translate3d(${300}px,${0 + value.y}px,0px) scale(0.9)`
                : `translate3d(${0}px,${value.y}px,0px) scale(1)`,
            opacity: value.deleting || value.starting ? 0 : 1,
        } },
        react_1.default.createElement(Text_1.Text, { color: { color: 'foreground' }, noSelect: true, weight: "semibold", singleLine: true }, value.title),
        react_1.default.createElement(Text_1.Text, { color: { color: 'foreground' }, noSelect: true, singleLine: true }, value.message)));
};
//# sourceMappingURL=useNotifications.js.map