"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sockets = exports.DELETE_SOCKET = exports.ADD_SOCKET = void 0;
const createReducer_1 = require("../createReducer");
exports.ADD_SOCKET = "ADD_SOCKET";
exports.DELETE_SOCKET = "DELETE_SOCKET";
const handlers = {
    ADD_SOCKET: (state, action) => state.set(action.payload.serverId, action.payload.socket),
    DELETE_SOCKET: (state, action) => {
        const socket = state.get(action.payload);
        if (socket) {
            socket.close();
        }
        state.delete(action.payload);
        return state;
    },
};
const sockets = (state = new Map(), action) => createReducer_1.createReducer(state, action, handlers);
exports.sockets = sockets;
