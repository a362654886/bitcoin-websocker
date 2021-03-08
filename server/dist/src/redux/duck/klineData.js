"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.klineData = exports.DELETE_KLINE_DATA = exports.ADD_KLINE_DATA = void 0;
const createReducer_1 = require("../createReducer");
exports.ADD_KLINE_DATA = "ADD_KLINE_DATA";
exports.DELETE_KLINE_DATA = "DELETE_KLINE_DATA";
const handlers = {
    ADD_KLINE_DATA: (state, action) => {
        //if map have this key
        const typeExist = state.has(action.payload.serverType);
        // add clientId
        if (typeExist) {
            state.delete(action.payload.serverType);
        }
        state.set(action.payload.serverType, action.payload.Kline);
        return state;
    },
    DELETE_KLINE_DATA: (state, action) => {
        state.delete(action.payload);
        return state;
    }
};
const klineData = (state = new Map(), action) => createReducer_1.createReducer(state, action, handlers);
exports.klineData = klineData;
