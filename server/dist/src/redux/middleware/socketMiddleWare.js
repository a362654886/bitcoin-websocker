"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketsMiddleWare = void 0;
const clients_1 = require("../duck/clients");
const createAction_1 = require("../createAction");
const coinHouse_1 = require("../../coinHouses/coinHouse");
const socket_1 = require("../duck/socket");
const serverData_1 = require("../duck/serverData");
const socketsMiddleWare = (store) => (next) => async (action) => {
    next(action);
    //check if servers need to close this server
    if (action.type == clients_1.UPDATE_CLIENT || action.type == clients_1.DELETE_CLIENT) {
        const deleteArr = deleteSocket(store.getState().clients, store.getState().sockets);
        deleteArr.forEach(id => {
            store.dispatch(createAction_1.createAction(id, socket_1.DELETE_SOCKET));
            store.dispatch(createAction_1.createAction(id, serverData_1.DELETE_DATA));
        });
    }
    //check if sockets need to build new connection
    if (action.type == clients_1.UPDATE_CLIENT || action.type == clients_1.ADD_CLIENT) {
        const addCheck = addSocket(action.payload, store.getState().sockets);
        if (!addCheck) {
            //add
            // another is symbol
            // exchange Connected
            const { serverId, socket } = coinHouse_1.buildCoinHouse(action.payload);
            store.dispatch(createAction_1.createAction({
                serverId: serverId,
                socket: socket,
            }, socket_1.ADD_SOCKET));
            //add data
            socket.onopen = () => {
                store.dispatch(createAction_1.createAction(serverId, serverData_1.ADD_DATA));
            };
            //update data
            socket.onmessage = (event) => {
                const data = coinHouse_1.getData(event.data, action.payload.coinHouse, action.payload.coinType, serverId);
                if (data.Kline) {
                    store.dispatch(createAction_1.createAction(data, serverData_1.UPDATE_DATA));
                }
            };
        }
    }
};
exports.socketsMiddleWare = socketsMiddleWare;
// if this serve need to be deleted
const deleteSocket = (clients, sockets) => {
    // get no duplicate array
    const clientSocketIds = clients.map((client) => `${client.coinHouse}${client.coinType}${client.timer}`.toLowerCase());
    const noDuplicate = Array.from(new Set(clientSocketIds));
    // check sockets
    const deleteIds = [];
    for (const key of sockets.keys()) {
        if (noDuplicate.indexOf(key) == -1) {
            deleteIds.push(key);
        }
    }
    return deleteIds;
};
// if this serve need to be added
const addSocket = (client, sockets) => {
    const { timer, coinType, coinHouse } = client;
    return sockets.has(`${coinHouse}${coinType}${timer}`.toLowerCase());
};
