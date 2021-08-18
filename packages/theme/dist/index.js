"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.switchTheme = exports.updateTheme = exports.getTone = exports.getTheme = exports.useColor = exports.useTheme = exports.hashTheme = void 0;
const react_1 = require("react");
const hash_1 = require("@saulx/hash");
require("./style.css");
require("./font/style.css");
const theme = {
    theme: {
        light: {
            primary: [
                [98, 0, 238],
                [87, 0, 210],
                [66, 0, 160],
            ],
            divider: [[234, 235, 237]],
            primaryAccent: [
                [248, 242, 255],
                [230, 214, 252],
                [191, 149, 251],
            ],
            error: [[230, 8, 13]],
            secondary: [[217, 19, 174]],
            secondaryAccent: [[200, 200, 255]],
            background: [
                [255, 255, 255],
                [247, 247, 248],
                [238, 238, 239],
                [232, 233, 235],
            ],
            foreground: [
                [5, 24, 41],
                [92, 104, 115],
                [143, 142, 155],
                [163, 168, 172],
            ],
        },
        dark: {
            error: [[255, 0, 0]],
            primary: [
                [248, 142, 255],
                [230, 214, 252],
                [191, 149, 251],
            ],
            divider: [[50, 56, 41]],
            primaryAccent: [
                [248, 242, 255],
                [230, 214, 252],
                [191, 149, 251],
            ],
            secondary: [[217, 19, 174]],
            secondaryAccent: [[200, 200, 255]],
            background: [
                [20, 20, 25],
                [246, 246, 246],
                [233, 233, 231],
                [228, 228, 228],
            ],
            foreground: [
                [245, 244, 241],
                [92, 104, 115],
                [143, 142, 155],
                [163, 168, 172],
            ],
        },
    },
    active: 'light',
    listeners: [],
};
const hashTheme = (theme) => {
    return hash_1.hash(theme.theme.light) + '' + hash_1.hash(theme.theme.dark);
};
exports.hashTheme = hashTheme;
// fonts
// initial theme version
let themeVersion = exports.hashTheme(theme);
const inverseTheme = () => {
    return theme.active === 'dark' ? 'light' : 'dark';
};
const isTouch = typeof window !== 'undefined' &&
    ('ontouchstart' in window || navigator.msMaxTouchPoints);
if (isTouch) {
    const htmlStyle = document.documentElement.style;
    const updateBg = () => {
        if (global.innerWidth < global.innerHeight) {
            htmlStyle.backgroundSize = 'auto 100vh';
        }
        else {
            htmlStyle.backgroundSize = '100vw auto';
        }
    };
    htmlStyle.backgroundPosition = 'center top';
    global.addEventListener('resize', updateBg);
    updateBg();
}
let firstSet = false;
const useTheme = (active) => {
    if (active === undefined) {
        if (typeof window !== 'undefined') {
            const isDark = global.matchMedia('(prefers-color-scheme: dark)').matches;
            active = isDark ? 'dark' : 'light';
        }
        else {
            active = 'dark';
        }
    }
    const [, update] = react_1.useReducer((x) => x + 1, 0);
    if (!firstSet) {
        theme.active = active;
        firstSet = true;
    }
    react_1.useEffect(() => {
        theme.listeners.push(update);
        return () => {
            theme.listeners = theme.listeners.filter((s) => s !== update);
        };
    }, []);
    if (typeof window !== undefined) {
        document.body.style.background = exports.useColor({ color: 'background' });
    }
    return themeVersion;
};
exports.useTheme = useTheme;
const useColor = (color) => {
    const { tone = 1, opacity = 1, color: c } = color || { color: 'foreground' };
    const selector = theme.theme[theme.active][c];
    const rgb = selector[tone - 1] || selector[selector.length - 1];
    if (opacity !== 1) {
        return `rgba(${rgb[0]},${rgb[1]},${rgb[2]}, ${opacity})`;
    }
    else {
        return `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;
    }
};
exports.useColor = useColor;
const getTheme = (label) => {
    return (label ? theme.theme[label] : theme.theme[theme.active]) || {};
};
exports.getTheme = getTheme;
const getTone = () => {
    return theme.active;
};
exports.getTone = getTone;
const updateTheme = (update) => {
    for (const key in update) {
        theme.theme[key] = update[key];
    }
    const newVersion = exports.hashTheme(theme);
    if (newVersion !== themeVersion) {
        themeVersion = newVersion;
        theme.listeners.forEach((update) => {
            update();
        });
    }
};
exports.updateTheme = updateTheme;
const switchTheme = (label) => {
    if (!label) {
        theme.active = inverseTheme();
    }
    else {
        theme.active = label;
    }
    theme.listeners.forEach((update) => {
        update();
    });
};
exports.switchTheme = switchTheme;
exports.default = theme;
//# sourceMappingURL=index.js.map