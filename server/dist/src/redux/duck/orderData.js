"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderData = exports.DELETE_ORDER_DATA = exports.UPDATE_ORDER_DATA = exports.ADD_ORDER_DATA = void 0;
const createReducer_1 = require("../createReducer");
exports.ADD_ORDER_DATA = "ADD_ORDER_DATA";
exports.UPDATE_ORDER_DATA = "UPDATE_ORDER_DATA";
exports.DELETE_ORDER_DATA = "DELETE_ORDER_DATA";
const handlers = {
    ADD_ORDER_DATA: (state, action) => {
        state.set(action.payload, {
            bid: [
                ["", ""],
                ["", ""],
                ["", ""],
                ["", ""],
                ["", ""],
            ],
            ask: [
                ["", ""],
                ["", ""],
                ["", ""],
                ["", ""],
                ["", ""],
            ],
        });
        return state;
    },
    UPDATE_ORDER_DATA: (state, action) => {
        state.delete(action.payload.serverType);
        state.set(action.payload.serverType, action.payload.body);
        return state;
    },
    DELETE_ORDER_DATA: (state, action) => {
        state.delete(action.payload);
        return state;
    }
};
const orderData = (state = new Map(), action) => createReducer_1.createReducer(state, action, handlers);
exports.orderData = orderData;
