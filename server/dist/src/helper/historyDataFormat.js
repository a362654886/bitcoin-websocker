"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.historyDataFormat = void 0;
const historyDataFormat = (rawArr) => {
    const result = [];
    rawArr.forEach((value) => {
        const obj = {
            time: value[0],
            open: value[1],
            high: value[2],
            low: value[3],
            close: value[4],
            volume: value[5]
        };
        result.push(obj);
    });
    return result;
};
exports.historyDataFormat = historyDataFormat;
