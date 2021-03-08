"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteWebSocket = exports.addWebSocket = exports.clientWebSockets = exports.DELETE_WEBSOCKET = exports.ADD_WEBSOCKET = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const createReducer_1 = require("../createReducer");
exports.ADD_WEBSOCKET = "ADD_WEBSOCKET";
exports.DELETE_WEBSOCKET = "DELETE_WEBSOCKET";
const handlers = {
    ADD_WEBSOCKET: (state, action) => state.set(action.payload.clientId, action.payload.ws),
    DELETE_WEBSOCKET: (state, action) => {
        state.delete(action.payload);
        return state;
    },
};
const clientWebSockets = (state = new Map(), action) => createReducer_1.createReducer(state, action, handlers);
exports.clientWebSockets = clientWebSockets;
exports.addWebSocket = toolkit_1.createAction(exports.ADD_WEBSOCKET);
exports.deleteWebSocket = toolkit_1.createAction(exports.DELETE_WEBSOCKET);
