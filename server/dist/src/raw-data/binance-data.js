"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_binance_data = exports.binance_start = void 0;
const tslib_1 = require("tslib");
const helpFn_1 = require("../helpFn");
const ws_1 = tslib_1.__importDefault(require("ws"));
let binance_data = {
    open_price: 0,
    close_price: 0,
    high_price: 0,
    low_price: 0,
    time: "1900-01-01"
};
const new_socket = (time) => new ws_1.default(`wss://stream.binance.com:9443/ws/btcusdt@kline_${time}`);
const listen_start = (socket) => {
    socket.onmessage = (event) => {
        binance_data = data_format(JSON.parse(event.data));
        // dispatch data 
        // middleware to broadcast 
    };
};
const data_format = (raw_data) => {
    var _a, _b, _c, _d;
    const _date = new Date(raw_data.k.t);
    return {
        open_price: (_a = raw_data === null || raw_data === void 0 ? void 0 : raw_data.k) === null || _a === void 0 ? void 0 : _a.o,
        close_price: (_b = raw_data === null || raw_data === void 0 ? void 0 : raw_data.k) === null || _b === void 0 ? void 0 : _b.c,
        high_price: (_c = raw_data === null || raw_data === void 0 ? void 0 : raw_data.k) === null || _c === void 0 ? void 0 : _c.h,
        low_price: (_d = raw_data === null || raw_data === void 0 ? void 0 : raw_data.k) === null || _d === void 0 ? void 0 : _d.l,
        time: helpFn_1.formatDate(_date)
    };
};
const binance_start = (time) => listen_start(new_socket(time));
exports.binance_start = binance_start;
const get_binance_data = () => binance_data;
exports.get_binance_data = get_binance_data;
