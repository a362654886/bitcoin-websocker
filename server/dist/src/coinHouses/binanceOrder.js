"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialOrderSocket = void 0;
const tslib_1 = require("tslib");
const createAction_1 = require("../redux/createAction");
const orderData_1 = require("../redux/duck/orderData");
const axios_1 = tslib_1.__importDefault(require("axios"));
const ws_1 = tslib_1.__importDefault(require("ws"));
const initialOrderSocket = (symbol, store) => socketStart(newSocket(symbol, store), symbol, store);
exports.initialOrderSocket = initialOrderSocket;
const getSnapshot = async (symbol) => {
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
const newSocket = (symbol, store) => {
    const socket = new ws_1.default(`wss://stream.binance.com:9443/ws/${symbol}@depth`);
    socket.onopen = (event) => {
        store.dispatch(createAction_1.createAction(`binance${symbol}`, orderData_1.ADD_ORDER_DATA));
    };
    return socket;
};
const socketStart = async (socket, symbol, store) => {
    const lastUpdateId = await getSnapshot(symbol);
    let first_process = null;
    socket.onmessage = (event) => {
        JSON.parse(event.data);
        if (!first_process) {
            first_process = getFirstProcess(JSON.parse(event.data), lastUpdateId);
        }
        else {
            const orderBody = {
                orderId: `binance${symbol}`,
                body: dataFormat(JSON.parse(event.data)),
            };
            store.dispatch(createAction_1.createAction(orderBody, orderData_1.UPDATE_ORDER_DATA));
        }
    };
};
const getFirstProcess = (raw_data, lastUpdateId) => {
    let first_process = null;
    if (raw_data.u > lastUpdateId) {
        if (raw_data.U <= lastUpdateId + 1 && raw_data.u >= lastUpdateId + 1) {
            console.log("*********");
            first_process = raw_data;
        }
    }
    return first_process;
};
const dataFormat = (raw_data) => {
    const bidArr = raw_data.b.filter((b) => b[1] != "0.00000000");
    const askArr = raw_data.a.filter((a) => a[1] != "0.00000000");
    return {
        bid: bidArr.slice(0, 5),
        ask: askArr.slice(0, 5),
    };
};
