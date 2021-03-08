"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialFn = exports.instrumentsList = void 0;
const tslib_1 = require("tslib");
const ws_1 = tslib_1.__importDefault(require("ws"));
const qs_1 = tslib_1.__importDefault(require("qs"));
const lodash_1 = tslib_1.__importDefault(require("lodash"));
const enumType_1 = require("../types/enumType");
const exchange_1 = require("./coinHouses/exchange");
const binanceOrder_1 = require("./coinHouses/binanceOrder");
const bitMEXOrder_1 = require("./coinHouses/bitMEXOrder");
const webSocketMIddleware_1 = require("./redux/middleware/webSocketMIddleware");
exports.instrumentsList = [];
bitMEXOrder_1.getSnapshot().then((r) => {
    exports.instrumentsList = r;
});
const initialFn = (store) => {
    const webSocket = initialWebSocket(store);
    // move those two functions to middleware 
    initialServeSockets(store);
    initialOrderSockets(store);
    return webSocket;
};
exports.initialFn = initialFn;
const initialWebSocket = (store) => {
    const server = new ws_1.default.Server({ port: 8080 });
    server.on("connection", function connection(ws, req) {
        const url = req.url;
        // get id from url
        const prarms = qs_1.default.parse(lodash_1.default.split(url, "?")[1]); // token=xxxxxx
        // get id from token
        const { clientId, clientType } = JSON.parse(JSON.stringify(prarms));
        const clientData = {
            type: clientType,
            id: clientId,
        };
        //save client
        /*store.dispatch(
          createAction<ClientUpdate, ADD_CLIENT>(clientData, ADD_CLIENT)
        );*/
        // save ws
        webSocketMIddleware_1.clientWebSocketsAdd(clientId, ws);
        //receive mse
        // { "clientId":"111222", "coinType":"btcusdt", "timer":"1m","coinHouse":"BINANCE"}
        ws.on("message", async function incoming(message) {
            // get kline data
            // change type to topic
            const { type } = JSON.parse(message.toString());
            if (type) {
                clientData.type = type;
                /*store.dispatch(
                  createAction<ClientUpdate, UPDATE_CLIENT>(clientData, UPDATE_CLIENT)
                );*/
            }
        });
    });
    return server;
};
const initialServeSockets = (store) => {
    // binancebtcusdt1min
    exchange_1.initialExchange(enumType_1.ExchangeEnum.BINANCE, enumType_1.SymbolEnum.BTCUSDT, enumType_1.TimeEnum.oneMin, store);
    // binance btcusdt 5 min
    exchange_1.initialExchange(enumType_1.ExchangeEnum.BINANCE, enumType_1.SymbolEnum.BTCUSDT, enumType_1.TimeEnum.fiveMin, store);
    // binance bnbbtc 1 min
    exchange_1.initialExchange(enumType_1.ExchangeEnum.BINANCE, enumType_1.SymbolEnum.BNBBTC, enumType_1.TimeEnum.oneMin, store);
    // binance bnbbtc 5 min
    exchange_1.initialExchange(enumType_1.ExchangeEnum.BINANCE, enumType_1.SymbolEnum.BNBBTC, enumType_1.TimeEnum.fiveMin, store);
    // bitmex xbtusd 1 min
    /*initialExchange(
      ExchangeEnum.BITMEX,
      SymbolEnum.XBTUSD,
      TimeEnum.oneMin,
      store
    );
    // bitmex xbtusd 5 min
    initialExchange(
      ExchangeEnum.BITMEX,
      SymbolEnum.XBTUSD,
      TimeEnum.fiveMin,
      store
    );*/
};
const initialOrderSockets = (store) => {
    // binance btcusdt
    binanceOrder_1.initialOrderSocket(enumType_1.SymbolEnum.BTCUSDT, store);
    // binance bnbbtc
    binanceOrder_1.initialOrderSocket(enumType_1.SymbolEnum.BNBBTC, store);
    // bitmex order XBTUSD
    /*store.dispatch(
      createAction<string, ADD_ORDER_DATA>(`bitMEXXBTUSD`, ADD_ORDER_DATA)
    );*/
};
