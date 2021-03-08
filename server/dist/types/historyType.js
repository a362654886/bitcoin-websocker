"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transferStockType = exports.transferBitCoinType = void 0;
const transferBitCoinType = (params) => {
    const { symbol, interval, startTime, endTime } = params;
    const symbolPara = symbol === null || symbol === void 0 ? void 0 : symbol.toString().toLocaleUpperCase();
    const intervalPara = interval === null || interval === void 0 ? void 0 : interval.toString();
    const startTimePara = +new Date(startTime === null || startTime === void 0 ? void 0 : startTime.toString());
    const endTimePara = +new Date(endTime === null || endTime === void 0 ? void 0 : endTime.toString());
    return { symbolPara, intervalPara, startTimePara, endTimePara };
};
exports.transferBitCoinType = transferBitCoinType;
const transferStockType = (params) => {
    const { symbol, startTime, endTime } = params;
    const symbolPara = symbol === null || symbol === void 0 ? void 0 : symbol.toString().toLocaleUpperCase();
    const startTimePara = startTime;
    const endTimePara = endTime;
    return { symbolPara, startTimePara, endTimePara };
};
exports.transferStockType = transferStockType;
