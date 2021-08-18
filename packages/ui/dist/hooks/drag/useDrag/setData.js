"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dist_1 = __importDefault(require("jsonexport/dist"));
const text_1 = require("@based/text");
const tarts_1 = __importDefault(require("tarts"));
const createFile = async (data, tar) => {
    let str;
    if (data.file) {
        let { name, mime, value } = data.file;
        if (mime === 'application/json' && typeof value !== 'string') {
            value = JSON.stringify(value, null, 2);
        }
        else if (mime === 'text/csv') {
            if (typeof value !== 'string') {
                value = await dist_1.default(value);
            }
        }
        if (tar) {
            return value;
        }
        str = `application/octet-stream:${name}:data:${mime};base64,${btoa(value)}`;
    }
    return str;
};
exports.default = async (dataTransfer, data) => {
    let fileString;
    if (data.length > 1) {
        data = data.filter((v) => !!v.file);
        if (data.length) {
            const mimes = new Set();
            for (const d of data) {
                mimes.add(d.file.mime);
            }
            let isSet = false;
            if (mimes.size === 1) {
                const mime = mimes.values().next().value;
                if (mime === 'text/csv') {
                    const value = [];
                    for (const d of data) {
                        value.push(d.file.value);
                    }
                    const str = await createFile({
                        file: {
                            name: `export-${data.length}-${Date.now()}.csv`,
                            value,
                            mime: 'text/csv',
                        },
                    });
                    dataTransfer.setData('DownloadURL', str);
                    isSet = true;
                }
                else if (mime === 'application/json') {
                    const value = [];
                    for (const d of data) {
                        value.push(d.file.value);
                    }
                    const str = await createFile({
                        file: {
                            name: `export-${data.length}-${Date.now()}.json`,
                            value,
                            mime: 'application/json',
                        },
                    });
                    dataTransfer.setData('DownloadURL', str);
                    isSet = true;
                }
            }
            if (!isSet) {
                const files = await Promise.all(data.map(async (v) => {
                    return {
                        name: v.file.name,
                        content: await createFile(v, true),
                    };
                }));
                const tar = tarts_1.default(files);
                const decoder = new TextDecoder('utf8');
                const b64encoded = btoa(decoder.decode(tar));
                const name = `export-${data.length}-${Date.now()}.tar`;
                const str = `application/octet-stream:${name}:data:${'application/tar'};base64,${b64encoded}`;
                dataTransfer.setData('DownloadURL', str);
            }
        }
    }
    else if (data.length) {
        if (data[0].file) {
            fileString = await createFile(data[0]);
            dataTransfer.setData('DownloadURL', fileString);
        }
        if (data[0].text) {
            dataTransfer.setData('text/plain', text_1.getStringValue(data[0].text));
        }
    }
};
//# sourceMappingURL=setData.js.map