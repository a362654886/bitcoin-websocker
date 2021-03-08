"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientsMap = exports.ADD_CLIENT = exports.UPDATE_CLIENT = void 0;
const createReducer_1 = require("../createReducer");
const webSockets_1 = require("../../../types/webSockets");
exports.UPDATE_CLIENT = "UPDATE_CLIENT";
exports.ADD_CLIENT = "ADD_CLIENT";
const handlers = {
    UPDATE_CLIENT: (state, action) => {
        //delete old socket
        for (const key of state.keys()) {
            const arr = state.get(key);
            const index = arr.indexOf(action.payload.id);
            if (index != -1) {
                arr.splice(index, 1);
            }
        }
        // add new socket
        const arr = state.get(action.payload.type);
        arr.push(action.payload.id);
        console.log(state);
        return state;
    },
    ADD_CLIENT: (state, action) => {
        const arr = state.get(action.payload.type);
        arr.push(action.payload.id);
        return state;
    },
};
const clientsMap = (state = webSockets_1.initialClientMap(), action) => createReducer_1.createReducer(state, action, handlers);
exports.clientsMap = clientsMap;
