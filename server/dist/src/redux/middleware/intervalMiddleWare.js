"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.intervalMiddleWare = void 0;
const clients_1 = require("../duck/clients");
const createAction_1 = require("../createAction");
const clientInterval_1 = require("../duck/clientInterval");
const intervalMiddleWare = (store) => (next) => async (action) => {
    next(action);
    if (action.type == clients_1.UPDATE_CLIENT) {
        //delete client interval and will add another interval when client try to get data
        const interval = store.getState().clientIntervals.get(action.payload.clientId);
        clearInterval(interval);
        store.dispatch(createAction_1.createAction(action.payload.clientId, clientInterval_1.DELETE_INTERVAL));
    }
    if (action.type == clients_1.DELETE_CLIENT) {
        const interval = store.getState().clientIntervals.get(action.payload);
        clearInterval(interval);
        store.dispatch(createAction_1.createAction(action.payload, clientInterval_1.DELETE_INTERVAL));
    }
};
exports.intervalMiddleWare = intervalMiddleWare;
