"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const csvtojson_1 = __importDefault(require("csvtojson"));
const isBinary = (str) => /(image)|(video)|(bin)/.test(str);
async function readFile(file) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        if (file.type === 'application/gzip' || file.type === 'application/tar') {
            // extract and show!
            console.warn('TODO: gzip or tar - not extracted yet');
        }
        reader.addEventListener('load', (event) => {
            if (!isBinary(file.type) && typeof event.target.result === 'string') {
                const parsed = atob(event.target.result.split('base64,')[1]);
                if (file.type === 'text/csv') {
                    csvtojson_1.default()
                        .fromString(parsed)
                        .then((v) => {
                        resolve({
                            content: v,
                            name: file.name,
                            mime: file.type,
                        });
                    });
                }
                else {
                    resolve({
                        content: parsed,
                        name: file.name,
                        mime: file.type,
                    });
                }
            }
            else {
                resolve({
                    content: event.target.result,
                    name: file.name,
                    mime: file.type,
                });
            }
        });
        reader.readAsDataURL(file);
    });
}
exports.default = async (dataTransfer) => {
    return await Promise.all([...dataTransfer.files].map(readFile));
};
//# sourceMappingURL=readFiles.js.map