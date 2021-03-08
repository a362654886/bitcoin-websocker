"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientWebSocketsMiddleWare = void 0;
const createAction_1 = require("../createAction");
const clientInterval_1 = require("../duck/clientInterval");
const clients_1 = require("../duck/clients");
const clientWebSocketsMiddleWare = (store) => (next) => async (action) => {
    next(action);
    if (action.type == clients_1.UPDATE_CLIENT || action.type == clients_1.ADD_CLIENT) {
        //find client's ws
        const ws = store.getState().clientWebSockets.get(action.payload.clientId);
        if (ws) {
            const intervalFn = setInterval(() => {
                // rx.js update 
                const data = store
                    .getState()
                    .serveData.get(`${action.payload.coinHouse.toLocaleLowerCase()}${action.payload.coinType}${action.payload.timer}`);
                // send data  
                ws.send(JSON.stringify(data));
            }, 2000);
            const clientInterval = {
                clientId: action.payload.clientId,
                interval: intervalFn,
            };
            // add interval
            store.dispatch(createAction_1.createAction(clientInterval, clientInterval_1.ADD_INTERVAL));
        }
    }
};
exports.clientWebSocketsMiddleWare = clientWebSocketsMiddleWare;
