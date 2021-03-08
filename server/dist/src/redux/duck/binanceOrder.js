"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.update_binance = exports.binanceOrderState = exports.UPDATE_BINANCE_ORDER = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const createReducer_1 = require("../createReducer");
exports.UPDATE_BINANCE_ORDER = "UPDATE_BINANCE_ORDER";
const handlers = {
    UPDATE_BINANCE_ORDER: (state, action) => action.payload,
};
const binanceOrderState = (state = {
    bid: [],
    ask: [],
}, action) => createReducer_1.createReducer(state, action, handlers);
exports.binanceOrderState = binanceOrderState;
exports.update_binance = toolkit_1.createAction(exports.UPDATE_BINANCE_ORDER);
