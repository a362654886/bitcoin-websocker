"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialClientMap = exports.initialWebSockets = void 0;
const initialWebSockets = () => {
    return {
        binancebtcusdt1m: [],
        binancebtcusdt5m: [],
        binancebnbbtc1m: [],
        binancebnbbtc5m: [],
        bitmexxbtusd1m: [],
        bitmexxbtusd5m: [],
    };
};
exports.initialWebSockets = initialWebSockets;
const initialClientMap = () => {
    const newMap = new Map();
    newMap.set("binancebtcusdt1m", []);
    newMap.set("binancebtcusdt5m", []);
    newMap.set("binancebnbbtc1m", []);
    newMap.set("binancebnbbtc5m", []);
    newMap.set("bitmexxbtusd1m", []);
    newMap.set("bitmexxbtusd5m", []);
    return newMap;
};
exports.initialClientMap = initialClientMap;
