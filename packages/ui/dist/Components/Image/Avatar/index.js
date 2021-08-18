"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const theme_1 = require("@based/theme");
const Text_1 = require("../../Text");
const parseName = (name) => {
    if (!name) {
        return '';
    }
    let str = '';
    const split = name.split(' ');
    for (const word of split) {
        if (word[0] < 'a') {
            str += word[0];
        }
    }
    if (!str) {
        for (const word of split) {
            str += word[0];
            if (str.length === 2) {
                return str;
            }
        }
    }
    return str;
};
const Avatar = ({ src, name = '', onClick, size = 40, }) => {
    const parsedName = parseName(name);
    return (react_1.default.createElement("div", { onClick: onClick, style: {
            cursor: onClick ? 'pointer' : 'default',
        } },
        react_1.default.createElement("div", { style: {
                width: size,
                height: size,
                borderRadius: '50%',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundImage: `url(${src})`,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: theme_1.useColor({ color: 'primary', tone: 2 }),
            } }, !src && parsedName ? (react_1.default.createElement(Text_1.Text, { weight: "semibold", style: {
                fontSize: (size < 32 ? 10 : size < 42 ? 13 : 16) + 'px',
            }, noSelect: true, color: { color: 'background' } }, parsedName)) : null)));
};
exports.default = Avatar;
//# sourceMappingURL=index.js.map