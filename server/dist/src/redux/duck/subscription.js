"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscription = exports.INIT = exports.DELETE_SUBSCRIPTION = exports.ADD_SUBSCRIPTION = void 0;
const createReducer_1 = require("../createReducer");
exports.ADD_SUBSCRIPTION = "ADD_SUBSCRIPTION";
exports.DELETE_SUBSCRIPTION = "DELETE_SUBSCRIPTION";
exports.INIT = "@@redux/INIT";
const handlers = {
    ADD_SUBSCRIPTION: (state, action) => {
        const key = `${action.payload.subscriptionType.exchange}${action.payload.subscriptionType.symbol}${action.payload.subscriptionType.time}`;
        //if map have this key
        const typeExist = state.has(key);
        // add clientId
        if (typeExist) {
            const mapSet = state.get(key);
            mapSet.add(action.payload.clientId);
        }
        else {
            const newSet = new Set();
            newSet.add(action.payload.clientId);
            state.set(key, newSet);
        }
        const newState = new Map(state);
        return newState;
    },
    DELETE_SUBSCRIPTION: (state, action) => {
        const key = `${action.payload.subscriptionType.exchange}${action.payload.subscriptionType.symbol}${action.payload.subscriptionType.time}`;
        const set = state.get(key);
        set === null || set === void 0 ? void 0 : set.delete(action.payload.clientId);
        const newState = new Map(state);
        return newState;
    },
};
const subscription = (state = new Map(), action) => createReducer_1.createReducer(state, action, handlers);
exports.subscription = subscription;
