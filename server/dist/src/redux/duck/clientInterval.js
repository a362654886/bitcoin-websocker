"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteInterval = exports.addInterval = exports.clientIntervals = exports.DELETE_INTERVAL = exports.ADD_INTERVAL = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const createReducer_1 = require("../createReducer");
exports.ADD_INTERVAL = "ADD_INTERVAL";
exports.DELETE_INTERVAL = "DELETE_INTERVAL";
const handlers = {
    ADD_INTERVAL: (state, action) => state.set(action.payload.clientId, action.payload.interval),
    DELETE_INTERVAL: (state, action) => {
        const interval = state.get(action.payload);
        if (interval) {
            clearInterval(interval);
        }
        state.delete(action.payload);
        return state;
    },
};
const clientIntervals = (state = new Map(), action) => createReducer_1.createReducer(state, action, handlers);
exports.clientIntervals = clientIntervals;
exports.addInterval = toolkit_1.createAction(exports.ADD_INTERVAL);
exports.deleteInterval = toolkit_1.createAction(exports.DELETE_INTERVAL);
