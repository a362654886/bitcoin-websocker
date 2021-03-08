"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSnapshot = exports.bitMEXOrderDataFormat = exports.binanceOrderDataFormat = exports.orderFormatFns = void 0;
const tslib_1 = require("tslib");
const axios_1 = tslib_1.__importDefault(require("axios"));
exports.orderFormatFns = new Map()
    .set("BINANCE", (data, symbol, time) => exports.binanceOrderDataFormat(data, symbol, time))
    .set("BITMEX", (data, symbol, time) => exports.bitMEXOrderDataFormat(data, symbol, time));
//binance
const binanceOrderDataFormat = (data, symbol, time) => {
    const bidArr = data.b.filter((b) => b[1] != "0.00000000");
    const askArr = data.a.filter((a) => a[1] != "0.00000000");
    return {
        serverType: `BINANCE${symbol}${time}`,
        body: {
            bid: bidArr.slice(0, 10),
            ask: askArr.slice(0, 10),
        },
    };
};
exports.binanceOrderDataFormat = binanceOrderDataFormat;
//bitmex
const orderBody = {
    serverType: "",
    body: {
        bid: [
            ["", ""],
            ["", ""],
            ["", ""],
            ["", ""],
            ["", ""],
            ["", ""],
            ["", ""],
            ["", ""],
            ["", ""],
            ["", ""],
        ],
        ask: [
            ["", ""],
            ["", ""],
            ["", ""],
            ["", ""],
            ["", ""],
            ["", ""],
            ["", ""],
            ["", ""],
            ["", ""],
            ["", ""],
        ],
    },
};
const bitMEXOrderDataFormat = async (data, symbol, time) => {
    if (data.table == "orderBookL2_25" && data.action == "update") {
        let result = null;
        for (let i = 0; i < data.data.length; i++) {
            const price = await priceFromID(data.data[i].id, symbol);
            if (data.data[i].side == "Sell" && price) {
                orderBody.serverType = `BITMEX${symbol}${time}`;
                orderBody.body.bid.shift();
                orderBody.body.bid.push([(price * 0.1).toString(), data.data[i].size]);
                result = orderBody;
            }
            else if (data.data[i].side == "Buy" && price) {
                orderBody.serverType = `BITMEX${symbol}${time}`;
                orderBody.body.ask.shift();
                orderBody.body.ask.push([(price * 0.1).toString(), data.data[i].size]);
                result = orderBody;
            }
        }
        return result;
    }
    else {
        return null;
    }
};
exports.bitMEXOrderDataFormat = bitMEXOrderDataFormat;
const priceFromID = async (id, symbol) => {
    const result = await getInstrumentAndIdx(symbol);
    if (result) {
        const [instrument, instrumentIdx] = result;
        return (100000000 * instrumentIdx - id) * 0.1;
    }
    else {
        return null;
    }
};
const getInstrumentAndIdx = async (symbol) => {
    const instrumentsList = await exports.getSnapshot();
    const instrument = instrumentsList.find((i) => i.symbol === symbol);
    if (instrument) {
        const instrumentIdx = instrumentsList.indexOf(instrument);
        return [instrument, instrumentIdx];
    }
    else {
        return null;
    }
};
const getSnapshot = async () => {
    let data = [];
    const url = `https://www.bitmex.com/api/v1/instrument?columns=symbol,tickSize&start=0&count=500`;
    await axios_1.default.get(url)
        .then((response) => {
        data = response.data;
    })
        .catch((e) => {
        //console.log(e);
    });
    return data;
};
exports.getSnapshot = getSnapshot;
