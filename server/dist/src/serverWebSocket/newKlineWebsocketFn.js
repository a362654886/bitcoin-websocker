"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newKlineWebSocketMap = void 0;
const tslib_1 = require("tslib");
const ws_1 = tslib_1.__importDefault(require("ws"));
const binanceKlineSocketStart = (time, symbol) => {
    const socket = new ws_1.default(`wss://stream.binance.com:9443/ws/${symbol}@kline_${time}`);
    return {
        serverType: `BINANCE${symbol}${time}`,
        socket: socket,
    };
};
const bitMEXKlineSocketStart = (time, symbol) => {
    const socket = new ws_1.default(`wss://www.bitmex.com/realtime?subscribe=tradeBin${time},orderBookL2_25:${symbol}`);
    return {
        serverType: `BITMEX${symbol}${time}`,
        socket: socket,
    };
};
exports.newKlineWebSocketMap = new Map()
    .set("BINANCE", (time, symbol) => binanceKlineSocketStart(time, symbol))
    .set("BITMEX", (time, symbol) => bitMEXKlineSocketStart(time, symbol));
