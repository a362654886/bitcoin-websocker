"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDate = exports.bitMEXDataFormat = exports.binanceDataFormat = exports.getKlineData = void 0;
const enumType_1 = require("../../types/enumType");
const getKlineData = (eventData, exchange, symbol) => {
    switch (exchange) {
        case enumType_1.ExchangeEnum.BINANCE:
            return exports.binanceDataFormat(JSON.parse(eventData));
        case enumType_1.ExchangeEnum.BITMEX:
            //get kline data
            if (JSON.parse(eventData)) {
                return exports.bitMEXDataFormat(JSON.parse(eventData), symbol);
            }
            else {
                return null;
            }
            //get order data
            /*if (JSON.parse(eventData).table == "orderBookL2_25") {
              bitMEXOrderDataFormat(JSON.parse(eventData), symbol, store);
            }*/
            break;
        default:
            return null;
    }
};
exports.getKlineData = getKlineData;
const binanceDataFormat = (rawData) => {
    var _a, _b, _c, _d, _e;
    const _date = new Date(rawData.k.t);
    return {
        open_price: (_a = rawData === null || rawData === void 0 ? void 0 : rawData.k) === null || _a === void 0 ? void 0 : _a.o,
        close_price: (_b = rawData === null || rawData === void 0 ? void 0 : rawData.k) === null || _b === void 0 ? void 0 : _b.c,
        high_price: (_c = rawData === null || rawData === void 0 ? void 0 : rawData.k) === null || _c === void 0 ? void 0 : _c.h,
        low_price: (_d = rawData === null || rawData === void 0 ? void 0 : rawData.k) === null || _d === void 0 ? void 0 : _d.l,
        volume: (_e = rawData === null || rawData === void 0 ? void 0 : rawData.k) === null || _e === void 0 ? void 0 : _e.v,
        time: exports.formatDate(_date),
    };
};
exports.binanceDataFormat = binanceDataFormat;
const bitMEXDataFormat = (raw_data, symbol) => {
    if (raw_data.data && (raw_data === null || raw_data === void 0 ? void 0 : raw_data.data[0].symbol) == symbol && (raw_data === null || raw_data === void 0 ? void 0 : raw_data.data[0].open)) {
        console.log(raw_data === null || raw_data === void 0 ? void 0 : raw_data.data[0]);
        return {
            open_price: raw_data === null || raw_data === void 0 ? void 0 : raw_data.data[0].open,
            close_price: raw_data === null || raw_data === void 0 ? void 0 : raw_data.data[0].close,
            high_price: raw_data === null || raw_data === void 0 ? void 0 : raw_data.data[0].high,
            low_price: raw_data === null || raw_data === void 0 ? void 0 : raw_data.data[0].low,
            volume: 0,
            time: raw_data === null || raw_data === void 0 ? void 0 : raw_data.data[0].timestamp,
        };
    }
    else {
        return null;
    }
};
exports.bitMEXDataFormat = bitMEXDataFormat;
const formatDate = (date) => {
    const y = date.getFullYear();
    const m = date.getMonth() + 1;
    const month = m < 10 ? "0" + m : m;
    const d = date.getDate();
    const day = d < 10 ? "0" + d : d;
    const h = date.getHours();
    const minute = date.getMinutes();
    const _minute = minute < 10 ? "0" + minute : minute;
    const second = date.getSeconds();
    const _second = minute < 10 ? "0" + second : second;
    return y + "-" + month + "-" + day + " " + h + ":" + _minute + ":" + _second;
};
exports.formatDate = formatDate;
