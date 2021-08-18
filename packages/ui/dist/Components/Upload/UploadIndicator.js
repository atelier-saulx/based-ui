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
exports.UploadIndicator = void 0;
const react_1 = __importStar(require("react"));
const ProgressContext_1 = require("./ProgressContext");
const ProgressIndicator_1 = require("../ProgressIndicator/ProgressIndicator");
const Shared_1 = require("../Overlay/Shared");
const Title_1 = require("../Text/Title");
const icons_1 = require("@based/icons");
const Inner = ({ visible, progress }) => {
    const items = Object.values(progress.items);
    const [inProgress, update] = react_1.useState(false);
    react_1.useEffect(() => {
        const t = setTimeout(() => {
            update(progress.inProgress);
        }, 0);
        return () => clearTimeout(t);
    }, [progress.inProgress]);
    return (react_1.default.createElement("div", { style: { display: visible ? null : 'none' } },
        react_1.default.createElement(Shared_1.InnerShared, { style: {
                overflowY: 'hidden',
                opacity: inProgress ? 1 : 0,
                transform: inProgress
                    ? 'translate3d(0px,0px,0px)'
                    : `translate3d(0px,${100}px,0px)`,
                transition: inProgress
                    ? 'transform 0.25s, opacity 0.25s, height 0.15s'
                    : 'transform 0.7s, opacity 0.7s, height 0.15s',
                position: 'fixed',
                bottom: 20,
                left: 20,
                width: 500,
                maxHeight: 600,
                zIndex: 100,
                height: items.length * 70 + 20,
                padding: 10,
                background: 'white',
            } }, items.map((v) => {
            return (react_1.default.createElement("div", { key: v.id, style: {
                    display: 'flex',
                    alignItems: 'center',
                    height: 70,
                    justifyContent: 'space-between',
                } },
                react_1.default.createElement("div", { style: {
                        display: 'flex',
                        alignItems: 'center',
                        paddingLeft: 10,
                        paddingRight: 10,
                    } },
                    react_1.default.createElement(ProgressIndicator_1.ProgressIndicator, { value: v.progress, style: { marginRight: 20 } }),
                    react_1.default.createElement(Title_1.Title, { size: "small" }, `${v.type === 'video' && v.progress > 99
                        ? 'Transcoding...'
                        : v.name}`)),
                react_1.default.createElement(icons_1.Close, { style: {
                        marginRight: 10,
                    }, onClick: () => {
                        if (v.xhr) {
                            v.xhr.abort();
                            delete v.xhr;
                        }
                        v.removed = true;
                        delete progress.items[v.id];
                        if (!Object.keys(progress.items).length) {
                            progress.inProgress = false;
                        }
                        progress.listeners.forEach((update) => update({ ...v }));
                    } })));
        }))));
};
const UploadIndicatorNested = () => {
    const progressContext = react_1.useContext(ProgressContext_1.ProgressContext);
    const [, update] = react_1.useState();
    const [visible, updateVisible] = react_1.useState();
    react_1.useEffect(() => {
        progressContext.listeners.add(update);
        return () => {
            progressContext.listeners.delete(update);
        };
    }, []);
    react_1.useEffect(() => {
        let t;
        if (progressContext.inProgress) {
            updateVisible(progressContext.inProgress);
        }
        else {
            t = setTimeout(() => {
                updateVisible(progressContext.inProgress);
            }, 1100);
        }
        return () => clearTimeout(t);
    }, [progressContext.inProgress]);
    if (!visible) {
        return null;
    }
    return react_1.default.createElement(Inner, { visible: visible, progress: progressContext });
};
const UploadIndicator = ({ children, ...props }) => {
    const progress = ProgressContext_1.createProgressContext({
        url: props.url,
        service: props.service,
    });
    return (react_1.default.createElement(ProgressContext_1.ProgressContext.Provider, { value: progress },
        children,
        react_1.default.createElement(UploadIndicatorNested, null)));
};
exports.UploadIndicator = UploadIndicator;
//# sourceMappingURL=UploadIndicator.js.map