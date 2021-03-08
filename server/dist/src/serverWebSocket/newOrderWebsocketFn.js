"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newOrderWebSocketMap = exports.bitMEXSnapshot = void 0;
const tslib_1 = require("tslib");
const ws_1 = tslib_1.__importDefault(require("ws"));
const axios_1 = tslib_1.__importDefault(require("axios"));
const binanceGetSnapshot = async (symbol) => {
    const url = `https://api.binance.com/api/v3/depth?symbol=${symbol.toUpperCase()}&limit=1000`;
    let lastUpdateId = 0;
    await axios_1.default.get(url)
        .then((response) => {
        lastUpdateId = response.data.lastUpdateId;
    })
        .catch(() => {
        return null;
    });
    return lastUpdateId;
};
const bitMEXSnapshot = async () => {
    let data = "";
    const url = `https://www.bitmex.com/api/v1/instrument?columns=symbol,tickSize&start=0&count=500`;
    await axios_1.default.get(url)
        .then((response) => {
        data = response.data;
    })
        .catch(() => {
        return null;
    });
    return data;
};
exports.bitMEXSnapshot = bitMEXSnapshot;
const binanceOrderSocketStart = async (time, symbol) => {
    const socket = new ws_1.default(`wss://stream.binance.com:9443/ws/${symbol}@depth`);
    const lastUpdateId = await binanceGetSnapshot(symbol);
    return {
        serverId: `BINANCE${symbol}${time}`,
        socket: socket,
        lastUpdateId: lastUpdateId,
    };
};
exports.newOrderWebSocketMap = new Map().set("BINANCE", (time, symbol) => binanceOrderSocketStart(time, symbol));
