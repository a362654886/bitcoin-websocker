"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscription = exports.formatDate = exports.initial_web_socket = void 0;
const type_1 = require("../types/type");
const app_1 = require("./app");
const binanceData_1 = require("./raw-data/binanceData");
const binanceOrder_1 = require("./raw-data/binanceOrder");
const bitMEXData_1 = require("./raw-data/bitMEXData");
const initial_web_socket = (time) => {
    // start listen binance data
    binanceData_1.binanceStart(time);
    // start listen bitMEX data
    bitMEXData_1.bitMEXStart(time);
    // start listen binance order data
    binanceOrder_1.binanceOrderStart();
};
exports.initial_web_socket = initial_web_socket;
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
const subscription = (type) => {
    switch (type) {
        case type_1.BourseType.BINANCE:
            return {
                binanceState: app_1.store.getState().binanceState,
                binanceOrderState: app_1.store.getState().binanceOrderState,
            };
        case type_1.BourseType.BITMEX:
            return {
                bitMEXState: app_1.store.getState().bitMEXState,
            };
    }
};
exports.subscription = subscription;
