"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteClint = exports.updateClint = exports.addClint = exports.clients = exports.DELETE_CLIENT = exports.UPDATE_CLIENT = exports.ADD_CLIENT = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const createReducer_1 = require("../createReducer");
exports.ADD_CLIENT = "ADD_CLIENT";
exports.UPDATE_CLIENT = "UPDATE_CLIENT";
exports.DELETE_CLIENT = "DELETE_CLIENT";
const handlers = {
    UPDATE_CLIENT: (state, action) => {
        const newClients = state;
        const client = newClients.find(element => element.clientId == action.payload.clientId);
        const index = newClients.indexOf(client);
        newClients[index] = action.payload;
        return newClients;
    },
    ADD_CLIENT: (state, action) => {
        state.push(action.payload);
        return state;
    },
    DELETE_CLIENT: (state, action) => {
        const newClients = state;
        const index = newClients.map(client => client.clientId).indexOf(action.payload);
        newClients.splice(index, 1);
        return newClients;
    },
};
const clients = (state = [], action) => createReducer_1.createReducer(state, action, handlers);
exports.clients = clients;
exports.addClint = toolkit_1.createAction(exports.ADD_CLIENT);
exports.updateClint = toolkit_1.createAction(exports.UPDATE_CLIENT);
exports.deleteClint = toolkit_1.createAction(exports.DELETE_CLIENT);
