"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientWsMiddleware = exports.clientWebSocketsAdd = void 0;
const subscription_1 = require("../duck/subscription");
const service_1 = require("../../service/service");
const clientWebSockets = new Map();
const clientWebSocketsAdd = (id, ws) => {
    clientWebSockets.set(id, ws);
};
exports.clientWebSocketsAdd = clientWebSocketsAdd;
const clientWsMiddleware = (store) => (next) => async (action) => {
    next(action);
    // send data
    if (action.type == subscription_1.ADD_SUBSCRIPTION) {
        const service = await service_1.getService(action.payload.subscriptionType.exchange, action.payload.subscriptionType.symbol, action.payload.subscriptionType.time);
        const ws = clientWebSockets.get(action.payload.clientId);
        const typeString = `${action.payload.subscriptionType.exchange}${action.payload.subscriptionType.symbol}${action.payload.subscriptionType.time}`;
        //send Kline
        service.kline.add((kline) => {
            const body = {
                type: typeString,
                kline: kline,
            };
            if (kline) {
                // if subscription
                const type = typeString;
                const set = store.getState().subscription.get(type);
                const exist = set === null || set === void 0 ? void 0 : set.has(action.payload.clientId);
                if (exist) {
                    ws.send(JSON.stringify(body));
                }
            }
        }, action.payload.clientId, typeString);
        //send order
        service.order.add((order) => {
            const body = {
                type: `${order.serverType}`,
                order: order.body,
            };
            const type = typeString;
            const set = store.getState().subscription.get(type);
            const exist = set === null || set === void 0 ? void 0 : set.has(action.payload.clientId);
            if (exist) {
                ws.send(JSON.stringify(body));
            }
        }, action.payload.clientId, typeString);
    }
    if (action.type == subscription_1.DELETE_SUBSCRIPTION) {
        const service = await service_1.getService(action.payload.subscriptionType.exchange, action.payload.subscriptionType.symbol, action.payload.subscriptionType.time);
        //delete client
        service.kline.delete(action.payload.clientId, `${action.payload.subscriptionType.exchange}${action.payload.subscriptionType.symbol}${action.payload.subscriptionType.time}`);
        service.order.delete(action.payload.clientId, `${action.payload.subscriptionType.exchange}${action.payload.subscriptionType.symbol}${action.payload.subscriptionType.time}`);
    }
};
exports.clientWsMiddleware = clientWsMiddleware;
