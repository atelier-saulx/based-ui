"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSelectionBlockIndex = exports.parseDateString = exports.parseTimeString = exports.validTime = exports.timestampToDateString = exports.milisecondsToTimeString = exports.dateValueToTimestamp = exports.timeValueToMiliseconds = void 0;
const timeValueToMiliseconds = (value) => {
    if (!value)
        return null;
    const re = /(\d{1,2}):(\d{1,2}):?(\d{1,2})?/;
    if (typeof value === 'object' && value.getMonth) {
        return value.getTime();
    }
    else if (typeof value === 'string' && re.test(value)) {
        const m = re.exec(value);
        return new Date(new Date(null).setUTCHours(parseInt(m[1]), parseInt(m[2]), m[3] ? parseInt(m[3]) : 0)).getTime();
    }
    else if (typeof value === 'number') {
        return value;
    }
    else {
        throw new Error('value must be Date (UTC), milliseconds or HH:MM|HH:MM:SS string.');
        console.error('got:', value);
    }
};
exports.timeValueToMiliseconds = timeValueToMiliseconds;
const dateValueToTimestamp = (value) => {
    if (!value)
        return null;
    const re = /(\d{1,2})([/-])?(\d{1,2})?([/-])?(\d{1,5})?/;
    if (typeof value === 'object' && value.getMonth) {
        return value.getTime();
    }
    else if (typeof value === 'string' && re.test(value)) {
        const m = re.exec(value);
        return new Date(parseInt(m[5]), parseInt(m[3]) - 1, parseInt(m[1])).getTime();
    }
    else if (typeof value === 'number') {
        return value;
    }
    else {
        console.error('got:', value);
        throw new Error('value must be Date , timestamp or DD/MM/YYYY string.');
    }
};
exports.dateValueToTimestamp = dateValueToTimestamp;
const milisecondsToTimeString = (miliseconds, useSeconds) => {
    if (!miliseconds)
        return null;
    const date = new Date(miliseconds);
    let tempString = ('0' + date.getUTCHours()).slice(-2) +
        ':' +
        ('0' + date.getUTCMinutes()).slice(-2);
    if (useSeconds) {
        tempString += ':' + ('0' + date.getUTCSeconds()).slice(-2);
    }
    return tempString;
};
exports.milisecondsToTimeString = milisecondsToTimeString;
const timestampToDateString = (timestamp) => {
    if (!timestamp)
        return null;
    const date = new Date(timestamp);
    return (('0' + date.getDate()).slice(-2) +
        '/' +
        ('0' + (date.getMonth() + 1)).slice(-2) +
        '/' +
        date.getFullYear());
};
exports.timestampToDateString = timestampToDateString;
const validTime = (hours, minutes, seconds, useSeconds) => Number(hours) >= 0 &&
    Number(hours) <= 23 &&
    Number(minutes) >= 0 &&
    Number(minutes) <= 59 &&
    (!useSeconds || seconds === undefined || Number(seconds)) >= 0 &&
    (!useSeconds || seconds === undefined || Number(seconds)) <= 59;
exports.validTime = validTime;
const parseTimeString = (value, useSeconds) => {
    let tempString = '';
    let valid = false;
    let milliseconds;
    const re = useSeconds
        ? /(\d{1,2})(:)?(\d{1,2})?(:)?(\d{1,3})?/gm
        : /(\d{1,2})(:)?(\d{1,2})?/gm;
    const m = re.exec(value);
    if (m) {
        let hours = m[1];
        const firstCollon = m[2];
        let minutes = m[3];
        const secondCollon = m[4];
        let seconds = m[5];
        if (m) {
            if (parseInt(hours) > 23)
                hours = '23';
            if (parseInt(minutes) > 59)
                minutes = '59';
            if (useSeconds && parseInt(seconds) > 59)
                seconds = '59';
            tempString = hours;
            if (minutes || firstCollon)
                tempString += ':';
            tempString += minutes || '';
            if (useSeconds) {
                if (seconds || secondCollon)
                    tempString += ':';
                tempString += seconds || '';
            }
            valid = !minutes || exports.validTime(hours, minutes, seconds, useSeconds);
            if (valid) {
                milliseconds =
                    valid &&
                        new Date(null).setUTCHours(parseInt(hours), parseInt(minutes), useSeconds ? parseInt(seconds) : null);
            }
            else {
                tempString = '';
            }
        }
    }
    return {
        valid,
        formatedString: tempString,
        milliseconds: !isNaN(milliseconds) ? milliseconds : null,
    };
};
exports.parseTimeString = parseTimeString;
const parseDateString = (value) => {
    let tempString = '';
    let valid = false;
    let timestamp;
    const re = /(\d{1,2})([/-])?(\d{1,2})?([/-])?(\d{1,5})?/gm;
    const m = re.exec(value);
    if (m) {
        let day = m[1];
        const firstSlash = m[2];
        let month = m[3];
        const secondSlash = m[4];
        const year = m[5];
        if (m) {
            if (parseInt(day) > 31)
                day = '31';
            if (parseInt(month) > 12)
                month = '12';
            tempString = day;
            if (month || firstSlash)
                tempString += '/';
            tempString += month || '';
            if (year || secondSlash)
                tempString += '/';
            tempString += year || '';
            const tempDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
            valid = !month || !year || !isNaN(tempDate.getTime());
            if (valid) {
                timestamp = valid && tempDate.getTime();
            }
            else {
                tempString = '';
            }
        }
    }
    return {
        valid,
        formatedString: tempString,
        timestamp,
    };
};
exports.parseDateString = parseDateString;
const getSelectionBlockIndex = (el, blocks) => {
    const selectionStart = el.selectionStart;
    return blocks.findIndex((b) => selectionStart >= b[0] && selectionStart <= b[1]);
};
exports.getSelectionBlockIndex = getSelectionBlockIndex;
//# sourceMappingURL=dateTimeFunctions.js.map