"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getData = exports.buildCoinHouse = void 0;
const clientType_1 = require("../../types/clientType");
const binance_1 = require("./binance");
const bitMEX_1 = require("./bitMEX");
const buildCoinHouse = (client) => {
    const { timer, coinType, coinHouse } = client;
    switch (coinHouse) {
        case clientType_1.CoinHouse.BINANCE:
            return binance_1.binanceSocketStart(timer, coinType);
        case clientType_1.CoinHouse.BITMEX:
            return bitMEX_1.bitMEXSocketStart(timer, coinType);
    }
};
exports.buildCoinHouse = buildCoinHouse;
const getData = (eventData, coinHouse, coinType, id) => {
    const klineObj = {
        id: "",
        Kline: {
            open_price: 0,
            close_price: 0,
            high_price: 0,
            low_price: 0,
            time: "0",
        },
    };
    switch (coinHouse) {
        case clientType_1.CoinHouse.BINANCE:
            klineObj.id = id;
            klineObj.Kline = binance_1.binanceDataFormat(JSON.parse(eventData));
            break;
        case clientType_1.CoinHouse.BITMEX:
            if (JSON.parse(eventData)) {
                klineObj.id = id;
                klineObj.Kline = bitMEX_1.bitMEXDataFormat(JSON.parse(eventData), coinType);
            }
    }
    return klineObj;
};
exports.getData = getData;
