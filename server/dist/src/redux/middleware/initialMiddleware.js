"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialMiddleware = void 0;
const tslib_1 = require("tslib");
const ws_1 = tslib_1.__importDefault(require("ws"));
const qs_1 = tslib_1.__importDefault(require("qs"));
const lodash_1 = tslib_1.__importDefault(require("lodash"));
const createAction_1 = require("../createAction");
const subscription_1 = require("../duck/subscription");
const clientWsMiddleware_1 = require("./clientWsMiddleware");
const initialMiddleware = (store) => (next) => async (action) => {
    next(action);
    if (action.type == "@@redux/INIT") {
        const server = new ws_1.default.Server({ port: 8080 });
        //ws://localhost:8080/ws?clientId=111222&exchange=BINANCE&symbol=bnbbtc&time=1m
        server.on("connection", function connection(ws, req) {
            const url = req.url;
            // get param from url
            const parameters = qs_1.default.parse(lodash_1.default.split(url, "?")[1]); // token=xxxxxx
            // get data from token
            const { clientId, exchange, symbol, time } = JSON.parse(JSON.stringify(parameters));
            const subscription = {
                subscriptionType: {
                    symbol: symbol,
                    time: time,
                    exchange: exchange,
                },
                clientId: clientId,
            };
            //add subscription
            store.dispatch(createAction_1.createAction(subscription, subscription_1.ADD_SUBSCRIPTION));
            //receive mse then update subscription
            // { "exchange":"BINANCE", "symbol":"btcusdt", "time":"1m","type":"update"}
            // { "exchange":"BINANCE", "symbol":"btcusdt", "time":"1m","type":"delete"}
            ws.on("message", async function incoming(message) {
                // change type to topic
                const { exchange, symbol, time, type } = JSON.parse(message.toString());
                if (type == "delete") {
                    store.dispatch(createAction_1.createAction({
                        subscriptionType: {
                            symbol: symbol,
                            time: time,
                            exchange: exchange,
                        },
                        clientId: clientId,
                    }, subscription_1.DELETE_SUBSCRIPTION));
                }
                else {
                    store.dispatch(createAction_1.createAction({
                        subscriptionType: {
                            symbol: symbol,
                            time: time,
                            exchange: exchange,
                        },
                        clientId: clientId,
                    }, subscription_1.ADD_SUBSCRIPTION));
                }
            });
            // save ws
            clientWsMiddleware_1.clientWebSocketsAdd(clientId, ws);
        });
    }
};
exports.initialMiddleware = initialMiddleware;
