"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const theme_1 = require("@based/theme");
const Text_1 = require("../../Text");
const getData_1 = __importDefault(require("../getData"));
const icons_1 = require("@based/icons");
const Avatar_1 = __importDefault(require("../../Image/Avatar"));
const RowField = ({ field, data, isLarge, isHover }) => {
    let selectedData = getData_1.default(data, field.path);
    if (field.format) {
        selectedData = {
            value: selectedData,
            format: field.format,
        };
    }
    let Icon, iconProps;
    if (field.type === 'icon') {
        let iconName;
        if (selectedData && typeof selectedData === 'object') {
            iconName = selectedData.name;
            iconProps = selectedData;
        }
        else if (selectedData) {
            iconName = selectedData;
            iconProps = field;
        }
        Icon = icons_1.iconFromString(iconName);
    }
    return field.type === 'icon' ? (react_1.default.createElement("div", { style: {
            width: field.width,
        } }, Icon ? react_1.default.createElement(Icon, { ...iconProps }) : null)) : field.type === 'img' ? (field.avatar ? (react_1.default.createElement("div", { style: {
            minWidth: field.width,
        } },
        react_1.default.createElement(Avatar_1.default, { src: selectedData, size: 32, name: getData_1.default(data, field.textPath) }))) : (react_1.default.createElement("div", { style: {
            minWidth: field.width,
        } },
        react_1.default.createElement("div", { style: {
                width: isLarge ? 50 : 35,
                height: isLarge ? 50 : 35,
                backgroundColor: theme_1.useColor({ color: 'background', tone: 3 }),
                borderRadius: '50%',
                backgroundSize: 'cover',
                border: '1px solid ' + theme_1.useColor({ color: 'background', tone: 3 }),
                backgroundImage: `url(${selectedData})`,
            } })))) : (react_1.default.createElement(Text_1.Text, { noSelect: true, weight: field.bold ? 'semibold' : 'regular', singleLine: true, style: {
            width: field.width,
            paddingRight: 30,
            userSelect: 'none',
        } }, selectedData));
};
exports.default = RowField;
//# sourceMappingURL=RowField.js.map