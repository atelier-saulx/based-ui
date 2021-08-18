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
exports.Preloader = void 0;
const react_1 = __importStar(require("react"));
const theme_1 = require("@based/theme");
const Loader_1 = require("../Loader/Loader");
const reducer = (x) => !x;
const Preloader = ({ loading = false, refs = [], children, }) => {
    const [sw, setSw] = react_1.useState(false);
    const [fontLoaded, setFontLoaded] = react_1.useState(false);
    const [remove, setRemove] = react_1.useState(false);
    const [v, toggle] = react_1.useReducer(reducer, null);
    if (refs.length) {
        react_1.useEffect(() => {
            setRemove(false);
            setSw(true);
            toggle();
            global.requestAnimationFrame(toggle);
            setTimeout(() => {
                setSw(false);
            }, 200);
            const timer = setTimeout(() => {
                setRemove(true);
            }, 1050);
            return () => {
                clearTimeout(timer);
            };
        }, refs);
    }
    react_1.useEffect(() => {
        let frame = global.requestAnimationFrame(() => {
            if (global.document.fonts && global.document.fonts.ready) {
                document.fonts.ready.then(() => {
                    setFontLoaded(true);
                });
            }
            else {
                // fallback to canvas check (ie11)
                frame = global.requestAnimationFrame(() => {
                    setFontLoaded(true);
                });
            }
        });
        return () => {
            global.cancelAnimationFrame(frame);
        };
    }, []);
    react_1.useEffect(() => {
        let timer;
        if (fontLoaded && loading === false) {
            timer = setTimeout(() => {
                setRemove(true);
            }, 750);
        }
        return () => {
            clearTimeout(timer);
        };
    }, [fontLoaded, loading]);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        v ? null : children,
        remove ? null : (react_1.default.createElement("div", { style: {
                position: 'fixed',
                top: 0,
                bottom: 0,
                left: 0,
                opacity: fontLoaded && !loading && !sw ? 0 : 1,
                transition: 'opacity 0.75s',
                right: 0,
                backgroundColor: theme_1.useColor({ color: 'background' }),
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            } },
            react_1.default.createElement(Loader_1.Loader, { fadeIn: true, delay: 1200, size: 24 })))));
};
exports.Preloader = Preloader;
//# sourceMappingURL=index.js.map