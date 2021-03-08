"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSnapshot = exports.bitMEXOrderDataFormat = void 0;
const tslib_1 = require("tslib");
const initialFn_1 = require("../initialFn");
const axios_1 = tslib_1.__importDefault(require("axios"));
const createAction_1 = require("../redux/createAction");
const orderData_1 = require("../redux/duck/orderData");
const orderBody = {
    orderId: "",
    body: {
        bid: [["", ""], ["", ""], ["", ""], ["", ""], ["", ""]],
        ask: [["", ""], ["", ""], ["", ""], ["", ""], ["", ""]],
    },
};
const bitMEXOrderDataFormat = (data, symbol, store) => {
    if (data.action == "update") {
        data.data.forEach(async (order) => {
            if (order.side == "Sell") {
                const price = await priceFromID(order.id, symbol);
                //console.log(price/order.size);
                orderBody.orderId = `bitMEX${symbol}`;
                orderBody.body.bid.shift();
                orderBody.body.bid.push([(price * 0.1).toString(), order.size]);
                store.dispatch(createAction_1.createAction(orderBody, orderData_1.UPDATE_ORDER_DATA));
            }
            if (order.side == "Buy") {
                const price = await priceFromID(order.id, symbol);
                //console.log(price/order.size);
                orderBody.orderId = `bitMEX${symbol}`;
                orderBody.body.ask.shift();
                orderBody.body.ask.push([(price * 0.1).toString(), order.size]);
                store.dispatch(createAction_1.createAction(orderBody, orderData_1.UPDATE_ORDER_DATA));
            }
        });
    }
};
exports.bitMEXOrderDataFormat = bitMEXOrderDataFormat;
const getSnapshot = async () => {
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
exports.getSnapshot = getSnapshot;
const getInstrumentAndIdx = async (symbol) => {
    const instrument = initialFn_1.instrumentsList.find((i) => i.symbol === symbol);
    const instrumentIdx = initialFn_1.instrumentsList.indexOf(instrument);
    return [instrument, instrumentIdx];
};
const priceFromID = async (id, symbol) => {
    const [instrument, instrumentIdx] = await getInstrumentAndIdx(symbol);
    return (100000000 * instrumentIdx - id) * 0.1;
};
