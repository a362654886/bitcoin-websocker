"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeEnum = exports.ExchangeEnum = exports.TimeEnum = exports.SymbolEnum = void 0;
var SymbolEnum;
(function (SymbolEnum) {
    SymbolEnum["BTCUSDT"] = "btcusdt";
    SymbolEnum["BNBBTC"] = "bnbbtc";
    SymbolEnum["BNBBUSD"] = "bnbbusd";
    SymbolEnum["ETHBUSD"] = "ethbusd";
    SymbolEnum["XBTUSD"] = "XBTUSD";
})(SymbolEnum = exports.SymbolEnum || (exports.SymbolEnum = {}));
var TimeEnum;
(function (TimeEnum) {
    TimeEnum["oneMin"] = "1m";
    TimeEnum["threeMin"] = "3m";
    TimeEnum["fiveMin"] = "5m";
    TimeEnum["fifteenMin"] = "15m";
    TimeEnum["thirtyMin"] = "30m";
    TimeEnum["oneHour"] = "1h";
    TimeEnum["oneDay"] = "1d";
})(TimeEnum = exports.TimeEnum || (exports.TimeEnum = {}));
var ExchangeEnum;
(function (ExchangeEnum) {
    ExchangeEnum["BINANCE"] = "BINANCE";
    ExchangeEnum["BITMEX"] = "BITMEX";
})(ExchangeEnum = exports.ExchangeEnum || (exports.ExchangeEnum = {}));
var TypeEnum;
(function (TypeEnum) {
    TypeEnum["KLINE"] = "KLINE";
    TypeEnum["ORDER"] = "ORDER";
})(TypeEnum = exports.TypeEnum || (exports.TypeEnum = {}));
