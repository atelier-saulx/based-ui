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
exports.FileUpload = void 0;
const react_1 = __importStar(require("react"));
require("../Input/style.css");
const useDrop_1 = __importDefault(require("../../hooks/drag/useDrop"));
const ProgressContext_1 = require("./ProgressContext");
const uploadFile_1 = require("./uploadFile");
const Text_1 = require("../Input/Text");
const text_1 = require("@based/text");
const FileUpload = ({ value = '', onChange = () => { }, identifier, placeholder = 'Upload a file', progressId, noBackground, border, video = false, fake, }) => {
    const identifierRef = react_1.useRef(identifier);
    const initialValue = react_1.useRef(value);
    const [stateValue, setValue] = react_1.useState(value);
    const progress = react_1.useContext(ProgressContext_1.ProgressContext);
    const progressIdReal = react_1.useRef((~~(Math.random() * 99999999)).toString(16));
    if (!progressId) {
        progressId = progressIdReal.current;
    }
    const [status, updateStatus] = react_1.useState(null);
    const [inProgress, updateInProgress] = react_1.useState(false);
    react_1.useEffect(() => {
        const update = (item) => {
            if (item && item.id === progressId) {
                if (item.isComplete) {
                    setValue(item.url);
                    onChange(item.url);
                    updateInProgress(false);
                }
                else if (item.removed) {
                    updateInProgress(false);
                }
                else {
                    updateStatus(item);
                }
            }
        };
        if (progress) {
            updateStatus(progress.items[progressId]);
            progress.listeners.add(update);
        }
        return () => {
            progress && progress.listeners.delete(update);
        };
    }, [updateStatus, onChange, setValue, progressId]);
    // TODO: drop not triggereing
    const [drop, isDrop] = useDrop_1.default(react_1.useCallback((e) => {
        uploadFile_1.uploadFile(e.dataTransfer.files, progress, progressId, video ? 'video' : null, fake);
        updateInProgress(true);
    }, []));
    if (identifierRef.current !== identifier) {
        identifierRef.current = identifier;
        initialValue.current = value;
        setValue(value);
    }
    else if (!initialValue.current) {
        initialValue.current = value;
        if (!stateValue && value) {
            setValue(value);
        }
    }
    const update = react_1.useCallback((newvalue) => {
        setValue(newvalue);
        onChange(newvalue);
    }, [setValue, onChange]);
    return (react_1.default.createElement("div", { style: {
            flexGrow: 1,
            position: 'relative',
        }, ...drop },
        react_1.default.createElement(Text_1.Input, { placeholder: String(text_1.getTextValue(placeholder)), icon: inProgress ? null : 'upload', progress: inProgress ? status.progress : null, border: border, noBackground: noBackground, value: isDrop
                ? 'Drop file to upload'
                : inProgress
                    ? status.type === 'video' && status.transcoding
                        ? `Transcoding ${status.name}... ${~~status.progress}%`
                        : `Uploading ${status.name}... ${~~status.progress}%`
                    : stateValue, onChange: update }),
        react_1.default.createElement("input", { type: "file", onChange: react_1.useCallback(async (e) => {
                const files = e.target.files;
                uploadFile_1.uploadFile(files, progress, progressId, video ? 'video' : undefined, fake);
                e.target.value = '';
                updateInProgress(true);
            }, []), style: {
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: 44,
                height: 38,
                opacity: 0,
                cursor: 'pointer',
            } })));
};
exports.FileUpload = FileUpload;
//# sourceMappingURL=Upload.js.map