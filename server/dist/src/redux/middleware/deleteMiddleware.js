"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMiddleware = void 0;
const createAction_1 = require("../createAction");
const klineData_1 = require("../duck/klineData");
const orderData_1 = require("../duck/orderData");
const subscription_1 = require("../duck/subscription");
const serverWsMiddleware_1 = require("./serverWsMiddleware");
const deleteMiddleware = (store) => (next) => async (action) => {
    next(action);
    if (action.type == subscription_1.DELETE_SUBSCRIPTION) {
        // delete subscription
        for (const [key] of store.getState().subscription) {
            const set = store.getState().subscription.get(key);
            if ((set === null || set === void 0 ? void 0 : set.size) == 0) {
                store.dispatch(createAction_1.createAction(key, subscription_1.DELETE_SUBSCRIPTION_TYPE));
            }
        }
    }
    if (action.type == subscription_1.DELETE_SUBSCRIPTION_TYPE) {
        // close websocket
        const klineSocket = serverWsMiddleware_1.serverKlineWebSockets.get(action.payload);
        const orderSocket = serverWsMiddleware_1.serverOrderWebSockets.get(action.payload);
        if (klineSocket) {
            klineSocket.close();
        }
        if (orderSocket) {
            orderSocket.close();
        }
        //delete websocket
        serverWsMiddleware_1.serverKlineWebSockets.delete(action.payload);
        serverWsMiddleware_1.serverOrderWebSockets.delete(action.payload);
        //delete data
        store.dispatch(createAction_1.createAction(action.payload, klineData_1.DELETE_KLINE_DATA));
        store.dispatch(createAction_1.createAction(action.payload, orderData_1.DELETE_ORDER_DATA));
    }
};
exports.deleteMiddleware = deleteMiddleware;
