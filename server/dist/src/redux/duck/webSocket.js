"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.webSockets = exports.ADD_WEBSOCKET = exports.UPDATE_WEBSOCKET = void 0;
const createReducer_1 = require("../createReducer");
const webSockets_1 = require("../../../types/webSockets");
exports.UPDATE_WEBSOCKET = "UPDATE_WEBSOCKET";
exports.ADD_WEBSOCKET = "ADD_WEBSOCKET";
const handlers = {
    UPDATE_WEBSOCKET: (state, action) => {
        //delete old socket
        for (const key in state) {
            const index = state[key]
                .map((e) => e.socketId)
                .indexOf(action.payload.socket.socketId);
            if (index != -1) {
                state[key].splice(index, 1);
            }
        }
        // add new socket
        state[action.payload.type].push(action.payload.socket);
        return state;
    },
    ADD_WEBSOCKET: (state, action) => {
        state[action.payload.type].push(action.payload.socket);
        return state;
    }
};
const webSockets = (state = webSockets_1.initialWebSockets(), action) => createReducer_1.createReducer(state, action, handlers);
exports.webSockets = webSockets;
