"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newOrderWebSocketMap = void 0;
const tslib_1 = require("tslib");
const ws_1 = tslib_1.__importDefault(require("ws"));
const binanceOrderSocketStart = (time, symbol) => {
    const socket = new ws_1.default(`wss://stream.binance.com:9443/ws/${symbol}@depth`);
    //const lastUpdateId = await binanceGetSnapshot(symbol);
    return {
        serverType: `BINANCE${symbol}${time}`,
        socket: socket,
    };
};
const bitMEXOrderSocketStart = (time, symbol) => {
    const socket = new ws_1.default(`wss://www.bitmex.com/realtime?subscribe=tradeBin${time},orderBookL2_25:${symbol}`);
    return {
        serverType: `BITMEX${symbol}${time}`,
        socket: socket,
    };
};
exports.newOrderWebSocketMap = new Map()
    .set("BINANCE", (time, symbol) => binanceOrderSocketStart(time, symbol))
    .set("BITMEX", (time, symbol) => bitMEXOrderSocketStart(time, symbol));
