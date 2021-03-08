"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newWebSocketMap = void 0;
const tslib_1 = require("tslib");
const ws_1 = tslib_1.__importDefault(require("ws"));
const binanceSocketStart = (time, symbol) => {
    const socket = new ws_1.default(`wss://stream.binance.com:9443/ws/${symbol}@kline_${time}`);
    return {
        serverId: `binance${symbol}${time}`,
        socket: socket,
    };
};
const bitMEXSocketStart = (time, symbol) => {
    const socket = new ws_1.default(`wss://www.bitmex.com/realtime?subscribe=tradeBin${time},orderBookL2_25:${symbol}`);
    return {
        serverId: `bitmex${symbol}${time}`,
        socket: socket,
    };
};
exports.newWebSocketMap = new Map()
    .set("binance", binanceSocketStart)
    .set("bitMex", bitMEXSocketStart);
