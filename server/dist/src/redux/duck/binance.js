"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.update_binance = exports.binanceState = exports.UPDATE_BINANCE = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const createReducer_1 = require("../createReducer");
exports.UPDATE_BINANCE = "UPDATE_BINANCE";
const handlers = {
    UPDATE_BINANCE: (state, action) => {
        //  if time duplicate
        const exist = state.find((data) => data.time == action.payload.time);
        //return state
        if (exist == undefined) {
            state.push(action.payload);
        }
        return state;
    },
};
const binanceState = (state = [
    {
        time: `2021-02-03 19:02`,
        open_price: 35500,
        high_price: 35500,
        low_price: 35500,
        close_price: 35500,
    },
], action) => createReducer_1.createReducer(state, action, handlers);
exports.binanceState = binanceState;
exports.update_binance = toolkit_1.createAction(exports.UPDATE_BINANCE);
