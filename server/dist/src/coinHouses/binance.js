"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.binanceDataFormat = void 0;
const fomateDate_1 = require("./fomateDate");
// snack case
const binanceDataFormat = (rawData) => {
    var _a, _b, _c, _d;
    const _date = new Date(rawData.k.t);
    return {
        open_price: (_a = rawData === null || rawData === void 0 ? void 0 : rawData.k) === null || _a === void 0 ? void 0 : _a.o,
        close_price: (_b = rawData === null || rawData === void 0 ? void 0 : rawData.k) === null || _b === void 0 ? void 0 : _b.c,
        high_price: (_c = rawData === null || rawData === void 0 ? void 0 : rawData.k) === null || _c === void 0 ? void 0 : _c.h,
        low_price: (_d = rawData === null || rawData === void 0 ? void 0 : rawData.k) === null || _d === void 0 ? void 0 : _d.l,
        time: fomateDate_1.formatDate(_date),
    };
};
exports.binanceDataFormat = binanceDataFormat;
