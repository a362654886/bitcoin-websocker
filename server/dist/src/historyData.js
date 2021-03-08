"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOilHistory = exports.getStockHistory = exports.getBinanceHistory = void 0;
const tslib_1 = require("tslib");
const axios_1 = tslib_1.__importDefault(require("axios"));
const getBinanceHistory = async (symbol, intervel, startTime, endTime) => {
    let data = [];
    const url = `https://api.binance.com/api/v1/klines?symbol=${symbol}&interval=${intervel}&startTime=${startTime}&endTime=${endTime}`;
    await axios_1.default.get(url)
        .then((response) => {
        data = response.data.map((x) => [new Date(x[6]), x[4]]);
    })
        .catch(() => {
        return null;
    });
    return data;
};
exports.getBinanceHistory = getBinanceHistory;
const getStockHistory = async (symbol, startTime, endTime) => {
    let data = [];
    const url = `http://api.marketstack.com/v1/eod?access_key=bafe9c18c8ff0e0f9a4838215b11bb51&symbols=${symbol}&date_from=${startTime}&date_to=${endTime}`;
    await axios_1.default.get(url)
        .then((response) => {
        data = response.data.data.map((x) => [x.date, x.close]);
    })
        .catch(() => {
        return null;
    });
    return data;
};
exports.getStockHistory = getStockHistory;
const getOilHistory = async (startTime, endTime) => {
    let data = [];
    const from = new Date(startTime).getTime() / 1000;
    const to = new Date(endTime).getTime() / 1000;
    const url = `https://api.oilpriceapi.com/v1/prices?by_period[from]=${from}&by_period[to]=${to}`;
    console.log(url);
    await axios_1.default.get(url, {
        headers: {
            'Authorization': "Token 098c11895a4806b9704082e4bea53dd7",
            'Content-Type': "application/json"
        },
    })
        .then((response) => {
        data = response.data.data.map((x) => [x.date, x.close]);
    })
        .catch(() => {
        return null;
    });
    return data;
};
exports.getOilHistory = getOilHistory;
